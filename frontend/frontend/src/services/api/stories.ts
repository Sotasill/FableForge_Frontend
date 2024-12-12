import { axiosInstance } from './axios';

export interface Story {
  id: string;
  title: string;
  text: string;
  audioUrl?: string;
  createdAt: string;
  author: string;
}

export const storiesApi = {
  async getStories(): Promise<Story[]> {
    const { data } = await axiosInstance.get('/stories');
    return data;
  },

  async createStory(text: string): Promise<Story> {
    const { data } = await axiosInstance.post('/stories', { text });
    return data;
  }
}; 