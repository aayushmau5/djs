const Discord = require('discord.js');

module.exports = {
  name: 'pinned',
  description: 'Get all pinned messages from the channel',
  args: false,
  usage: '',
  async execute(message) {
    const pinnedMessages = await message.channel.messages.fetchPinned();
    const channel = message.channel.guild.channels.cache.get(
      process.env.REPLY_CHANNEL_ID,
    );
    const messagesArray = [];
    for (const val of pinnedMessages) {
      let content = '';
      if (val[1].embeds[0] && val[1].embeds[0].type === 'link') {
        const embed = val[1].embeds[0];
        const embeddedLink = new Discord.MessageEmbed()
          .setTitle(embed.title)
          .setURL(embed.url);
        content = embeddedLink;
      } else {
        content = val[1].content;
      }
      const msgObj = {
        content,
        time: val[1].createdTimestamp,
      };
      messagesArray.push(msgObj);
    }
    messagesArray.sort((first, second) => {
      if (first.time > second.time) return 1;
      if (first.time < second.time) return -1;
      return 0;
    });
    messagesArray.forEach((val) => channel.send(val.content));

    // messagesArray.forEach((val) => message.channel.send(val.content));
    // let reply = `Here are the list of pinned Messages:\n`;
    // messagesArray.forEach((val, index) => (reply += `${index + 1}. ${val} \n`));

    // message.channel.send(reply);
  },
};
