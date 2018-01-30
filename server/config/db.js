/**
 * Intializing connection for MongoDB.
 * This can be any database initialization, but for this example I'm using mongoDB hence using mongoose
 * node module for creating an instance
*/

import mongoose from 'mongoose';
import { DB_URL } from './index';
import logger from '../utils/logger';

export default () => {
    mongoose.Promise = global.Promise;
    mongoose.connect(DB_URL);

    mongoose.connection
        .once('open', () => logger.log(`Connected to MongDB`))
        .on('error', err => logger.error(`Error connecting to MongoDB: ${err}`));
};

export function close() {
    mongoose.connection.close();
}