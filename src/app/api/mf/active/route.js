// File: app/api/mf/active/route.js
import { NextResponse } from 'next/server';
import axios from 'axios';
import { sampleFunds } from '@/app/utils/sampleFunds';

async function fetchFromAMFI() {
  try {
    const response = await axios.get('https://www.amfiindia.com/spages/NAVAll.txt', { timeout: 30000 });
    const lines = response.data.split('\n');
    return lines
      .filter(line => /^\d+;/.test(line))
      .map(line => {
        const parts = line.split(';');
        return {
          schemeCode: parseInt(parts[0]),
          isinGrowth: parts[1] !== '-' ? parts[1] : null,
          schemeName: parts[3] ? parts[3].trim() : 'Unknown Scheme'
        };
      })
      .filter(f => f.schemeCode && f.schemeName !== 'Unknown Scheme');
  } catch (err) {
    return null;
  }
}

export async function GET() {
  try {
    const response = await axios.get('https://api.mfapi.in/mf', {
      timeout: 10000,
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' }
    });

    const allSchemes = response.data;
    if (Array.isArray(allSchemes)) {
      const activeSchemes = allSchemes.filter(scheme =>
        scheme.isinGrowth !== null && scheme.isinGrowth !== undefined
      );
      return NextResponse.json({ data: activeSchemes.length > 0 ? activeSchemes : allSchemes.slice(0, 1000) });
    }
    throw new Error('Invalid format');

  } catch (error) {
    console.warn('Active API fail, trying AMFI...');
    const amfiData = await fetchFromAMFI();
    if (amfiData && amfiData.length > 0) {
      return NextResponse.json({ data: amfiData });
    }
    return NextResponse.json({ data: sampleFunds });
  }
}
