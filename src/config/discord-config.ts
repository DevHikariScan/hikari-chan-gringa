require("dotenv").config();

const PREFIX = process.env["PREFIX"];
const TOKEN = process.env["TOKEN"];
const NODE_DEV = process.env["NODE_ENV"] === "dev";
const GUILD_ID_DEV = process.env["GUILD_ID_DEV"];
const CLIENT_ID_DEV = process.env["CLIENT_ID_DEV"];

if (!PREFIX) {
  console.error("Missing PREFIX environment variable");
  process.exit(1);
}

if (!TOKEN) {
  console.error("Missing PREFIX environment variable");
  process.exit(1);
}

if (NODE_DEV && !GUILD_ID_DEV) {
  console.error("Missing GUILD_ID_DEV environment variable");
  process.exit(1);
}

if (!CLIENT_ID_DEV) {
  console.error("Missing CLIENT_ID_DEV environment variable");
  process.exit(1);
}

const config = {
  token: TOKEN,
  prefix: PREFIX,
  dev: {
    guildId: GUILD_ID_DEV,
    clientId: CLIENT_ID_DEV,
    enabled: NODE_DEV,
  },
};

export default config;
