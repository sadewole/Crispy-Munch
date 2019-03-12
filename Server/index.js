import express from 'express';
import logger from 'morgan';
import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoute from './route/auth';
import orderRoute from './route/order';
import menuRoute from './route/menu';
import userRoute from './route/user';

const app = express();

// middleware
app.use(cors());
app.use(logger());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routers
app.use('/api/v1', authRoute);
// app.use('/api/v1', orderRoute);
app.use('/api/v1', menuRoute);
// app.use('/api/v1', userRoute);

// Error handler
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  const error = app.get('env') === 'development' ? err : {};
  res.status(error.status || 500).json({
    error: {
      message: error.message
    }
  });
});

/* PORT */

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`You're listening to port: ${port}`);
});
