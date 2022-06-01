const Discord = require('discord.js');
const fs = require('fs');
const { setInterval } = require('timers/promises');
Map.prototype.toJSON = function() {return [...this];};
var users = new Map();
var util = require('util');
module.exports = {
    init,
    handle, 
    save,
    users,
    sendSummary,
    timey,
}
function initUser(id){
    curUser = new Object();
    curUser.ID = id; 
    curUser.totalWins = 0;
    curUser.dayWins = 0; 
    curUser.weekWins =0; 
    curUser.monthWins =0; 

    curUser.totalLoss = 0;
    curUser.dayLoss = 0;
    curUser.weekLoss = 0;
    curUser.monthLoss = 0;
    users.set(id,curUser);
    return curUser; 
}
function handle(message){
    if(message.content.startsWith('r!c new')){     
        console.log("here! r!c new")   
        initUser(message.author.id)
        message.channel.send("<@" +message.author.id + "> has been added to the system!");
        save();
    } else if(users.has(message.author.id)==false){
        initUser(message.author.id);
        save();
    }
    if(message.content.toString().includes("w:") || message.content.toString().includes("l:")){
        winLossPaser(message.content.toString(),message.author.id);
        message.channel.send("Gotcha! \n" + makeSummary("brief",message.author.id));
    }else{
        if(message.content.startsWith('r!c w')){
            updateScore(message.author.id,1,0);
            message.channel.send("Gotcha! \n" + makeSummary("brief",message.author.id));
        }else
        if(message.content.startsWith('r!c l')){
            updateScore(message.author.id,0,1);
            message.channel.send("Gotcha! \n" + makeSummary("brief",message.author.id));
        }
        if(message.content.startsWith('r!c s')){
            response = makeSummary("None",message.author.id);
            message.channel.send(response);
        }
        if(message.content.startsWith('r!c channel')){
            users.get(message.author.id)["channelID"] = message.channel.id;
            message.channel.send("Channel set!");
        }
        if(message.content.toString().includes("w:") || message.content.toString().includes("l:")){
            winLossPaser(message.content.toString(),message.author.id);
            message.channel.send("Gotcha! \n" + makeSummary("brief",message.author.id));
        } 
    }     
}
function winLossPaser(message,id){
    let wins = 0; 
    let loss = 0; 
    if(message.indexOf("w:")!=-1){
        let endy = 0; 
        let fucker = message.indexOf(" ",message.indexOf("w:"));
        if(fucker == -1){
            console.log("TO THE EDGE!");
            endy = message.length;
        }else{
            endy = message.indexOf(" ",message.indexOf("w:"));       
        }
        wins = message.substring(message.indexOf("w:")+2,endy);
    }
    if(message.indexOf("l:")!=-1){
        let endy = 0; 
        let fucker = message.indexOf(" ",message.indexOf("l:"));
        if(fucker == -1){
            endy = message.length;
        }else{
            endy = message.indexOf(" ",message.indexOf("l:"));
        }
        loss = message.substring(message.indexOf("l:")+2,endy);
    }
    console.log("w : "+ wins + " l : " + loss);
    updateScore(id,parseInt(wins),parseInt(loss));
}

function init(client){
    //setInterval(timey,60000);
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
      console.log(users);
}
function save(){
    
    console.log("trying to save...");
    // console.log(users);
    // fs.writeFileSync('./users.env',users, 'utf-8');
    // console.log("Saved!");
    function store(value,key,map){
        fs.writeFileSync('./users/'+key,JSON.stringify(value,null,2),'utf-8')
        console.log("Saved : " + key + " ! ");
    }
    users.forEach(store);

}
var weeksReset = false; 
var dayReset = false; 
var monthReset = false;   
function timey(client){
    var today =  new Date()
    // console.log("--------------checking time------------------");
    // console.log("date" + today.getDate());
    // console.log("hour" + today.getHours());
    // console.log("date" + today.getDay());
    console.log("dayReset is " + dayReset);
    // console.log("--------------checking time------------------");
    if(today.getHours() == 0 && dayReset == false){
        console.log("sending summary");
        sendSummary(client,"Day");
        dayReset = true;
        
    }                           //Triggers everytime a day has gone by 
    if(today.getHours()>0){
        console.log("hour greater than 0")
        dayReset = false; 
    }

    if(today.getDay() == 0 && dayReset == false){
        sendSummary(client,"Week");
        weeksReset = true;
    }
    if(today.getDay()>0){
        weekReset = false; 
    }

    if(today.getDate() == 1 && monthReset == false){
        sendSummary(client,"Month");
        monthReset = true;
    }
    if(today.getDate()>1){
        monthReset = false; 
    }

}
function sendSummary(client,type){
    console.log(users);
    console.log("fuckbeans");

    function update(value,key,map){
        console.log("for each!");
        console.log("checking " + key);
        if(value["channelID"] !=undefined){
            const channel = client.channels.cache.get(value["channelID"]);
            let summary = makeSummary(type,key); 
            if(summary.length >0){
                channel.send(summary);
            }
            
        }
    }
    console.log();
    users.forEach((values,keys)=>{
        update(values,keys);
      });
}
function makeSummary(type,id){
    var summary = "Summary for <@" + id +"> \n";
        summary+= "Daily w:" + users.get(id)["dayWins"] + " l:" + users.get(id)["dayLoss"] + "\n";
        summary+= "Weekly w:" + users.get(id)["weekWins"] + " l:" + users.get(id)["weekLoss"]+ "\n";
        summary+= "Monthly w:" + users.get(id)["monthWins"] + " l:" + users.get(id)["monthLoss"]+ "\n";
    if(type == "brief"){
        return "Daily\nWINS: " + users.get(id)["dayWins"] + "\nLOSES: " + users.get(id)["dayLoss"] + "\n";
    }
    if(type == "None"){
        return summary;
    }
    if(type == "Day"){    
        users.get(id)["dayWins"] = 0; 
        users.get(id)["dayLoss"] = 0;
        save();
        return summary;  
    }else
    if(type == "Week"){    
        users.get(id)["weekWins"] = 0; 
        users.get(id)["weekLoss"] = 0; 
        save();
        return "";
    }else
    if(type == "Month"){    
        users.get(id)["monthWins"] = 0; 
        users.get(id)["monthLoss"] = 0;
        save();
        return "";
    }

}
function updateScore(id,w,l){
    users.get(id)["totalWins"] +=w;
    users.get(id)["dayWins"] +=w;
    users.get(id)["weekWins"] +=w;
    users.get(id)["monthWins"] +=w;

    users.get(id)["totalLoss"] +=l;
    users.get(id)["dayLoss"] +=l;
    users.get(id)["weekLoss"] +=l;
    users.get(id)["monthLoss"] +=l;
    save();
}
