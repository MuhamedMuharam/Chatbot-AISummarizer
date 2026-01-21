import express from 'express';
import type { Request,Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});
app.get('/api/hello', (req: Request, res: Response) => {
    res.json({ message: 'Hello from the API!' });
});

app.get('/api/hello2', (req: Request, res: Response) => {
    res.json({ message: 'Hello from the 2!' });
});


app.listen(port, () => {  //starts our web server
    console.log(`Server is running on http://localhost:${port}`);
});