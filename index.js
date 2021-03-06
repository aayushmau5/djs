const fs = require("fs");

const Discord = require("discord.js");
const client = new Discord.Client();
client.commands = new Discord.Collection();

const { prefix } = require("./config.json");
require("dotenv").config();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.once("ready", () => {
  console.log("Ready!!");
});

client.on("guildMemberAdd", (member) => {
  console.log(member);
  member.guild.channels.get("channelID").send("Welcome");
});

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) | message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );

  if (!command) {
    return message.channel.send("Sorry, I Don't Know that Command.");
  }

  if (command.args && !args.length) {
    let reply = `You didn't provide any argumnets, ${message.author}`;

    if (command.usage) {
      reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
    }

    message.channel.send(reply);
  }

  try {
    command.execute(message, args);
  } catch (err) {
    console.log(err);
    message.reply("There was an error executing the command.");
  }
});

client.login(process.env.BOT_TOKEN);
