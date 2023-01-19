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
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../index")); // Import the client from the index file
const createDatabaseDocument = require("../modules/createDatabaseDocument");
const client = index_1.default.client; // Get the client from the index file
module.exports = {
    name: 'interactionCreate',
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (interaction.isCommand()) {
                    const command = index_1.default.client.commands.get(interaction.commandName); // Get the command from the client's commands collection
                    if (!command)
                        return; // If the command is not found, return
                    const profileData = yield createDatabaseDocument.createProfileDocument(interaction.user.id);
                    const guildData = yield createDatabaseDocument.createGuildDocument(interaction.guild.id);
                    try {
                        yield command.execute({ client, interaction, profileData, guildData }); // Execute the command
                    }
                    catch (error) {
                        console.error(error); // If there is an error, log it
                        yield interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
                    }
                }
            }
            catch (error) {
                console.error(error);
            }
        });
    },
};
