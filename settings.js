import { watchFile, unwatchFile } from "fs"
import chalk from "chalk"
import { fileURLToPath } from "url"
import fs from "fs"
let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
unwatchFile(file)
console.log(chalk.redBright("Update 'settings.js'"))
import(`${file}?update=${Date.now()}`)
})

/* <- Lista de owner -> */

global.owner = ["18094374392"]
global.mod ["18293142989"]

/* <- Carpetas para los bots -> */

global.sessions = "Session"
global.jadi = "JadiBots"
global.jadibot = true

/* <- imágenes-> */

global.banner = "https://files.catbox.moe/o2zoj6.png"
global.icono = "https://files.catbox.moe/o2zoj6.png"
global.catalogo = "https://files.catbox.moe/o2zoj6.png"

/* <- Importaciones globales-> */

global.botname = "Yotsuba Nakano"
global.texto = "𝓓𝓮𝓿𝓮𝓵𝓸𝓹𝓮𝓭 𝓫𝔂 𝗗𝙚𝙮𝙢𝙤𝙤𝙣𝗢𝙛𝙘 ❤️"
global.creadlr = "Made With ❤️ by 𝗗𝙚𝙮𝙢𝙤𝙤𝙣 𝗢𝙛𝙘"
global.moneda = "Estrellas"
global.emoji = "👑"
global.APIs = {
xyro: { url: "https://xyro.site", key: null },
yupra: { url: "https://api.yupra.my.id", key: null },
vreden: { url: "https://api.vreden.web.id", key: null },
delirius: { url: "https://api.delirius.store", key: null },
zenzxz: { url: "https://api.zenzxz.my.id", key: null },
siputzx: { url: "https://api.siputzx.my.id", key: null }
}

