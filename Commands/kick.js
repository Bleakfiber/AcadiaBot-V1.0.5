const Discord = require("discord.js");

module.exports.run = async (bot, message, args) =>{
// 		// !kick USER REASON
		let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
		if (!kUser) return message.channel.send("Couldn't find user.");
		let kReason = args.join(" ").slice(22);
		if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You are not authorized to kick someone!");
		if (kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!")

		let kickEmbed = new Discord.RichEmbed()
		.setDescription("Kick")
		.setColor("#dc3545")
		.addField("Kicked User: ", `${kUser} with ID: ${kUser.id}`)
		.addField("Kicked By: ",  `<@${message.author.id}> with ID: ${message.author.id}`)
		.addField("Kicked In: ", message.channel)
		.addField("Time: ", message.createdAt)
		.addField("Reason: ", kReason);


		let kickChannel = message.guild.channels.find(channel => channel.name === 'action-logs')
		if(!kickChannel) return message.channel.send("Couldn't find #action-log channel.");

		message.guild.member(kUser).kick(kReason)
		message.delete().catch(O_o=>{});
		kickChannel.send(kickEmbed);

		return;
	}

module.exports.help = {
	name: "kick"
}