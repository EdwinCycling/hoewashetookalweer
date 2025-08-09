import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const postcardsDir = path.join(process.cwd(), 'public', 'postcards');
    
    // Check if directory exists
    if (!fs.existsSync(postcardsDir)) {
      return NextResponse.json({ postcards: [] });
    }

    // Read all files in the postcards directory
    const files = fs.readdirSync(postcardsDir);
    
    // Filter for image files
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    let postcards = files
      .filter(file => imageExtensions.some(ext => file.toLowerCase().endsWith(ext)))
      .map(file => ({
        filename: file,
        name: file, // Use full filename including extension to make each unique
        url: `/postcards/${file}`
      }))
      .sort((a, b) => a.filename.localeCompare(b.filename, undefined, { numeric: true })); // Sort naturally

    // Randomly select 10 postcards (or all if less than 10)
    if (postcards.length > 10) {
      // Shuffle array and take first 10
      const shuffled = postcards.sort(() => 0.5 - Math.random());
      postcards = shuffled.slice(0, 10);
    }

    return NextResponse.json({ postcards });

  } catch (error) {
    console.error('Error reading postcards directory:', error);
    return NextResponse.json(
      { error: 'Er is een fout opgetreden bij het laden van postcard afbeeldingen' },
      { status: 500 }
    );
  }
}
