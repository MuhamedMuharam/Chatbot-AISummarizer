import { reviewRepository } from '../repositories/review.repository';
import { llmClient } from '../llm/client';
import template from '../prompts/summarize-reviews.txt';

export const reviewService = {
   async summarizeReviews(productId: number): Promise<string> {
      //first check if we have a recent summary
      const existingSummary =
         await reviewRepository.getReviewSummary(productId);
      if (existingSummary) {
         return existingSummary;
      }

      //first get the last 10 reviews for the product
      const reviews = await reviewRepository.getReviews(productId, 10);

      const joinedReviews = reviews.map((r) => r.content).join('\n\n');
      const prompt = template.replace('{{reviews}}', joinedReviews);

      const response = await llmClient.generateText({
         model: 'gpt-4.1-mini',
         prompt,
         temperature: 0.2, // no creativity needed for summarization
         maxTokens: 500,
      });

      const summary = response.text;
      await reviewRepository.storeReviewSummaary(productId, summary);
      return summary;
      // then send them to an LLM to generate a summary
   },
};
