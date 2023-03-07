// Description: This file contains the code to connect to the MongoDB database
import { connect } from 'mongoose'; // Import the connect method from the mongoose module
import { config } from 'dotenv'; // Import the config method from the dotenv module
import { currentDate } from '../modules/time';
import log from '../modules/log';
config();

export async function connectToMongoDB(): Promise<void> {
    await connect(process.env.MONGODB_URI as string) // Connect to the MongoDB database
        .then(() => log(`${ currentDate } Connected to MongoDB database`)) // Log a message to the console if the connection was successful
        .catch((error) => log(error, 'error')); // Log an error to the console if the connection was unsuccessful
}