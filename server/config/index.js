/**
 * Houses all the application configuration.
*/
const ENV = process.env.ENV || 'development';
const LOGS_LOCATION = './logs';
const LOGS = `${LOGS_LOCATION}/${ENV}.log`;
const DB_URL = (ENV === 'production') ? '': '';
const PORT = process.env.PORT || 3000;

module.exports = {
    LOGS_LOCATION,
    LOGS,
    DB_URL,
    PORT
};