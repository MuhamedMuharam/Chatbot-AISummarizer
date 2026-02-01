import express from 'express';
import type { Request, Response } from 'express';
import { chatContoller } from './controllers/chat.controller';
import { PrismaClient } from './generated/prisma';
import { reviewController } from './controllers/review.controller';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
   res.send('Hello, World!');
});
router.get('/api/hello', (req: Request, res: Response) => {
   res.json({ message: 'Hello from the API!' });
});

router.get('/api/hello2', (req: Request, res: Response) => {
   res.json({ message: 'Hello from the 2!' });
});

router.post('/api/chat', chatContoller.sendMessage);

router.get('/api/products/:id/reviews', reviewController.getReviews);

router.post(
   '/api/products/:id/reviews/summarize',
   reviewController.summarizeReviews
);

export default router;
