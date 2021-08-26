const Discord = require("discord.js");

const constants = require("./constants.js");

const nconf = require('nconf');
const fs = require('fs');

function push_role(user, role) {
	constants.nconf.set("roles:" + user, role);
	constants.nconf.save(function (err) {
		require('fs').readFile(__dirname + '/../../config.json', function (err, data) {
			console.log(user + " is now: " + role);
		});
	});
}

function inject_cazy_bot(client, prefix, giphy_token) {
	if(!fs.existsSync(__dirname + "/../config.json") ) {
		fs.writeFileSync(__dirname + "/../config.json", JSON.stringify(require(__dirname + "/../config-defaults.json"), null, 2));
	}
	
	nconf.file({ file: __dirname + '/../config.json' });
	
	constants.bot_id = client.user.id;
	constants.bot_prefix = prefix;
	constants.giphy_token = giphy_token;
	constants.nconf = nconf;

	constants.bot_prefix = "-";
	client.commands = new Discord.Collection();

	const commandFiles = fs.readdirSync(__dirname + '/commands').filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		console.log(`Loaded command: ${file}`);
	
		const command = require(`./commands/${file}`);
		client.commands.set(command.name, command);
	}

	client.on("message", async message => {
		if (message.author.bot) return;

		if (message.content.startsWith("Hello") || message.content.startsWith("hello")) {
			var responses = [
				"https://media.giphy.com/media/ASd0Ukj0y3qMM/giphy.gif",
				"https://media.giphy.com/media/Cmr1OMJ2FN0B2/giphy.gif",
				"https://media.giphy.com/media/fTI9mBoWLef8k/giphy.gif",
				"https://media.giphy.com/media/3oz8xSjBmD1ZyELqW4/giphy.gif",
				"https://media.giphy.com/media/3o6ZtpxSZbQRRnwCKQ/giphy.gif",
				"https://media.giphy.com/media/yrhhmre5fN2PtRujfo/giphy.gif",
				"https://media.giphy.com/media/3oz8xCg7tmgcAdgOGY/giphy.gif",
				"https://media.giphy.com/media/EVjAANNjkMBKE/giphy.gif"
			];

			var response = responses[Math.floor(Math.random() * responses.length)];
			message.channel.send({ files: [response] });
			return;
		}

		if (!message.content.startsWith(constants.bot_prefix)) return;

		const args = message.content.slice(constants.bot_prefix.length).trim().split(/ +/);
		const command = args.shift().toLowerCase();

		if (!client.commands.has(command)) return;

		try {
			client.commands.get(command).execute(message, args, constants);
		} catch (error) {
			console.log("Command error: " + error);
		}
	});

}

exports.push_role = push_role;
exports.inject_cazy_bot = inject_cazy_bot;
