module.exports = {
    name: 'args-info',
    description: 'Return the given argumnets',
    args: true,
    usage: '<arguments>',
    execute(message, args) {
		message.channel.send(`Command:${this.name}\nArguments: ${args}`);
    },
};