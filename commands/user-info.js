module.exports = {
    name: 'user-info',
    description: 'Information about the user',
    execute(message, args) {
        message.channel.send(`Username: ${message.author.username}`);
    },
};