const Discord = require("discord.js");

module.exports.run = async (bot, message, args) =>{
		let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
		if (!rUser) return message.channel.send("Couldn't find user.");
		let rReason = args.join(" ").slice(22);

		let reportEmbed = new Discord.RichEmbed()
		.setDescription("Reports")
		.setColor("#fd7e14")
		.addField("Reported User: ", `${rUser} with ID: ${rUser.id}`)
		.addField("Reported By: ",  `${message.author} with ID: ${message.author.id}`)
		.addField("Channel: ", message.channel)
		.addField("Time: ", message.createdAt)
		.addField("Reason: ", rReason);


		let reportschannel = message.guild.channels.find(channel => channel.name === 'reports')
		if(!reportschannel) return message.channel.send("Couldn't find reports channel.");

		message.delete().catch(O_o=>{});
		reportschannel.send(reportEmbed);
}

module.exports.help = {
	name: "report"
}