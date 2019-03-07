import express from 'express';
import 'dotenv/config';

const app = express();

/* PORT */

const port = 3000;

app.listen(port, () => {
  console.log(`You're listening to port: ${port}`);
});
