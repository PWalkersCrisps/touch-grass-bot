import { shortHand } from '../data/mulitplesOfBytes.json';

export function capitalizeFirstLetter(string: string): string {
    // Capitalize the first letter of a string
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function formatBytes(bytes: number, decimals = 2): string {
    if (bytes === 0) return '0 Bytes'; // If the bytes is 0, return 0 Bytes

    // The number of bytes in a kilobyte
    const kilobyteConversionFactor = 1024;

    // The number of suffixes to use
    const suffixIndex = Math.floor(Math.log(bytes) / Math.log(kilobyteConversionFactor));

    // The suffixes to use for formatting the bytes
    const suffixes = shortHand;

    // Return the bytes in the correct format
    return parseFloat((bytes / Math.pow(kilobyteConversionFactor, suffixIndex)).toFixed(decimals)) + ' ' + suffixes[suffixIndex];
}

export function isValidHttpUrl(string: string): boolean {
    // Attempt to create a URL object from the string
    try {
        new URL(string);
    }
    catch (_) {
        // If the string is not a valid URL, return false
        return false;
    }

    // If the URL object was created successfully, return true
    return true;
}
