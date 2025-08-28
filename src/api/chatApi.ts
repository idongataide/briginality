import { axiosAPIInstance } from "./interceptor";

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string | null;
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'file';
}

export interface ChatResponse {
  status: string;
  data: {
    chats: ChatMessage[];
    club_id: string;
    club_name: string;
  };
  message: string;
}

export const getClubChat = async (clubId: string): Promise<ChatResponse> => {
  try {
    const response = await axiosAPIInstance.get(`/chats/${clubId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch chat messages');
  }
};

export const sendMessage = async (groupId: string, message: string): Promise<any> => {
  try {
    const response = await axiosAPIInstance.post(`/chats`, {
      group_id: groupId,
      content: message,
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to send message');
  }
};
