// Guarda los votos en memoria del servidor
// (suficiente para fines demostrativos y pedagógicos)
export default function handler(req, res) {
  if (!global.votos) {
    global.votos = {
      pregunta1: { si: 50, no: 50 },
      pregunta2: { si: 50, no: 50 },
      pregunta3: { si: 50, no: 50 },
    };
  }

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  const { pregunta, opcion } = req.body || {};

  if (req.method === "POST" && pregunta && opcion) {
    if (global.votos[pregunta]) {
      if (opcion === "si") global.votos[pregunta].si++;
      if (opcion === "no") global.votos[pregunta].no++;
    }
  }

  res.status(200).json(global.votos);
}
