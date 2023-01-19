"use strict";
module.exports = {
    parseDur: function (ms) {
        let seconds = ms / 1000; // Convert to seconds
        const days = Math.floor(seconds / 86400); // Get the number of days
        seconds = seconds % 86400; // Get the remaining seconds
        const hours = Math.floor(seconds / 3600); // Get the number of hours
        seconds = seconds % 3600; // Get the remaining seconds
        const minutes = Math.floor(seconds / 60); // Get the number of minutes
        seconds = seconds % 60; // Get the remaining seconds
        if (days) { // If there are days
            return `${days} days, ${hours} hours, ${minutes} minutes`; // Return the days, hours, and minutes
        }
        else if (hours) { // If there are hours
            return `${hours} hours, ${minutes} minutes, ${seconds} seconds`; // Return the hours, minutes, and seconds
        }
        else if (minutes) { // If there are minutes
            return `${minutes} minutes, ${seconds} seconds`; // Return the minutes and seconds
        }
        return `${seconds} second(s)`; // Return the seconds
    },
    currentTime: function () {
        const date = new Date().toLocaleDateString(); // Get the current date
        const time = new Date().toLocaleTimeString(); // Get the current time
        const currentDate = date + ' @ ' + time; // Combine the date and time
        return currentDate; // Return the current date and time
    },
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
    currentDate: new Date().toLocaleDateString() + ' @ ' + new Date().toLocaleTimeString(),
};
