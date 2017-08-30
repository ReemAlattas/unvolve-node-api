import express from 'express';

// Controller Imports
import basicController from './controllers/basicController';
import userController from './controllers/userController';
import ideaController from './controllers/ideaController';
import commentController from './controllers/commentController';
import pledgeController from './controllers/pledgeController';
import projectController from './controllers/projectController';

const routes = express();

// Basic Routes
routes.get('/', basicController.get);

// User Routes
routes.post('/signup', userController.post);

//Idea Routes
routes.post('/idea', ideaController.post);
routes.get('/ideas', ideaController.getAll);

//Comment Routes
routes.post('/comment', commentController.post);

//Pledge Routes
routes.post('/pledge', pledgeController.post);

//Project Routes
routes.post('/project', projectController.post);


export default routes;
