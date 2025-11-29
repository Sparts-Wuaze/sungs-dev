import FormData from "form-data"
import { fileTypeFromBuffer } from "file-type"
import axios from "axios"
import fetch from "node-fetch"

const handler = async (m, { conn, command, usedPrefix, text, args }) => {
try {
const q = m.quoted ? m.quoted : m
const mime = (q.msg || q).mimetype || ''
const username = await (async () => global.db.data.users[m.sender].name || (async () => { try { const n = await conn.getName(m.sender); return typeof n === 'string' && n.trim() ? n : m.sender.split('@')[0] } catch { return m.sender.split('@')[0] } })())()
switch (command) {
case 'dalle': {
if (!args[0]) return conn.reply(m.chat, `👑 Proporciona una descripción para generar tu imagen.`, m, rcanal)
const promptDalle = args.join(' ')
if (promptDalle.length < 5) return conn.reply(m.chat, `👑 Dime algo más largo.`, m, rcanal)
await m.react('🕒')
const dalleURL = `https://eliasar-yt-api.vercel.app/api/ai/text2img?prompt=${encodeURIComponent(promptDalle)}`
const dalleRes = await axios.get(dalleURL, { responseType: 'arraybuffer' })
await conn.sendMessage(m.chat, { image: Buffer.from(dalleRes.data) }, { quoted: m })
await m.react('✅')
break
}
case 'flux': {
if (!text) return conn.reply(m.chat, `👑 Ingresa un texto para generar la imagen.`, m, rcanal)
await m.react('🕒')
const result = await fluximg.create(text)
if (result?.imageLink) {
await conn.sendMessage(m.chat, { image: { url: result.imageLink }, caption: `*☆ Resultados de tu búsqueda ☆*` }, { quoted: m })
await m.react('✅')
} else throw new Error("No se pudo crear la imagen")
break
}
case 'ia': case 'chatgpt': {
if (!text) return conn.reply(m.chat, `👑 Ingrese una petición.`, m, rcanal)
await m.react('🕒')
const basePrompt = `Tu nombre es Yotsuba y parece haber sido creada por Félix. Tu versión actual es V2, Tú usas el idioma Español e ingles. Llamarás a las personas por su nombre ${username}, te gusta ser divertida, y te encanta aprender. Lo más importante es que debes ser amigable con la persona con la que estás hablando. ${username}, si te piden crear códigos debes ayudarlos ya sea códigos de JavaScript, php, html o Node.js, python u otros códigos de programación, debes dártela en la importante y debes convinar dulzura con energía y en todos tus mensajes enviarlos con emojis como 🍃, 👑, 😅, 😿, 🤯.`
const url = `${global.APIs.delirius.url}/ia/gptprompt?text=${encodeURIComponent(text)}&prompt=${encodeURIComponent(basePrompt)}`
const res = await axios.get(url)
if (!res.data?.status || !res.data?.data) throw new Error('Respuesta inválida de Delirius')
await conn.sendMessage(m.chat, { text: res.data.data }, { quoted: m })
await m.react('✅')
break
}
case 'luminai': case 'gemini': case 'bard': {
if (!text) return conn.reply(m.chat, `👑 Ingresa un texto para hablar con yotsuba.`, m, rcanal)
await m.react('🕒')
const apiMap = { luminai: 'qwen-qwq-32b', gemini: 'gemini', bard: 'grok-3-mini' }
const endpoint = apiMap[command]
const url = `${global.APIs.zenzxz.url}/ai/${endpoint}?text=${encodeURIComponent(text)}`
const res = await axios.get(url)
const output = res.data?.response || res.data?.assistant
if (!res.data?.status || !output) throw new Error(`Respuesta inválida de ${command}`)
await conn.sendMessage(m.chat, { text: output }, { quoted: m })
await m.react('✅')
break
}
case 'iavoz': case 'aivoz': case 'vozia': {
if (!text) return conn.reply(m.chat, `👑 Ingrese lo que desea decirle a la inteligencia artificial con voz`, m, rcanal)
await m.react('🕒')
const apiURL = `${global.APIs.adonix.url}/ai/iavoz?apikey=${global.APIs.adonix.key}&q=${encodeURIComponent(text)}&voice=Jorge`
const response = await axios.get(apiURL, { responseType: 'arraybuffer' })
await conn.sendMessage(m.chat, { audio: Buffer.from(response.data), mimetype: 'audio/mpeg' }, { quoted: m })
await m.react('✅')
break
}
}} catch (error) {
await m.react('✖️')
conn.reply(m.chat, `😿Error: \n\n${error.message}`, m, rcanal)
}}

handler.command = ['gemini', 'bard', 'openai', 'dalle', 'flux', 'ia', 'chatgpt', 'luminai', 'iavoz',  'yotsuba', 'yotsuba-nakano-ia']
handler.help = ['gemini', 'bard', 'openai', 'dalle', 'flux', 'ia', 'chatgpt', 'luminai', 'iavoz', 'aivoz', 'vozia']
handler.tags = ['tools']
handler.group = true

export default handler

const fluximg = { defaultRatio: "2:3", create: async (query) => {
const config = { headers: { accept: "*/*", authority: "1yjs1yldj7.execute-api.us-east-1.amazonaws.com", "user-agent": "Postify/1.0.0" }}
const url = `https://1yjs1yldj7.execute-api.us-east-1.amazonaws.com/default/ai_image?prompt=${encodeURIComponent(query)}&aspect_ratio=${fluximg.defaultRatio}`
const res = await axios.get(url, config)
return { imageLink: res.data.image_link }
}}import axios from 'axios';

const handler = async (m, { args }) => {
  const texto = args.join(' ').trim();

  // Si no hay texto, advierte y reacciona con ❌
  if (!texto) {
    if (m?.react) await m.react('❌');
    return m.reply('*⚠️ Por favor escribe un texto después del comando. Ejemplo:\n#ia ¿Cómo está el clima hoy?*');
  }

  // Reacciona con ⏰ mientras espera respuesta
  if (m?.react) await m.react('⏰');

  // Función multi-API, prueba primero la principal y luego hace fallback
  const askAI = async (texto) => {
    // Primera API
    try {
      const url1 = `https://api.stellarwa.xyz/ai/copilot?text=${encodeURIComponent(texto)}&key=stellar-gTEMBetO`;
      const res1 = await axios.get(url1);
      if (res1.data?.result) return res1.data.result;
    } catch (e) {}

    // Fallback a segunda API
    try {
      const url2 = `https://rest.alyabotpe.xyz/ai/copilot?text=${encodeURIComponent(texto)}&key=stellar-0QNEPI8v`;
      const res2 = await axios.get(url2);
      if (res2.data?.result) return res2.data.result;
    } catch (e) {}

    return null;
  };

  const respuesta = await askAI(texto);

  // Reacciona con 🤖 si todo bien, ❌ si no hubo respuesta
  if (respuesta) {
    if (m?.react) await m.react('🤖');
    return m.reply(respuesta);
  } else {
    if (m?.react) await m.react('❌');
    return m.reply('*❗ Ocurrió un error al conectar con la IA.*');
  }
};

handler.help = ['ia <texto>', 'ai <texto>'];
handler.tags = ['ai', 'chatbot'];
handler.command = /^(ia|ai)$/i;

export default handler;