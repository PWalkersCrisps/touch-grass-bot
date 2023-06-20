import { connect } from 'mongoose';

export default async function mongoConnect(): Promise<void> {

    const connectionUri: string | undefined = process.env.MONGODB_URI;

    if (!connectionUri) throw new Error('No MongoDB URI provided!');

    console.log(connectionUri);

    connect(connectionUri);
}