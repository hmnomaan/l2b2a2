import express,{Request,Response} from 'express';
import cors from 'cors';
import { UserRoutes } from './modules/user/user.routes';
const app = express();

// const port = 3000;
//parser
app.use(express.json());
app.use(cors());
//app routes
app.use('/', UserRoutes);

const getAController = (req: Request, res: Response) => {
  

  res.send("Server running");
};
app.get('/', getAController);

export default app;
