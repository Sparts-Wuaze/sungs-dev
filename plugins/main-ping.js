const handler = async (m, { conn, rcanal } = {}) => {
  try {
    const start = Date.now();
    // cálculo inmediato; forzamos mínimo 33 ms como pediste
    let latency = Date.now() - start;
    latency = Math.max(latency, 33);
    const text = `¡pong! (${latency} ms`; // exactamente en el formato que pediste

    // Llamada tal cual -> '¡pong! X ms', m, rcanal)
    await conn.reply(m.chat, text, m, rcanal);
  } catch (err) {
    console.error(err);
    try {
      await conn.reply(m.chat, 'Error al calcular ping', m, rcanal);
    } catch {}
  }
};

handler.command = ['p', 'ping'];
export default handler;