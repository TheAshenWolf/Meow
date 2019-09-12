const data = require("./bot.json");
const Discord = require('discord.js');
const client = new Discord.Client();
const request = require('request');

client.on('ready', () => {
    console.log('Meow!');
    client.user.setActivity('with kittens.');
    console.log("^.^");
    console.log("");
});

client.on('message', (message) => {
    if(message.author.id === client.user.id){
        message.react("❤");
    }
    else{
        if (message.content.toLowerCase() == "meow") {
            message.delete(50);
            request.get('https://api.thecatapi.com/v1/images/search', {}, (error, response) => {
                if(!error && response.statusCode == 200) {
                    let cat = JSON.parse(response.body)[0];
                    if(cat.breeds.length > 0){
                        message.channel.send(`
${cat.url}
**Breed: **${cat.breeds[0].name}
> ${cat.breeds[0].description}`);
                    }
                    else{
                        message.channel.send(cat.url);
                    }
                } else {
                    console.log(error);
                }
            });
        }
        
    }   
});
client.login(data.token);