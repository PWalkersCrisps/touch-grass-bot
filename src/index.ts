import { TouchGrassClient } from './structures/client'; // Import the TouchGrassClient class from ./utils/client.ts
import { connectToMongoDB } from './handlers/mongo'; // Import the connectToMongoDB function from ./handlers/mongo.ts

export const args = process.argv.slice(2); // Get the arguments passed to the node command
if (args.includes('dev')) process.env.NODE_ENV = 'development';
else process.env.NODE_ENV = 'production';

export const client = new TouchGrassClient(); // Create a new instance of the TouchGrassClient class
connectToMongoDB(); // Connect to the MongoDB database
client.start();