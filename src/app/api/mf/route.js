// ❌ REMOVE: import fetch from 'node-fetch';

let cachedFunds = null;
let cacheTime = 0;

export async function GET() {
  const now = Date.now();

  try {
    // ✅ Cache for 12 hours
    if (cachedFunds && now - cacheTime < 1000 * 60 * 60 * 12) {
      return Response.json(cachedFunds);
    }

    const response = await fetch('https://api.mfapi.in/mf', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
      next: { revalidate: 3600 } // Cache for 1 hour on the server side
    });
    
    if (!response.ok) {
      console.error(`External API error: ${response.status} ${response.statusText}`);
      throw new Error(`Failed to fetch from external API: ${response.statusText}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      console.error('External API returned non-array data:', data);
      throw new Error('API format is incorrect');
    }

    cachedFunds = data;
    cacheTime = now;

    return Response.json(data);
  } catch (err) {
    console.error('API /api/mf Route Error:', err);
    return new Response(JSON.stringify({ 
      error: 'Failed to fetch funds from external service.',
      details: err.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}