"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const discord_js_1 = require("discord.js");
const guildSchema_1 = __importDefault(require("../models/guildSchema"));
const tags_json_1 = __importDefault(require("../data/tags.json"));
const filters_json_1 = __importDefault(require("../data/filters.json"));
const booru_1 = require("booru");
const url = 'https://rule34.xxx/index.php?page=dapi&s=post&q=index&json=1&limit=100&tags=';
// Delay function
const delay = (seconds) => new Promise((resolve) => setTimeout(resolve, seconds * 1000));
module.exports = {
    autoPost: function (client, loopDelay) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('Posting to premium server...');
                // Get random item from tags.json
                const tag = tags_json_1.default[Math.floor(Math.random() * tags_json_1.default.length)];
                // Search for a post using the selected tag
                const posts = yield this.searchPosts('rule34', tag, 5);
                if (!posts[0] || !posts[0].fileUrl || !posts) {
                    // If no post is found, try again in 5 seconds
                    delay(5).then(() => __awaiter(this, void 0, void 0, function* () { yield this.autoPost(client, loopDelay); }));
                    return;
                }
                const post = posts[0];
                // Create an embed with the post's image
                const embed = new discord_js_1.EmbedBuilder()
                    .setColor('Random')
                    .setImage(yield post.fileUrl);
                // Create a row of buttons with links to the post and a delete button
                const row = new discord_js_1.ActionRowBuilder()
                    .addComponents(new discord_js_1.ButtonBuilder()
                    .setStyle(discord_js_1.ButtonStyle.Link)
                    .setLabel('View Post')
                    .setURL(post.postView), new discord_js_1.ButtonBuilder()
                    .setStyle(discord_js_1.ButtonStyle.Danger)
                    .setLabel('⚠️')
                    .setCustomId('delete'));
                const guilds = yield guildSchema_1.default.find({ premium: true });
                for (const guild of guilds) {
                    const channel = client.channels.cache.get(guild.autoPostChannel);
                    if (channel) {
                        channel.send({ embeds: [embed], components: [row] });
                    }
                }
            }
            catch (error) {
                // Log any errors that occur
                console.log(error);
            }
            // Set a timeout to run the function again after the specified delay
            delay(loopDelay).then(() => { this.autoPost(client, loopDelay); });
        });
    },
    searchPosts: function (site, tags, limit = 1, random = true, rating = ['e', 'q']) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rawPosts = yield (0, booru_1.search)(site, tags, { limit, random });
                let posts;
                if (!rawPosts[0]) {
                    return;
                }
                posts = rawPosts.filter((post) => rating.includes(post.rating));
                if (!posts[0]) {
                    return;
                }
                // Filter out posts that are blacklisted with tags in filters.json
                posts = posts.filter((post) => !filters_json_1.default.some((filter) => post.tags.includes(filter)));
                return posts;
            }
            catch (error) {
                return console.error(error);
            }
        });
    },
};
