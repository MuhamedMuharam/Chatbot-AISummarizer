import { Ollama } from 'ollama';
import { OpenAI } from 'openai';
import { InferenceClient } from '@huggingface/inference';
import summarizePrompt from '../prompts/summarize-reviews2.txt';

const openAIClient = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY,
});

const inferenceClient = new InferenceClient(process.env.HF_TOKEN);

const ollamaClient = new Ollama();

type GenerateTextOptions = {
   model?: string;
   prompt: string;
   instructions?: string;
   temperature?: number;
   maxTokens?: number;
   previousResponseId?: string;
};

type GenerateTextResult = {
   id: string;
   text: string;
};

export const llmClient = {
   async generateText({
      model = 'gpt-4.1',
      prompt,
      instructions,
      temperature = 0.2,
      maxTokens = 300,
      previousResponseId,
   }: GenerateTextOptions): Promise<GenerateTextResult> {
      const response = await openAIClient.responses.create({
         model,
         input: prompt,
         instructions,
         temperature,
         max_output_tokens: maxTokens,
         previous_response_id: previousResponseId,
      });
      return { id: response.id, text: response.output_text };
   },

   async summarizeReviews(text: string) {
      //ignore bart for now
      // const output = await inferenceClient.summarization({
      //    model: 'facebook/bart-large-cnn',
      //    inputs: text,
      //    provider: 'hf-inference',
      // });
      // console.log(output.summary_text);

      const response = await ollamaClient.chat({
         model: 'tinyllama',
         messages: [
            { role: 'system', content: summarizePrompt },
            {
               role: 'user',
               content: text,
            },
         ],
      });
      //return chatCompletion.choices[0]?.message.content || '';
      return response.message.content;
   },
};
