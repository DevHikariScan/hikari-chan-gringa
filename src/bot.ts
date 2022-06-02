import { Client, Intents } from "discord.js";
import config from "./config/discord-config";
import postCommandsSlash from "./libs/post-commands-slash";
import commandsRead from "./libs/commands-read";

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const commands = commandsRead();

client.on("ready", async (client) => {
  await postCommandsSlash(commands, client);
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = commands.get(interaction.commandName);
  if (!command) return;
  const execute = command.getExecuteSlash();
  if (!execute) return;
  await execute(interaction, client);
});

client.login(config.token);
