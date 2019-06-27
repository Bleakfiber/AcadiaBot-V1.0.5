const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) =>{

	// !tempmute @user timeperiod (ex. 1m/h/d)
	let toMute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if (!toMute) return message.reply("Couldn't find user.");
	if(toMute.hasPermission("MANAGE_MESSAGES")) return message.reply("That person can't be muted via command!");
	let muteRole = message.guild.roles.find(role => role.name === 'muted');
	if(!muteRole){
		try{
			muteRole = await message.guild.createRole({
				name: "muted",
				permissions:[]
			})
			message.guild.channels.forEach(async (channel, id) =>{
				await channel.overwritePermissions(muteRole,{
					SEND_MESSAGES: false,
					ADD_REACTIONS: false
				});
			});
		}
		catch(e){
			console.log(e.stack);
		}
	}

	let muteTime = args[1];
	if(!muteTime) return message.reply("You didn't specify a time!");

	await(toMute.addRole(muteRole.id));
	// message.reply(`<@${toMute.id}> has been muted for ${ms(ms(muteTime))}`);

	setTimeout(function(){
		toMute.removeRole(muteRole.id);
		// message.channel.send(`<@${toMute.id}> has been unmuted.`);
	}, ms(muteTime));

let mUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
		if (!mUser) return message.channel.send("Couldn't find user.");
		let mReason = args.join(" ").slice(22);

		let muteEmbed = new Discord.RichEmbed()
		.setDescription("Mutes")
		.setColor("#ffc107")
		.addField("Muted User: ", `${mUser} with ID: ${mUser.id}`)
		.addField("Muted By: ",  `${message.author} with ID: ${message.author.id}`)
		.addField("Channel: ", message.channel)
		.addField("Time: ", message.createdAt)
		.addField("Duration & Reason: ", mReason);


		let muteschannel = message.guild.channels.find(channel => channel.name === 'action-logs')
		if(!muteschannel) return message.channel.send("Couldn't find mutes channel.");

		message.delete().catch(O_o=>{});
		muteschannel.send(muteEmbed);

}



module.exports.help = {
	name:"tempmute"
}