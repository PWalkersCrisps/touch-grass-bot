import { Interaction } from 'discord.js';

export function rps(interaction: Interaction, choice: RPS) {
    let description = '';
    const choices: RPS[] = ['rock', 'paper', 'scissors'];
    const randomChoice: RPS = choices[Math.floor(Math.random() * choices.length)];

    if (choice === randomChoice) {
        description = `You chose ${choice}, I chose ${randomChoice}. It's a tie!`;
    }
    else if (choice === 'rock') {
        if (randomChoice === 'paper') {
            description = `You chose ${choice}, I chose ${randomChoice}. I win!`;
        }
        else {
            description = `You chose ${choice}, I chose ${randomChoice}. You win!`;
        }
    }
    else if (choice === 'paper') {
        if (randomChoice === 'scissors') {
            description = `You chose ${choice}, I chose ${randomChoice}. I win!`;
        }
        else {
            description = `You chose ${choice}, I chose ${randomChoice}. You win!`;
        }
    }
    else if (choice === 'scissors') {
        if (randomChoice === 'rock') {
            description = `You chose ${choice}, I chose ${randomChoice}. I win!`;
        }
        else {
            description = `You chose ${choice}, I chose ${randomChoice}. You win!`;
        }
    }
    else {
        description = 'Please choose a valid option';
    }
    return description;
}