import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const rawUrl = searchParams.get('url');
  const decodedUrl = rawUrl ? decodeURIComponent(rawUrl) : '';

  if (!decodedUrl || !decodedUrl.startsWith('http')) {
    return new Response(JSON.stringify({ error: 'Missing or invalid url parameter' }), { status: 400 });
  }

  try {
    const response = await fetch(decodedUrl);

    if (!response.ok) {
      return new Response(JSON.stringify({ error: 'Failed to fetch image' }), { status: response.status });
    }

    const contentType = response.headers.get('content-type') || 'application/octet-stream';
    const arrayBuffer = await response.arrayBuffer();
    return new Response(arrayBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Unexpected error fetching image' }), { status: 500 });
  }
} 