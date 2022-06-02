import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { Client } from "discord.js";
import config from "../config/discord-config";
import { Command } from "../entities/command";

const rest = new REST({ version: "9" }).setToken(config.token);

export default async function (commands: Map<string, Command>, client: Client) {
  const { dev } = config;
  try {
    console.log("Started refreshing application (/) commands.");

    const commandsSlash: any[] = [];
    commands.forEach((command) => commandsSlash.push(command.getSlashJSON()));
    const guilds = client.guilds.cache.map((elem) => elem.id);

    if (dev.enabled) {
      if (!dev.guildId)
        throw new Error("Missing GUILD_ID_DEV environment variable");
      await rest.put(
        Routes.applicationGuildCommands(dev.clientId, dev.guildId),
        {
          body: commandsSlash,
        }
      );
    } else {
      for (let guild of guilds) {
        await rest.put(Routes.applicationGuildCommands(dev.clientId, guild), {
          body: commandsSlash,
        });
      }
    }

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
}
