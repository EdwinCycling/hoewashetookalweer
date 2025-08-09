import { NextResponse } from 'next/server';

// Static list of postcard files (since Netlify serverless functions can't read filesystem)
const POSTCARD_FILES = [
  'Postcard (1).JPG',
  'Postcard (1).png',
  'Postcard (2).JPG',
  'Postcard (2).png',
  'Postcard (3).JPG',
  'Postcard (3).png',
  'Postcard (4).JPG',
  'Postcard (4).png',
  'Postcard (5).JPG',
  'Postcard (5).png',
  'Postcard (6).JPG',
  'Postcard (6).png',
  'Postcard (7).JPG',
  'Postcard (7).png',
  'Postcard (8).JPG',
  'Postcard (8).png',
  'Postcard (9).JPG',
  'Postcard (9).png',
  'Postcard (10).JPG',
  'Postcard (10).png',
  'Postcard (11).JPG',
  'Postcard (11).png',
  'Postcard (12).JPG',
  'Postcard (12).png',
  'Postcard (13).JPG',
  'Postcard (13).png',
  'Postcard (14).JPG',
  'Postcard (14).png',
  'Postcard (15).JPG',
  'Postcard (15).png',
  'Postcard (16).JPG',
  'Postcard (16).png',
  'Postcard (17).JPG',
  'Postcard (18).JPG',
  'Postcard (19).JPG',
  'Postcard (20).JPG',
  'Postcard (21).JPG',
  'Postcard (22).JPG',
  'Postcard (23).JPG',
  'Postcard (24).JPG',
  'Postcard (25).JPG',
  'Postcard (26).JPG',
  'Postcard (27).JPG',
  'Postcard (28).JPG',
  'Postcard (29).JPG',
  'Postcard (30).JPG',
  'Postcard (31).JPG'
];

export async function GET() {
  try {
    // Create postcard objects from static list
    let postcards = POSTCARD_FILES.map(file => ({
      filename: file,
      name: file,
      url: `/postcards/${file}`
    })).sort((a, b) => a.filename.localeCompare(b.filename, undefined, { numeric: true }));

    // Randomly select 10 postcards
    if (postcards.length > 10) {
      const shuffled = postcards.sort(() => 0.5 - Math.random());
      postcards = shuffled.slice(0, 10);
    }

    return NextResponse.json({ postcards });

  } catch (error) {
    console.error('Error serving postcards:', error);
    return NextResponse.json(
      { error: 'Er is een fout opgetreden bij het laden van postcard afbeeldingen' },
      { status: 500 }
    );
  }
}
