import { Command } from "../entities/command";
import fs from "fs";
import path from "path";
const commands = new Map<string, Command>();
export default function () {
  fs.readdirSync(path.join(__dirname, "..", "commands")).forEach((file) => {
    const command = require(path.join(
      __dirname,
      "..",
      "commands",
      file
    )).default;
    commands.set(command.name, command);
  });
  return commands;
}
