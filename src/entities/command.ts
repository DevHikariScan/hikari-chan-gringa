import { Client, CommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";
import { RESTPostAPIApplicationCommandsJSONBody } from "discord-api-types/v9";
export interface CommandProps {
  name: string;
  description: string;
}

export interface CommandExecuteSlash {
  (interaction: CommandInteraction, client: Client): Promise<void>;
}

export interface CommandEvents {
  createSlash(): SlashCommandBuilder;
  createExecuteSlash(props: CommandExecuteSlash): void;

  getExecuteSlash(): CommandExecuteSlash | null;
  getSlashJSON(): RESTPostAPIApplicationCommandsJSONBody | null;
}

export class Command implements CommandEvents {
  public name: string;
  public description: string;
  public slash?: SlashCommandBuilder;
  public executeSlash?: CommandExecuteSlash;
  constructor(props: CommandProps) {
    this.name = props.name;
    this.description = props.description;
  }

  createSlash() {
    this.slash = new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description);
    return this.slash
  }
  createExecuteSlash = (props: CommandExecuteSlash) => {
    this.executeSlash = props;
  };

  getExecuteSlash = () => {
    return this.executeSlash || null;
  };
  getSlashJSON = () => {
    return this.slash ? this.slash.toJSON() : null;
  };
}
