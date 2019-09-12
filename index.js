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
        else if (message.content.toLowerCase() == "woof") {
            message.delete(50);
            request.get('https://dog.ceo/api/breeds/image/random', {}, (error, response) => {
                if(!error && response.statusCode == 200) {
                    let dog = JSON.parse(response.body).message;
                    let breedName = dog.split("/")[4];
                    let breed = breedName.includes("-") ? breedName.split("-")[1] + " " + breedName.split("-")[0] : breedName;
                    breed = breed.charAt(0).toUpperCase() + breed.slice(1);

                    message.channel.send(`
${dog}
**Breed: **${breed}`);
                } else {
                    console.log(error);
                }
            });
        }
    }
});
client.login(data.token);