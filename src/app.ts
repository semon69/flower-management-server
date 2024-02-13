import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './modules/user/user.route';
import { globalErrorHandler } from './middleware/globalErrorHandler';
import { notFoundApi } from './middleware/notFountApi';
import { FlowerRoutes } from './modules/flower/flower.route';
import cookieParser from 'cookie-parser';
import { SellRoutes } from './modules/sells/sell.route';
const app: Application = express();

// parser
app.use(express.json());
app.use(cookieParser());
// app.use(cors());

app.use(cors({ origin: ['https://flower-management-client-kappa.vercel.app'], credentials: true }));
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept',
//   );
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.header('Access-Control-Allow-Credentials', 'true');
//   next();
// });

app.use('/api/v1', UserRoutes);
app.use('/api/v1', FlowerRoutes);
app.use('/api/v1', SellRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send({
    success: true,
    message: 'Welcome to Flower Mangement Database',
  });
});

app.use(globalErrorHandler);
app.use(notFoundApi);

export default app;
