const Discord = require('discord.js');
const client = new Discord.Client();
const handler = require('./commandHandler');
var calorant = require('./calorant');
client.once('ready', () => {
  const channel = client.channels.cache.get("870558428995682314");
  channel.send("Bot is up!");
  calorant.init(client);
  client.user.setStatus("r!help for help"); 
  setInterval(updateShit,60000);
  function updateShit(){
    calorant.timey(client);
  }

      

});
client.on('message',message =>{
if(message.content.startsWith('r!')){
    
    console.log("["+ message.author.username+"] " + message.content);
    handler.handle(message); 
    if(message.content.startsWith("r!update")){
      calorant.sendSummary(client,"Day");
    }
}

});

const fs = require('fs')
let key = '';
fs.readFile('./token.env', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  client.login(data);
})
