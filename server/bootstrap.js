import fs from 'fs';
import config from './config';

const { LOG_LOCATION } = config;

if(!fs.existsSync(LOG_LOCATION)) {
    fs.mkdirSync(LOG_LOCATION);
    console.log('logs folder was not present, created a log folder');
}
