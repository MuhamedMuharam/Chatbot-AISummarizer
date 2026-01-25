import { OpenAI } from 'openai/client';
import { conversationRepository } from '../repositories/conversation.repository';

//implemntation detail
const client = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY,
});

type ChatResponse = {
   id: string;
   message: string;
};

// public interface

//now this module encapsulates all chat related operations
// and if u need to change the LLM provider, u only need to change this file
export const chatService = {
   // chat service methods would go here
   async sendMessage(
      prompt: string,
      conversationId: string
   ): Promise<ChatResponse> {
      // Implementation for sending a message
      const response = await client.responses.create({
         model: 'gpt-4o-mini',
         input: prompt,
         temperature: 0.2,
         max_output_tokens: 100,
         previous_response_id:
            conversationRepository.getLastResponseId(conversationId),
      });

      conversationRepository.setResponseId(conversationId, response.id);
      return { id: response.id, message: response.output_text };
   },
};
