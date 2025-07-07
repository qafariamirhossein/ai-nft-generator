import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const rawUrl = req.query.url;
  const decodedUrl = typeof rawUrl === 'string' ? decodeURIComponent(rawUrl) : '';

  if (!decodedUrl || !decodedUrl.startsWith('http')) {
    res.status(400).json({ error: 'Missing or invalid url parameter' });
    return;
  }

  try {
    console.log('Decoded URL:', decodedUrl);

    const response = await fetch(decodedUrl);

    if (!response.ok) {
      console.error('Fetch failed:', response.status, response.statusText);
      res.status(response.status).json({ error: 'Failed to fetch image' });
      return;
    }

    const contentType = response.headers.get('content-type') || 'application/octet-stream';
    const buffer = Buffer.from(await response.arrayBuffer());

    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).send(buffer);
  } catch (err) {
    console.error('Unexpected error:', err);
    res.status(500).json({ error: 'Unexpected error fetching image' });
  }
}
