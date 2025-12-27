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

    const response = await fetch('https://api.mfapi.in/mf');
    if (!response.ok) throw new Error('Failed to fetch mutual fund data');

    const data = await response.json();

    cachedFunds = data;
    cacheTime = now;

    return Response.json(data);
  } catch (err) {
    console.error('API fetch error:', err);
    return new Response(JSON.stringify({ error: 'Failed to fetch funds' }), {
      status: 500,
    });
  }
}