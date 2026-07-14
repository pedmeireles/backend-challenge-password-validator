import express, { type Request, type Response } from 'express';
import { validatePasswordController } from './controller';
import { passwordZodSchema, validatePayload } from './payload';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Olá, TypeScript + Express!');
});

app.post(
  '/validate-password',
  validatePayload(passwordZodSchema),
  validatePasswordController
);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
