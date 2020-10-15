module.exports = {
    name: 'args-info',
    description: 'Return the given argumnets',
    execute(message, args) {
        if(!args.length) {
			return message.channel.send(`You didn't provide any arguments, ${message.author}`);
		}
		message.channel.send(`Command:${this.name}\nArguments: ${args}`);
    },
};