const { EmbedReply } = require("../messages.js");

module.exports = {
	name: 'help',
	description: 'Get the commands help.',
	execute(message, args, constants) {
		const { commands } = message.client;
		var help = "Here is a list of all the commands:";
		for (const cmd of commands) {
			help += `\n - ${constants.bot_prefix}${cmd[0]}`
		}

		EmbedReply(message.channel, "CrazyBot help", null, help);
	},
};
