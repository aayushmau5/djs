const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix } = require('./config.json');
require('dotenv').config();

client.once('ready', () => {
	// trigger once after logging in
	console.log('Ready!!');
});

// for all methods https://discord.js.org/#/docs/main/stable/general/welcome

// listening for messages
// client.on('message', (message) => {
// 	console.log(message.content);
// });

client.on('message', (message) => {
	const content = message.content;
	const channel = message.channel;

	// if message doesn't start with ! or if the message author is a bot, do nothing
	if(!content.startsWith(prefix) | message.author.bot) return;

	// get the arguments and remove the ! and unecessary whitespace
	const args = content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if(command === 'hello') {
		// send message to the channel where the message came from
		channel.send('World');
    } else if(command === 'beep') {
		channel.send('Boop');
	} else if(command === 'server') {
		// Servers are referred to as "guilds" in the Discord API
		// message.guild for server related things
		channel.send(`The Server name is: ${message.guild.name}\nTotal Member: ${message.guild.memberCount}`);
	} else if(command === 'user-info') {
		// message.author refers to the user who sent the message
		channel.send(`Username: ${message.author.username}`);
	} else if(command === 'args-info') {
		// working with user input https://discordjs.guide/creating-your-bot/commands-with-user-input.html
		if(!args.length) {
			return channel.send(`You didn't provide any arguments, ${message.author}`);
		}

		channel.send(`Command name: ${command}\nArguments: ${args}`);
	} else if(command === 'avatar') {
		if(!message.mentions.users.size) {
			return channel.send(`Your avatar: <${message.author.displayAvatarURL({ format:'png', dynamic:true })}>`);
		}
	} else if(command === 'prune') {
		// command to bulk delete multiple messages
		const amount = parseInt(args[0]);
		if(isNaN(amount)) {
			return message.reply('That doesn\'t seem to be a valid number.');
		} else if(amount < 2 || amount > 100) {
			return message.reply('You need to input a number between 2 and 100.');
		}

		channel.bulkDelete(amount, true).catch(err => {
			console.log(err);
			channel.send('There was an error trying to prune messages in this channel.');
		});
	}
});

// login to Discord with the token
client.login(process.env.BOT_TOKEN);