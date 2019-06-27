const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) =>{

	if(!message.member.hasPermission("MANAGE_MEMBERS")) return ("You don't have permission to issue a warning!");
	let wUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if(message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("You can't warn that user.");


		if (!wUser) return message.channel.send("Couldn't find user.");
		let wReason = args.join(" ").slice(22);

		let warnEmbed = new Discord.RichEmbed()
		.setDescription("Warn")
		.setColor("#fd7e14")
		.addField("Warned User: ", `${wUser} with ID: ${wUser.id}`)
		.addField("Warned By: ",  `${message.author} with ID: ${message.author.id}`)
		.addField("Channel: ", message.channel)
		.addField("Time: ", message.createdAt)
		.addField("Reason: ", wReason);


		let warnchannel = message.guild.channels.find(channel => channel.name === 'action-logs')
		if(!warnchannel) return message.channel.send("Couldn't find reports channel.");

		message.delete().catch(O_o=>{});
		reportschannel.send(reportEmbed);
}

module.exports.help = {
	name: "warn"
}