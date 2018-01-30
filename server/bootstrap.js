import fs from 'fs';
import { LOGS_LOCATION } from './config';

if(!fs.existsSync(LOGS_LOCATION)) {
    fs.mkdirSync(LOGS_LOCATION);
    console.log('logs folder was not present, created a log folder');
}
