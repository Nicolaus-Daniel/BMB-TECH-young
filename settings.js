const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('settings.env'))
    require('dotenv').config({ path: __dirname + '/settings.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0JWd2VoZGg1cGpvRHM0R1FoQS9QZ1JOb1Q2bEkzeEhvWnVIVUQ5MkVtND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMy9xek5MUHMyMyttcW1WMGRvdDJhS2JBenFyKzdFdUl5MEtpTWd6dHBYbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzS1VBaHE5MzZaL09DMWFScUNCNk5INVgzSGVJM2s1K1pGT2dKZDlSZVZVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJWNHNjQURoYkhrWWxjc3B5U2x6SmNJRlE0UW92Wk93VXhZeEo5Zy81RWdzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9DcmhGbWVqV1MzSkZ5SkdyalNhRFYva0lscW9pZkVUU0ZzREV4RGlRRkE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Img3bnBTbGwwenh6blk3dHhOUTBjOU9GUktDYVlHZ0FiYjYyanBOaFBRRVk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0RtblN4QXZaOFd4M3RSM0ZJeXFNTGtwUXRRRC9vKzFsb0ZScStDYy9tdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK3FzU0k4Wjh2YlNxZDd3QmNTUUVUUmtPdnFaREszRXJoZThpb1Q4Tlloaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJuQmxQRTFkdUhnWXVFa3RWR0QxWlVFQkNqQkJOenliS0taNWhMMlM0b3lpZDR4NEEySTZ0ZG45K3laTUgxS3AxVUdVUmd1QmlvcXNtdzFuR3drekFRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MzYsImFkdlNlY3JldEtleSI6IitpUG9WdWV1TzhoUWpJbHpGTFZiUEYyNVprL1ZHWEd0Tk5ucXUzclcyNVk9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjU1NzYzNTE0NDUwQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkFDQzNERDBENEYzMUJEMEVEMkU0NkQ5MDUyM0I1RDIyIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTc4MzgwNjN9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI1NTc2MzUxNDQ1MEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJBQ0JFQjgzMzhENDk3NEY0NjFGNDFCMkQzNzZGNTQ5QSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzU3ODM4MDY0fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTU3NjM1MTQ0NTBAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQUMwODFDNjFFMTczRkY4QjA2MjcxM0Y5QkI2ODQ1MUIifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1NzgzODA3M31dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiTFBEQzVSOTgiLCJtZSI6eyJpZCI6IjI1NTc2MzUxNDQ1MDoxQHMud2hhdHNhcHAubmV0IiwibGlkIjoiMjYwMjc5NzY2MTUxMzA4OjFAbGlkIiwibmFtZSI6IlNub29ib3kifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0pUYWdPd0JFTi8xbWNZR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlUvc3BBSlpnT2sremJobW5Ia3ovZWdmTTNPSEpzbktoWlZTOURyVkNXV2c9IiwiYWNjb3VudFNpZ25hdHVyZSI6Ikd6VmlRQTZ5dkVDVk9kN3RzR3ZEbVdma2lpdEFSamFPOUY4T2ZTc1I1R0UvWGhadEdXL3lnQzZtT1pmWlBGck40VGFTV0I3RGlnQ3B4c2piR0Mxb0JBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJjcXhPOHVYU2VoL3daaVIzVDBra2s3aE41YTRKZ1hiTVVUSk9NSTNubHk0WmNuLzdXSDZXK1A0QmJyWFp3dWRwcmt6Y2Z0WXZDRHhzeC92dlpqcndEQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NTc2MzUxNDQ1MDoxQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlZQN0tRQ1dZRHBQczI0WnB4NU0vM29Iek56aHliSnlvV1ZVdlE2MVFsbG8ifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBSUlEUT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc1NzgzODA2MSwibGFzdFByb3BIYXNoIjoiMlAxWWhmIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFGbUUifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Young White 🦟",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255763514450",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'B.M.B-TECH',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/8qq3l4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY, 
    WARN_COUNT : process.env.WARN_COUNT || '3',
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'no',
    AUTO_REACT : process.env.AUTO_REACT || 'no',
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'no',
    CHAT_BOT: process.env.CHAT_BOT || 'no',
    AUDIO_REPLY: process.env.AUDIO_REPLY || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway"
        : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
};

let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
