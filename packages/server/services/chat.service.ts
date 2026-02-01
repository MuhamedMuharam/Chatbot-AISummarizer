import fs from 'fs';
import path from 'path';
import { conversationRepository } from '../repositories/conversation.repository';
import template from '../prompts/chatbot.txt';
import { llmClient } from '../llm/client';

//implemntation detail

const parkInfo = fs.readFileSync(
   path.join(__dirname, '..', 'prompts', 'WonderWorld.md'),
   'utf-8'
);
const instructions = template.replace('{{parkInfo}}', parkInfo);

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
      const response = await llmClient.generateText({
         model: 'gpt-4o-mini',
         instructions,
         prompt,
         temperature: 0.2,
         maxTokens: 200,
         previousResponseId:
            conversationRepository.getLastResponseId(conversationId),
      });

      conversationRepository.setResponseId(conversationId, response.id);
      return { id: response.id, message: response.text };
   },
};
