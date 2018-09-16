const snekfetch = require('snekfetch');
exports.run = async (client, message, args, level) => { 
	try {
		const _message = await message.channel.send('Please wait...');
		if (!args[0]) {
			_message.edit('No data given');
		} else {
			const cb = '```'; 
			snekfetch.get(`http://wttr.in/${args.join(' ').replace(' ', '%20')}?T0m`).then((data) => {
				_message.edit(`${cb}\n${data.text}\n${cb}`);
			}).catch(console.error);
		}

	} catch (error) {
		throw error;
	}
};

module.exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: 0
};

module.exports.help = {
	name: 'weather',
	description: 'Get the weather for a location',
	usage: 'weather [location]'
};