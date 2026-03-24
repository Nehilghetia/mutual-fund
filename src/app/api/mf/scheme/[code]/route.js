import axios from 'axios';
import { NextResponse } from 'next/server';

async function fetchDetailsFromAMFI(code) {
    try {
        const response = await axios.get('https://www.amfiindia.com/spages/NAVAll.txt', { timeout: 30000 });
        const lines = response.data.split('\n');

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
        return null;
    }
}

export async function GET(request, { params }) {
    const { code } = params;

    try {
        console.log(`Proxy Detail Request: ${code}`);
        const response = await axios.get(`https://api.mfapi.in/mf/${code}`, {
            timeout: 10000,
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' }
        });
        return NextResponse.json(response.data);
    } catch (err) {
        console.warn(`Primary Details Failed: ${err.message}. Trying AMFI...`);
        const amfiData = await fetchDetailsFromAMFI(code);
        if (amfiData) {
            return NextResponse.json(amfiData);
        }

        return NextResponse.json({
            error: 'Scheme details are currently unreachable even from official sources.',
            details: err.message
        }, { status: 502 });
    }
}
