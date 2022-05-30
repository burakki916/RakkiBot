const Discord = require('discord.js');
var diary = require('./diary');
var calorant = require('./calorant');
var help = require('./help.js');
module.exports = {
    handle(message){
        if(message.content.startsWith('r!e')){
            diary.diaryEntree(message);
        }
        if(message.content.startsWith('r!c')){
            calorant.handle(message); 
        }
        if(message.content.startsWith('r!restart') || message.content.author.id = "220295925925412865"){
            message.channel.send("Restarting...");
            calorant.save()
            process.exit(1);
        }
        if(message.content.startsWith('r!ping')){
            message.channel.send("Pong!");
        }
        if(message.content.startsWith("r!help")){
            help.sendHelp(message);
        }        
    }
}