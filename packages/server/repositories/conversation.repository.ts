// implemntation detail
const conversations = new Map<string, string>();

export const conversationRepository = {
   getLastResponseId(conversationId: string) {
      return conversations.get(conversationId);
   },
   setResponseId(conversationId: string, responseId: string) {
      conversations.set(conversationId, responseId);
   },
};
