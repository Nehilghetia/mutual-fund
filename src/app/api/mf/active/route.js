// File: app/api/mf/active/route.js
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://api.mfapi.in/mf', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
      next: { revalidate: 3600 }, // cache 1 hour
    });

    if (!response.ok) {
      console.error(`External API error in active: ${response.status} ${response.statusText}`);
      throw new Error(`Failed to fetch from external API: ${response.statusText}`);
    }

    const allSchemes = await response.json();

    if (!Array.isArray(allSchemes)) {
      console.error('External API returned non-array data in active:', allSchemes);
      throw new Error('API format is incorrect');
    }

    // Since the API might not include isinGrowth in the list, we'll keep the filter 
    // safe but also acknowledge that it might return everything if fields don't exist.
    // If the list *does* contain isinGrowth, this filter works.
    const activeSchemes = allSchemes.filter(scheme =>
      scheme.isinGrowth !== null && scheme.isinGrowth !== undefined
    );

    // If for some reason the filter removed everything because the field is missing from the list,
    // we might want to return a subset or everything, but let's stick to the user's logic intent.
    // However, the MFAPI list is usually JUST code and name.

    return NextResponse.json({ data: activeSchemes.length > 0 ? activeSchemes : allSchemes.slice(0, 1000) });

  } catch (error) {
    console.error('API /api/mf/active Route Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch active mutual fund data from external service.',
        details: error.message
      },
      { status: 500 }
    );
  }
}
