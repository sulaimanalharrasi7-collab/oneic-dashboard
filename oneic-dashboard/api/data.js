// ── Vercel Blob API — حفظ وقراءة بيانات الداشبورد ───────────────────────────
import { put, del, list } from '@vercel/blob';

const BLOB_NAME = 'oneic-dashboard-data.json';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    try {
      const { blobs } = await list({ prefix: BLOB_NAME });
      if (!blobs || blobs.length === 0) {
        return res.status(200).json({ exists: false, data: null });
      }
      const latest = blobs.sort((a, b) =>
        new Date(b.uploadedAt) - new Date(a.uploadedAt)
      )[0];
      const response = await fetch(latest.downloadUrl);
      if (!response.ok) throw new Error('Failed to fetch blob');
      const data = await response.json();
      return res.status(200).json({ exists: true, data });
    } catch (err) {
      return res.status(500).json({ error: 'فشل قراءة البيانات', details: err.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const body = req.body;
      if (!body || !body.regions) {
        return res.status(400).json({ error: 'بيانات غير صالحة' });
      }
      const toSave = { ...body, savedAt: new Date().toISOString(), version: Date.now() };
      try {
        const { blobs } = await list({ prefix: BLOB_NAME });
        if (blobs && blobs.length > 0) {
          await Promise.all(blobs.map(b => del(b.url)));
        }
      } catch(e) {}
      const blob = await put(BLOB_NAME, JSON.stringify(toSave), {
        access: 'public',
        contentType: 'application/json',
        addRandomSuffix: false
      });
      return res.status(200).json({ success: true, savedAt: toSave.savedAt, url: blob.url });
    } catch (err) {
      return res.status(500).json({ error: 'فشل حفظ البيانات', details: err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
