import axios from 'axios';
import { sampleFunds } from '@/app/utils/sampleFunds';

let cachedFunds = null;
let cacheTime = 0;

async function fetchFromAMFI() {
  try {
    console.log('Fetching directly from AMFI (Failover)...');
    const response = await axios.get('https://www.amfiindia.com/spages/NAVAll.txt', {
      timeout: 30000,
    });

    const lines = response.data.split('\n');
    const parsedFunds = [];
    let currentCategory = 'Other';
    let currentFundHouse = 'Unknown';

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      // Group Headers (Category/Type)
      if (trimmed.includes('Open Ended Schemes') || trimmed.includes('Close Ended Schemes')) {
        currentCategory = trimmed;
        continue;
      }

      // Fund House Headers (Usually lines without semicolons but followed by data)
      if (!trimmed.includes(';') && trimmed.length > 5 && !trimmed.startsWith('Scheme Code')) {
        currentFundHouse = trimmed;
        continue;
      }

      // Data Lines
      if (/^\d+;/.test(trimmed)) {
        const parts = trimmed.split(';');
        parsedFunds.push({
          schemeCode: parseInt(parts[0]),
          isinGrowth: parts[1] !== '-' ? parts[1] : null,
          schemeName: parts[3] ? parts[3].trim() : 'Unknown Scheme',
          fundHouse: currentFundHouse,
          category: currentCategory
        });
      }
    }

    console.log(`Successfully parsed ${parsedFunds.length} funds from AMFI with categories.`);
    return parsedFunds;
  } catch (err) {
    console.error('AMFI Failover Error:', err.message);
    return null;
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const force = searchParams.get('force') === 'true';
  const now = Date.now();

  // ✅ Use cache if available and not forced
  if (!force && cachedFunds && now - cacheTime < 1000 * 60 * 60) {
    return Response.json(cachedFunds);
  }

  try {
    console.log('Attempting to fetch all funds from primary API (MFAPI)...');

    const response = await axios.get('https://api.mfapi.in/mf', {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      }
    });

    const data = response.data;
    if (Array.isArray(data)) {
      console.log(`Primary API success: ${data.length} funds.`);
      cachedFunds = data;
      cacheTime = now;
      return Response.json(data);
    }
    throw new Error('Invalid data format from primary API');

  } catch (err) {
    console.warn(`Primary API failed (${err.message}). Trying AMFI Failover...`);

    const amfiData = await fetchFromAMFI();
    if (amfiData && amfiData.length > 0) {
      cachedFunds = amfiData;
      cacheTime = now;
      return Response.json(amfiData);
    }

    if (cachedFunds) {
      console.log('Returning stale cache.');
      return Response.json(cachedFunds);
    }

    console.warn('All live sources failed. Returning local samples.');
    return Response.json(sampleFunds);
  }
}