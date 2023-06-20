class BotHandler {
    name: string;
    intervalEnabled: boolean;
    interval: Time[];

    constructor() {
        this.name = '';
        this.intervalEnabled = false;
        this.interval = [];
    }

    async execute(...args: any[]) {
        throw new Error(`Command ${this.name} doesn't provide an execute() method!`);
    }
}

export class Handlers {
    static Event = 'eventHandler';
    static InteractionCommand = 'interactionCommandHandler';
    static Mongo = 'mongoHandler';
    static Lottery = 'lotteryHandler';
    static MessageCommand = 'messageCommandHandler';
}

export default BotHandler;