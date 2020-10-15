const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix } = require('./config.json');
require('dotenv').config();

client.once('ready', () => {
	// trigger once after logging in
	console.log('Ready!!');
});

// listening for messages
// client.on('message', (message) => {
// 	console.log(message.content);
// });

client.on('message', (message) => {
	const content = message.content;
	const channel = message.channel;
	if(content === `${prefix}hello`) {
		// send message to the channel where the message came from
		channel.send('World');
    } else if(content === `${prefix}beep`) {
		channel.send('Bop');
	}
});

// login to Discord with the token
client.login(process.env.BOT_TOKEN);