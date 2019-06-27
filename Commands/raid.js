const Discord = require("discord.js");

module.exports.run = async (bot, message, args) =>{
		let bicon = 'https://vignette.wikia.nocookie.net/destinypedia/images/2/26/Raid_Emblem.png/revision/latest?cb=20140802205132';
		/*let bicon = bot.user.displayAvatarURL;*/
		let raidembed = new Discord.RichEmbed()
			.setDescription("Destiny Clan Raid Times")
			.setColor("#b9a3e3")
			.setThumbnail(bicon)
			.addField("Main Team", "Tuesday 6PM-9PM")
			.addField("Make-Up Raid", "Today: 6/26 from 5PM EST to 9PM EST");

		return message.channel.send(raidembed);
	}

module.exports.help = {
	name: "raid"
}