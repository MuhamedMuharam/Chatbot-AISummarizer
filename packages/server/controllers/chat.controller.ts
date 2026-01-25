import type { Request, Response } from 'express';
import { chatService } from '../services/chat.service';
import z from 'zod';

//implementation detail
const chatSchema = z.object({
   prompt: z
      .string()
      .trim()
      .min(1, 'Prompt cannot be empty')
      .max(1000, 'Prompt is too long'),
   conversationId: z.string().uuid(),
});

//public interface
export const chatContoller = {
   async sendMessage(req: Request, res: Response) {
      const parseResult = chatSchema.safeParse(req.body);
      if (!parseResult.success) {
         res.status(400).json(parseResult.error.format());
         return;
      }
      try {
         const { prompt, conversationId } = req.body;
         const response = await chatService.sendMessage(prompt, conversationId); // delegate to chat service
         // this response is of type ChatResponse

         res.json({ message: response.message }); // return json response
      } catch (error) {
         res.status(500).json({ error: 'Failed to generate a response' });
      }
   },
};
