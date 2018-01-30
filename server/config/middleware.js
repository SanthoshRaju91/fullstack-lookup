/**
 * Integrating middleware for the express application instance.
 * Here you add any middleware for the application instance
 * This also where you can add cross-domain origin and CSP rules to authenticate the requests.
 * As part of the demo application I will be exposing the API's public, so anyone can consume my API's
 * Serve the static assets
 */

import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

export default (express, app) => {
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false}));
    app.use(morgan());
    app.use(cors());
};