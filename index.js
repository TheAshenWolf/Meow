const data = require("./raven.json");
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
            message.delete(1000);
            request.get('http://thecatapi.com/api/images/get?format=src&type=png', {}, (error, response) => {
                if(!error && response.statusCode == 200) {
                    message.channel.send(response.request.uri.href);
                } else {
                    console.log(error);
                }
            });
        }
        else if (message.content.toLowerCase() == "woof") {
            message.delete(1000);
            request.get('https://dog.ceo/api/breeds/image/random', {}, (error, response) => {
                if(!error && response.statusCode == 200) {
                    message.channel.send(JSON.parse(response.body).message);
                } else {
                    console.log(error);
                }
            });
        }
    }
});

client.login(data.token);