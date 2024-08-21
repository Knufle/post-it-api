import { Router } from 'express';
import StickyNotesController from './controllers/StickyNotesController';
import multer from 'multer';

const upload = multer();

const routes = Router();

routes.get('/sticky-notes', StickyNotesController.index);
routes.get('/sticky-notes/:id', StickyNotesController.show);
routes.post('/sticky-notes', upload.none(), StickyNotesController.create);
routes.delete('/sticky-notes/:id', StickyNotesController.delete);
routes.put('/sticky-notes', upload.none(), StickyNotesController.update);

export default routes;