const handler = async (m, { conn }) => {
  const url = 'https://files.catbox.moe/3sf8cz.jpg'
  await conn.sendMessage(m.chat, {
    image: { url },
    caption: '*KALAHARI*'
  }, { quoted: m })
}

handler.command = /^kalahari$/i
handler.help = ['kalahari']
handler.tags = ['media']

export default handler