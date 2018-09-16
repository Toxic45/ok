const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});﻿
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't Find Commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  })
  
})


bot.on("ready", async () => {
  console.log(`${bot.user.username}is online!`);
  bot.user.setActivity("Being Coded by Toxic On Atom", {type: "Playing"});
  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);

});

bot.on("guildMemberAdd", async member =>{
  console.log(`${member.id} joined the Server!`);

  let welcomechannel = member.guild.channels.find(`name`, "welcome_left");
  welcomechannel.send(`${member} has just Joined the Server.Have a Good Time Here!`);

});

bot.on("guildMemberRemove", async member =>{
  console.log(`${member.id} left the Server!`);

  let welcomechannel = member.guild.channels.find(`name`, "welcome_left");
  welcomechannel.send(`${member} has just left the Server.Bye Bye ${member} :frowning: ...`);

});


bot.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
  }

  let prefix = prefixes[message.guild.id].prefixes;

  //let prefix = botconfig.prefix
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1)
  if(!message.content.startsWith(botconfig.prefix)) return;


  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);


});
bot.login(botconfig.token);
