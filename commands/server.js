module.exports = {
    name: 'server',
    description: 'Information about Server',
    args: false,
    execute(message, args) {
        message.channel.send(`The Server name is: ${message.guild.name}\nTotal Member: ${message.guild.memberCount}`);
    },
};