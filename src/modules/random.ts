export = {
    randomHexColour : function(): number {
        const hex: number = Math.floor(Math.random() * 0xFFFFFF);
        return hex;
    },
    randomInt : function(max: number): number {
        return Math.floor(Math.random() * max);
    },
    randomIntInRange : function(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    randomInRange : function(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    },
};
