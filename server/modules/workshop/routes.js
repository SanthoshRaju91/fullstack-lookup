import { Router } from 'express';
import {
    createWS,
    getAllWS,
    getWS,
    updateWS,
    deleteWS
} from './controller';

const routes = new Router();

routes.post('/workshop/new', (req, res) => {
    createWS(req, res);
});

routes.get('/workshop/getAll', (req, res) => {
    getAllWS(req, res);
});

routes.get('/workshop/get/:id', (req, res) => {
    getWS(req, res);
});

routes.post('/workshop/update', (req, res) => {
    updateWS(req, res);
});

routes.post('/workshop/delete/:id', (req, res) => {
    deleteWS(req, res);
});

export default routes;