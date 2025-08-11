const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS'
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    if (event.httpMethod !== 'GET') {
      return {
        statusCode: 405,
        headers,
        body: JSON.stringify({ error: 'Method not allowed' })
      };
    }

    // Define the postcard images
    const postcards = [
      {
        filename: "Postcard (1).png",
        name: "Vintage Postcard 1",
        url: "/postcards/Postcard (1).png"
      },
      {
        filename: "Postcard (2).png",
        name: "Vintage Postcard 2",
        url: "/postcards/Postcard (2).png"
      },
      {
        filename: "Postcard (3).png",
        name: "Vintage Postcard 3",
        url: "/postcards/Postcard (3).png"
      },
      {
        filename: "Postcard (4).png",
        name: "Vintage Postcard 4",
        url: "/postcards/Postcard (4).png"
      },
      {
        filename: "Postcard (5).png",
        name: "Vintage Postcard 5",
        url: "/postcards/Postcard (5).png"
      },
      {
        filename: "Postcard (6).png",
        name: "Vintage Postcard 6",
        url: "/postcards/Postcard (6).png"
      },
      {
        filename: "Postcard (7).png",
        name: "Vintage Postcard 7",
        url: "/postcards/Postcard (7).png"
      },
      {
        filename: "Postcard (8).png",
        name: "Vintage Postcard 8",
        url: "/postcards/Postcard (8).png"
      },
      {
        filename: "Postcard (9).png",
        name: "Vintage Postcard 9",
        url: "/postcards/Postcard (9).png"
      },
      {
        filename: "Postcard (10).png",
        name: "Vintage Postcard 10",
        url: "/postcards/Postcard (10).png"
      },
      {
        filename: "Postcard (11).png",
        name: "Vintage Postcard 11",
        url: "/postcards/Postcard (11).png"
      },
      {
        filename: "Postcard (12).png",
        name: "Vintage Postcard 12",
        url: "/postcards/Postcard (12).png"
      },
      {
        filename: "Postcard (13).png",
        name: "Vintage Postcard 13",
        url: "/postcards/Postcard (13).png"
      },
      {
        filename: "Postcard (14).png",
        name: "Vintage Postcard 14",
        url: "/postcards/Postcard (14).png"
      },
      {
        filename: "Postcard (15).png",
        name: "Vintage Postcard 15",
        url: "/postcards/Postcard (15).png"
      },
      {
        filename: "Postcard (16).png",
        name: "Vintage Postcard 16",
        url: "/postcards/Postcard (16).png"
      },
      {
        filename: "Postcard (17).png",
        name: "Vintage Postcard 17",
        url: "/postcards/Postcard (17).png"
      },
      {
        filename: "Postcard (18).png",
        name: "Vintage Postcard 18",
        url: "/postcards/Postcard (18).png"
      },
      {
        filename: "Postcard (19).png",
        name: "Vintage Postcard 19",
        url: "/postcards/Postcard (19).png"
      },
      {
        filename: "Postcard (20).png",
        name: "Vintage Postcard 20",
        url: "/postcards/Postcard (20).png"
      },
      {
        filename: "Postcard (21).png",
        name: "Vintage Postcard 21",
        url: "/postcards/Postcard (21).png"
      },
      {
        filename: "Postcard (22).png",
        name: "Vintage Postcard 22",
        url: "/postcards/Postcard (22).png"
      },
      {
        filename: "Postcard (23).png",
        name: "Vintage Postcard 23",
        url: "/postcards/Postcard (23).png"
      },
      {
        filename: "Postcard (24).png",
        name: "Vintage Postcard 24",
        url: "/postcards/Postcard (24).png"
      },
      {
        filename: "Postcard (25).png",
        name: "Vintage Postcard 25",
        url: "/postcards/Postcard (25).png"
      },
      {
        filename: "Postcard (26).png",
        name: "Vintage Postcard 26",
        url: "/postcards/Postcard (26).png"
      },
      {
        filename: "Postcard (27).png",
        name: "Vintage Postcard 27",
        url: "/postcards/Postcard (27).png"
      },
      {
        filename: "Postcard (28).png",
        name: "Vintage Postcard 28",
        url: "/postcards/Postcard (28).png"
      },
      {
        filename: "Postcard (29).png",
        name: "Vintage Postcard 29",
        url: "/postcards/Postcard (29).png"
      },
      {
        filename: "Postcard (30).png",
        name: "Vintage Postcard 30",
        url: "/postcards/Postcard (30).png"
      },
      {
        filename: "Postcard (31).png",
        name: "Vintage Postcard 31",
        url: "/postcards/Postcard (31).png"
      }
    ];

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ postcards })
    };

  } catch (error) {
    console.error('Error loading postcards:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Er is een fout opgetreden bij het laden van de postcards', postcards: [] })
    };
  }
};
