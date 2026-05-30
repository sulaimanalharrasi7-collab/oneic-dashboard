import { put, del, list } from '@vercel/blob';

export const config = { api: { bodyParser: { sizeLimit: '10mb' } } };

const KEY = 'oneic-data.json';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    try {
      const { blobs } = await list({ prefix: KEY });
      if (!blobs || blobs.length === 0) return res.status(200).json({ exists: false, data: null });
      const r = await fetch(blobs[0].downloadUrl);
      const data = await r.json();
      return res.status(200).json({ exists: true, data });
    } catch (e) { return res.status(500).json({ error: e.message }); }
  }

  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      if (!body?.regions) return res.status(400).json({ error: 'invalid' });
      try { const { blobs } = await list({ prefix: KEY }); if (blobs?.length) await Promise.all(blobs.map(b => del(b.url))); } catch(e) {}
      const saved = { ...body, savedAt: new Date().toISOString() };
      await put(KEY, JSON.stringify(saved), { access: 'public', contentType: 'application/json', addRandomSuffix: false });
      return res.status(200).json({ success: true, savedAt: saved.savedAt });
    } catch (e) { return res.status(500).json({ error: e.message }); }
  }
  return res.status(405).end();
}
