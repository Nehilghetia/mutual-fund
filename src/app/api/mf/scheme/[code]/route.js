import axios from 'axios';
import { NextResponse } from 'next/server';

let amfiCache = {
    data: null,
    timestamp: 0
};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function fetchDetailsFromAMFI(code) {
    try {
        let content;
        const now = Date.now();

        if (amfiCache.data && (now - amfiCache.timestamp < CACHE_DURATION)) {
            console.log("Using Cached AMFI Data");
            content = amfiCache.data;
        } else {
            console.log("Fetching Fresh AMFI Data...");
            const response = await axios.get('https://www.amfiindia.com/spages/NAVAll.txt', { timeout: 15000 });
            content = response.data;
            amfiCache = { data: content, timestamp: now };
        }

        const lines = content.split('\n');

        let currentCategory = 'Unknown';
        let currentFundHouse = 'Unknown';
        let cleanCode = code.toString().trim();

        for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed) continue;
            if (trimmed.includes('Open Ended Schemes') || trimmed.includes('Close Ended Schemes')) { currentCategory = trimmed; continue; }
            if (!trimmed.includes(';') && trimmed.length > 5 && !trimmed.startsWith('Scheme Code')) { currentFundHouse = trimmed; continue; }

            if (trimmed.startsWith(`${cleanCode};`)) {
                const parts = trimmed.split(';');
                return {
                    meta: {
                        scheme_code: parts[0],
                        scheme_name: parts[3],
                        fund_house: currentFundHouse,
                        scheme_type: 'Live AMFI Data',
                        scheme_category: currentCategory
                    },
                    data: [{ date: parts[5].trim(), nav: parts[4], isFallback: true }],
                    isPartial: true // Tell the UI that history is missing
                };
            }
        }
        return null;
    } catch (err) {
        console.error("AMFI Fetch Error:", err.message);
        return null;
    }
}

export async function GET(request, { params }) {
    const { code } = params;

    try {
        console.log(`Proxy Detail Request: ${code}`);
        const response = await axios.get(`https://api.mfapi.in/mf/${code}`, {
            timeout: 5000, // Reduced timeout for faster failover
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });
        return NextResponse.json(response.data);
    } catch (err) {
        console.warn(`Primary Details Failed: ${err.message}. Trying AMFI...`);
        const amfiData = await fetchDetailsFromAMFI(code);
        if (amfiData) {
            return NextResponse.json(amfiData);
        }

        return NextResponse.json({
            error: 'Scheme details unreachable.',
            details: err.message
        }, { status: 502 });
    }
}
