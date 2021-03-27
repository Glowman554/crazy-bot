const Discord = require("discord.js");
const client = new Discord.Client();
const path = require("path");
var giphy = require('giphy-api')(process.env.giphy_token);

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const bot_token = process.env.bot_token;
const bot_id = process.env.bot_id;
const bot_prefix = process.env.bot_prefix;

client.on("message", async message => {
	var command = message.content.split(" ")[0];
	if (command == bot_prefix + "help") {
		var help = "Here is the list of bot commands:\n" +
			" - " + bot_prefix + "help\n" + 
			" - " + bot_prefix + "searchgif {keyword}\n" +
			" - " + bot_prefix + "magic8 {qestion}\n" +
			" - " + bot_prefix + "praise\n" +
			" - " + bot_prefix + "wrong\n" +
			" - " + bot_prefix + "no\n" +
			" - " + bot_prefix + "goodjob\n" +
			" - " + "hello";

		message.channel.send(help);
	} else if (message.content.startsWith("Hello") || message.content.startsWith("hello")) {
		var responses = [
			"https://media.giphy.com/media/ASd0Ukj0y3qMM/giphy.gif",
			"https://media.giphy.com/media/Cmr1OMJ2FN0B2/giphy.gif",
			"https://media.giphy.com/media/fTI9mBoWLef8k/giphy.gif",
			"https://media.giphy.com/media/3oz8xSjBmD1ZyELqW4/giphy.gif",
			"https://media.giphy.com/media/3o6ZtpxSZbQRRnwCKQ/giphy.gif"
		];
		var response = responses[Math.floor(Math.random() * responses.length)];
		message.channel.send({ files: [response] });
	} else if (command == bot_prefix + "searchgif") {
		var search_stuff = message.content.replace(message.content.split(" ")[0] + " ", "");
		if (search_stuff == "" || search_stuff == null || search_stuff.startsWith(bot_prefix + "searchgif"))
			search_stuff = "gif";

		giphy.random({
			tag: search_stuff,
			rating: 'g',
			fmt: 'json'
		}, function (err, res) {
			message.channel.send({files: [res.data.image_url]});
		});
	} else if (command == bot_prefix + "magic8") {
		let ans = [
			"No",
			"Yes",
			"Maybe",
			"Think about is a bit more then try again...",
			"Absolutely",
			"Not at all",
			"Of couse!",
			"As it seems... Yes",
			"As it seems... No",
			"Could be",
			"Hell NO!"
		];
		message.reply(ans[Math.floor(Math.random() * ans.length)]);
	} else if (command == bot_prefix + "praise") {
		if (message.content == bot_prefix + "praise the sun") {
			message.channel.send("praise the sun from Dark souls");
			return;
		}

		let ans = [
			"You are a good person.",
			"You are clever.",
			"You are a nice person.",
			"You're a gift to those around you.",
			"You're a smart cookie.",
			"You are awesome!",
			"I appreciate you.",
			"You have the best laugh.",
			"You are strong.",
			"You have the courage of your convictions.",
			"You bring out the best in other people.",
			"You're like a ray of sunshine on a really dreary day.",
			"You're even more beautiful on the inside than you are on the outside.",
			"You've got an awesome sense of humor!",
			"You light up the room.",
			"You are the most perfect you there is.",
			"You're a great listener.",
			"Being around you makes everything better!",
			"You're wonderful.",
			"You're one of a kind!",
			"You're a candle in the darkness.",
			"You're a great example to others.",
			"Who raised you? They deserve a medal for a job well done.",
			"Your voice is magnificent.",
			"You're so thoughtful.",
			"Your creative potential seems limitless.",
			"There's ordinary, and then there's you.",
			"You're someone's reason to smile.",
			"You're even better than a unicorn, because you're real.",
			"You have a good head on your shoulders.",
			"Thank you for being you.",
			"You're really something special."
		];
		message.channel.send(ans[Math.floor(Math.random() * ans.length)]);
	} else if (command == bot_prefix + "wrong") {
		message.channel.send({ files: ["https://cdn.discordapp.com/attachments/732895652425629756/764680229380685855/video0.mp4"] });
	} else if (command == bot_prefix + "no") {
		message.channel.send({ files: ["https://cdn.discordapp.com/attachments/731837751481204760/799345380193206292/NO-Sign-11-13.jpg"] });
	} else if (command == bot_prefix + "shit") {
		message.channel.send({ files: ["https://cdn.discordapp.com/attachments/731837751481204760/799345896617410570/2cb013b6319538eb225728b54bb0940b.jpg"] });
	} else if (command == bot_prefix + "goodjob") {
		message.channel.send({ files: ["https://media1.giphy.com/media/hvLLg4whmqcA1XpwRj/source.gif"] });
	}
});

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!\nBot tag is: "${bot_prefix}"`);
	client.user.setActivity(`${bot_prefix}help`, { type: 'LISTENING' });
});

client.login(bot_token);