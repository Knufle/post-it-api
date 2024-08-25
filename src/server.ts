import express from 'express';
import 'express-async-errors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './trpc';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());
app.use(
    '/trpc',
    createExpressMiddleware({
        router: appRouter,
        // createContext: () => ({}),
    })
);

app.listen(port);