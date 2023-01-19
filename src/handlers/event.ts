/* eslint-disable @typescript-eslint/no-var-requires */
import fs from 'fs';
const eventFiles = fs.readdirSync('./build/events').filter(file => file.endsWith('js')); // Gets all the files in the events folder and puts them into an array
module.exports = (client: any) => {
    for (const file of eventFiles) {
        const event: any = require(`../events/${file}`);
        if (event.once) { // If an event has a once tag it will try to make it occur once when the bot is turned on
            client.once(event.name, (...args: any) => event.execute(...args));
        }
        else { // If it doesnt have the once tag everything will continue as normal
            client.on(event.name, (...args: any) => event.execute(...args));
        }
    }
};