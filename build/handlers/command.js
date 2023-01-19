"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-var-requires */
const fs_1 = __importDefault(require("fs"));
const ascii_table_1 = __importDefault(require("ascii-table"));
const path_1 = __importDefault(require("path"));
const table = new ascii_table_1.default('Commands');
table.setHeading('Command', ' Load status');
module.exports = (client) => {
    fs_1.default.readdirSync('./build/commands').forEach((dir) => {
        const commands = fs_1.default.readdirSync(`./build/commands/${dir}/`).filter((file) => file.endsWith('.js'));
        for (const file of commands) {
            const pull = require(path_1.default.resolve(`./build/commands/${dir}/${file}`));
            if (pull.name) {
                client.commands.set(pull.name, pull);
                table.addRow(file, '✅');
            }
            else {
                table.addRow(file, '❌ -> missing a name, or name is not a string.');
                continue;
            }
        }
    });
    console.log(table.toString());
};
