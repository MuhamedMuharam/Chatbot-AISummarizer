import dayjs from 'dayjs';
import { PrismaClient, type Review } from '../generated/prisma/client';

const prisma = new PrismaClient();
export const reviewRepository = {
   async getReviews(productId: number, limit?: number): Promise<Review[]> {
      return prisma.review.findMany({
         where: { productId },
         orderBy: { createdAt: 'desc' },
         take: limit, //limit to 'specified number of reviews if provided
      });
   },

   storeReviewSummaary(productId: number, summary: string) {
      const now = new Date();
      const expiresAt = dayjs().add(7, 'days').toDate();
      //dayjs is a date manipulation library
      return prisma.summary.upsert({
         where: { productId },
         create: {
            content: summary,
            expiresAt,
            generatedAt: now,
            productId,
         },
         update: {
            content: summary,
            expiresAt,
            generatedAt: now,
            productId,
         },
      });
   },

   async getReviewSummary(productId: number): Promise<string | null> {
      const summary = await prisma.summary.findFirst({
         where: {
            AND: [{ productId }, { expiresAt: { gt: new Date() } }],
         },
      }); // equivalent to: where productId = @productId and expiresAt > now
      return summary ? summary.content : null;
   },
};
