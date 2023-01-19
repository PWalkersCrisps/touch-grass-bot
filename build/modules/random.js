"use strict";
module.exports = {
    randomHexColour: function () {
        const hex = Math.floor(Math.random() * 0xFFFFFF);
        return hex;
    },
    randomInt: function (max) {
        return Math.floor(Math.random() * max);
    },
    randomIntInRange: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    randomInRange: function (min, max) {
        return Math.random() * (max - min) + min;
    },
};
