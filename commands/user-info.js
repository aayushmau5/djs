module.exports = {
  name: "user-info",
  description: "Information about the user",
  aliases: ["ui"],
  args: false,
  execute(message, args) {
    message.channel.send(`Username: ${message.author.username}`);
  },
};
