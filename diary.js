const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
module.exports = {
    diaryEntree(message){
        let subject = message.content.substring(4,message.content.length)
        let response = bar()+ " \nDate : ";
        response += new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) + "\n";
        if(subject.length>0){
          response+= "subject : " + subject + "\n";
        }
        response+=bar(); 
         
        console.log("Diary Entree Made"); 
        message.channel.send(response);
        message.delete();
    }

}
function bar(){
    return "------------------------------------------------------------------------";
}
