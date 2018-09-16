exports.run = (client, msg, args) => {
  msg.channel.send("Pong!")
  msg.channel.send(new Date().getTime() - msg.createdTimestamp + " ms");
};

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

module.exports.help = {
  name: 'ping',
  description: 'The ping of the Bot!',
  usage: 'ping'
};

