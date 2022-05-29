const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
module.exports = {
    sendHelp,
}
function sendHelp(message){
    fs.readFile('./help.txt', 'utf8' , (err, data) => {
        if (err) {
          console.error(err)
          return
        }
        message.author.send(data);
      });

}