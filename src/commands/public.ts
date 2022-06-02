import { Client, CommandInteraction, MessageEmbed } from "discord.js";
import { Command } from "../entities/command";
import { PublicModule } from "../modules/public";
import config from "../config/discord-config";

const command = new Command({
  name: "public",
  description: "Public command",
});
command
  .createSlash()
  .addStringOption((option) =>
    option
      .setName("link")
      .setDescription(
        "link do cap da manga dex ex:https://mangadex.org/chapter/cdea9be0-6b38-4c09-8d49-f903f9db1b04/1"
      )
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName("roles")
      .setDescription("cargos que vão ser pingados ex: @cargo1 @cargo2")
  );

command.createExecuteSlash(
  async (interaction: CommandInteraction, client: Client) => {
    try {
      const link = interaction.options.getString("link");
      const roles = interaction.options.getString("roles");

      if (!link) {
        throw new Error("Link não informado");
      }
      await interaction.reply("Aguarde...");
      const project = await PublicModule({
        link,
        roles: roles || "Manga Dex",
      });

      const embed = new MessageEmbed()
        .setTitle(project.title)
        .setURL(project.url)
        .setDescription(`Chapter ${project.chapter}`)
        .setThumbnail(project.cover_url)
        .addFields([
          {
            name: "Status",
            value: project.status,
            inline: true,
          },
          {
            name: "Tags:",
            value: project.genres.join(", "),
            inline: true,
          },
          {
            name: "Description:",
            value: project.description,
          },
        ]);
      const channel = client.channels.cache.get(
        config.dev.enabled ? "787464549765873664" : "919715148141322290"
      );

      if (channel?.isText()) {
        channel.send({ content: roles, embeds: [embed] });
      }
    } catch (error) {
      await interaction.editReply("Erro ao executar o comando");
    }
  }
);

export default command;
