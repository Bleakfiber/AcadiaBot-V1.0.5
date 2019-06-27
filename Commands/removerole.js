const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
// !removerole @user ROLE
	if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Sorry pal, you can't do that.")
	let rMember = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if(!rMember) return message.reply("Couldn't find that user.");
	let role = args.join(" ").slice(22);
	if(!role) return message.reply("Specify a role!")
	let gRole = message.guild.roles.find(role => role.name === 'Member')
	if(!gRole) return message.reply("Couldn't find that role.")

	if(!rMember.roles.has(gRole.id)) return message.reply("They don't have that role.");
	await(rMember.removeRole(gRole.id));

	message.channel.send(`<@${rMember.id}>, ${gRole.name} role has been removed.`)



	let roleEmbed = new Discord.RichEmbed()
		.setDescription("Added Role")
		.setColor("#fd7e14")
		.addField("User: ", `${rMember} with ID: ${rMember.id}`)
		.addField("Added By: ",  `${message.author} with ID: ${message.author.id}`)
		.addField("Channel: ", message.channel)
		.addField("Time: ", message.createdAt)
		.addField("Role: ", gRole);


		let rolechannel = message.guild.channels.find(channel => channel.name === 'role-changes')
		if(!rolechannel) return message.channel.send("Couldn't find reports channel.");

		message.delete().catch(O_o=>{});
		rolechannel.send(roleEmbed);
}

module.exports.help = {
	name: "removerole"
}