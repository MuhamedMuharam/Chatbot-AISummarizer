import express from 'express';
import dotenv from 'dotenv';
import router from './routes.js';

dotenv.config();

const app = express();
app.use(express.json()); // middleware to parse response body as JSON
app.use(router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
   //starts our web server
   console.log(`Server is running on http://localhost:${port}`);
});
