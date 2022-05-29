const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const { setInterval } = require('timers/promises');
Map.prototype.toJSON = function() {return [...this];};
var users = new Map();
var util = require('util');
module.exports = {
    init,
    handle, 
    save,
}
function init(client){
    console.log("initializing users...")
    fs.readdirSync('./users').forEach(file => {
        console.log("reading file " + file.toString());
        fs.readFile('./users/'+file.toString(), 'utf8' , (err, data) => {
            if (err) {
              console.error(err)
              return
            }
            curUser = JSON.parse(data);
            //console.log(curUser.wins);
            users.set(file.toString(),curUser);
          });
      });

      
}
function initUser(id){
    curUser = new Object();
    users.set(id,curUser);
    return curUser; 
}
function handle(message){
    if(message.content.startsWith('r!b new')){        
        initUser(message.author.id)
        message.channel.send("<@" +message.author.id + "> has been added to the system!");
        save();
    }
}
function save(){

    function store(value,key,map){
        fs.writeFileSync('./users/'+key,JSON.stringify(value,null,2),'utf-8')
    }
    users.forEach(store);

}