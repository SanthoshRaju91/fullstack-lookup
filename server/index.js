import express from 'express';
import path from 'path';
import { PORT, isProd } from './config';
import db from './config/db';
import middleware from './config/middleware';
import logger from './utils/logger';
import { WSRoutes } from './modules';

const app = express();

// calling db function to establish connection with mongoDB
db();
// adding middlewares for express application instance
middleware(express, app);

// adding all the routes
app.use('/api', WSRoutes);

// handling root request '/'
app.get('/', (req, res) => {
    if(isProd) {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));        
    } else {
        res.send('Not default index page');
    }
});

// Global error handler.
app.use((err, req, res, next) => {
    if(err) {
        logger.error(`Error: ${err}`);
        res.status(500).json({
            success: false,
            message: 'Something went wrong'
        });
    }
})

app.listen(PORT, err => {
    if(err) {
        logger.error(`Error listening on PORT: ${PORT} - ${err}`);
    } else {
        logger.log(`Server started on PORT - ${PORT}`);
    }
});

