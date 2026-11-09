// Guarda y entrega los datos de los torneos como un único archivo JSON.
// Leer es público (es lo que baja el Stick). Escribir requiere la clave ADMIN_KEY.
const { put, list } = require("@vercel/blob");

const FILE = "efil-data.json";

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "content-type, x-admin-key");
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "OPTIONS") return res.status(204).end();

  try {
    if (req.method === "GET") {
      const { blobs } = await list({ prefix: FILE });
      if (!blobs.length) return res.status(404).json({ error: "Todavía no hay datos" });
      const r = await fetch(blobs[0].url + "?t=" + Date.now(), { cache: "no-store" });
      res.setHeader("Content-Type", "application/json");
      return res.status(200).send(await r.text());
    }

    if (req.method === "PUT") {
      const key = process.env.ADMIN_KEY;
      if (!key || req.headers["x-admin-key"] !== key) {
        return res.status(401).json({ error: "Clave incorrecta" });
      }
      const body = req.body;
      if (!body || !Array.isArray(body.tournaments)) {
        return res.status(400).json({ error: "Datos inválidos" });
      }
      await put(FILE, JSON.stringify(body), {
        access: "public",
        addRandomSuffix: false,
        allowOverwrite: true,
        contentType: "application/json"
      });
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: "Método no permitido" });
  } catch (e) {
    return res.status(500).json({ error: String(e && e.message || e) });
  }
};
