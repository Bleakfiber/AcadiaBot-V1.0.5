const Discord = require("discord.js");

module.exports.run = async (bot, message, args) =>{
		// !ban USER REASON
		let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
		if (!bUser) return message.channel.send("Couldn't find user.");
		let bReason = args.join(" ").slice(22);
		if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You are not authorized to ban someone!");
		if (bUser.hasPermission("MANAGE_ROLES")) return message.channel.send("That person can't be banned!")

		let banEmbed = new Discord.RichEmbed()
		.setDescription("Ban")
		.setColor("#dc3545")
		.addField("Banned User: ", `${bUser} with ID: ${bUser.id}`)
		.addField("Banned By: ",  `<@${message.author.id}> with ID: ${message.author.id}`)
		.addField("Banned In: ", message.channel)
		.addField("Time: ", message.createdAt)
		.addField("Reason: ", bReason);


		let banChannel = message.guild.channels.find(channel => channel.name === 'action-logs')
		if(!banChannel) return message.channel.send("Couldn't find #action-log channel.");

		message.guild.member(bUser).ban(bReason)
		message.delete().catch(O_o=>{});
		banChannel.send(banEmbed);

		return;
	}

module.exports.help = {
	name: "ban"
}