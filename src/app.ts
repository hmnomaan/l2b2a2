import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import UserRoutes from './modules/user/user.routes';

const app: Application = express();

//parser middleware
app.use(express.json());
app.use(cors());

//application routes
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to the user and Order management server',
  });
});
app.use('/api/users', UserRoutes);

// not found -- 404
app.all('*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: '404! Route Not found.',
  });
});

export default app;
