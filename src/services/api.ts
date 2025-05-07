import axios from 'axios';

const API_URL = 'http://localhost:5000';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatResponse {
  choices: Array<{
    message: ChatMessage;
  }>;
}

export const chatService = {
  /**
   * Send messages to the chatbot API
   */
  async sendMessages(messages: ChatMessage[]): Promise<ChatMessage | null> {
    try {
      console.log('Sending messages to API:', messages);
      
      const response = await axios.post<ChatResponse>(`${API_URL}/api/chat`, {
        messages,
      });
      
      console.log('API response:', response.data);
      
      if (response.data.choices && response.data.choices.length > 0) {
        return response.data.choices[0].message;
      }
      
      return null;
    } catch (error) {
      console.error('Error communicating with chatbot API:', error);
      
      // Check if it's an API quota error
      if (axios.isAxiosError(error) && error.response?.status === 500) {
        if (error.response.data?.error?.includes('quota exceeded')) {
          throw new Error('OpenAI API quota exceeded. Please check your subscription plan.');
        }
      }
      
      throw error;
    }
  }
};

export default chatService;