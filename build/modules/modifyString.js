"use strict";
const mulitplesOfBytes_json_1 = require("../data/mulitplesOfBytes.json");
module.exports = {
    capitalizeFirstLetter: function (string) {
        // Capitalize the first letter of a string
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    formatBytes: function (bytes, decimals = 2) {
        if (bytes === 0)
            return '0 Bytes'; // If the bytes is 0, return 0 Bytes
        // The number of bytes in a kilobyte
        const kilobyteConversionFactor = 1024;
        // The number of suffixes to use
        const suffixIndex = Math.floor(Math.log(bytes) / Math.log(kilobyteConversionFactor));
        // The suffixes to use for formatting the bytes
        const suffixes = mulitplesOfBytes_json_1.shortHand;
        // Return the bytes in the correct format
        return parseFloat((bytes / Math.pow(kilobyteConversionFactor, suffixIndex)).toFixed(decimals)) + ' ' + suffixes[suffixIndex];
    },
    isValidHttpUrl: function (string) {
        // Attempt to create a URL object from the string
        let url;
        try {
            url = new URL(string);
        }
        catch (_) {
            // If the string is not a valid URL, return false
            return false;
        }
        // If the URL object was created successfully, return true
        return true;
    },
};
