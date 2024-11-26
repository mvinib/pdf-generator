import { Router } from 'express';
import { api } from '../application/api';


const routes = Router();

routes.use(...api.getRoutes)

export default routes;
