import express from 'express';
import 'express-async-errors';

import './database/connection';

import routes from './routes';
import errorHandler from './errors/handler';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());
app.use(errorHandler);
app.use(routes);

app.listen(port);