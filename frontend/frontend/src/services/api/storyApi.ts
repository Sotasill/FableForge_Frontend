import { axiosInstance } from './axios';
import { API_ENDPOINTS } from './endpoints';

export const storyApi = {
    // Проверка API
    checkHealth: async () => {
        const response = await axiosInstance.get(API_ENDPOINTS.IMAGE.HEALTH);
        return response.data;
    },

    // Получение списка доступных голосов
    getAvailableVoices: async () => {
        const response = await axiosInstance.get(API_ENDPOINTS.AUDIO.VOICES);
        return response.data;
    },

    // Генерация текста
    generateStory: async (data) => {
        try {
            const response = await axiosInstance.post(API_ENDPOINTS.TEXT.GENERATE, {
                text: data.prompt,
                genre: data.genre,
                tone: data.tone
            });
            
            if (!response.data) {
                throw new Error('Нет данных в ответе от сервера');
            }
            
            return response.data;
        } catch (error) {
            console.error('Generation error:', error);
            throw error;
        }
    },

    // Получение истории
    getStory: async (ids) => {
        try {
            const response = await axiosInstance.get(`${API_ENDPOINTS.TEXT.HISTORY}/${ids.textId}`);
            return response.data;
        } catch (error) {
            console.error('Get story error:', error);
            throw error;
        }
    },

    // Проверка статуса
    getGenerationStatus: async (ids) => {
        const response = await axiosInstance.get(`${API_ENDPOINTS.TEXT.CHECK_STATUS}${ids.textId}`);
        return response.data;
    }
}; 