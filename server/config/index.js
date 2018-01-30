/**
 * Houses all the application configuration.
*/
const ENV = process.env.ENV || 'development';
const isProd = (ENV === 'production');
const LOGS_LOCATION = './logs';
const LOGS = `${LOGS_LOCATION}/${ENV}.log`;
const DB_URL = (isProd) ? '': 'mongodb://0.0.0.0:27017/workshops';
const PORT = process.env.PORT || 3000;

module.exports = {
    LOGS_LOCATION,
    LOGS,
    DB_URL,
    PORT,
    isProd
};