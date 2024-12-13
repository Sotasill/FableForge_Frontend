import React, { useState } from 'react';
import { axiosInstance } from '../../services/api/axios';
import { storyApi } from '../../services/api/storyApi';
import axios from 'axios';

const ApiTester: React.FC = () => {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  // Тест подключения к серверу
  const testConnection = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await storyApi.checkHealth();
      setResult(`Сервер доступен\nОтвет: ${JSON.stringify(response, null, 2)}`);
      console.log('Server response:', response);
    } catch (err) {
      console.error('Connection test full error:', err);
      if (axios.isAxiosError(err)) {
        setError(`Ошибка подключения: ${err.message}\nСтатус: ${err.response?.status}\nДанные: ${JSON.stringify(err.response?.data)}`);
      } else {
        setError(`Неизвестная ошибка: ${err}`);
      }
    } finally {
      setLoading(false);
    }
  };

  // ��ест генерации истории
  const testGeneration = async () => {
    setLoading(true);
    setError('');
    try {
      setResult('Отправка запроса на генерацию...\n');
      
      const testPrompt = "Напиши короткую историю о коте, который научился летать";
      setResult(prev => prev + `\nТекст запроса: ${testPrompt}\n`);

      const response = await storyApi.generateStory({
        prompt: testPrompt,
        genre: "fantasy",
        tone: "positive"
      });
      
      setResult(prev => prev + `\nОтвет от сервера:\n${JSON.stringify(response, null, 2)}\n`);
      
      if (response.textId) {
        setResult(prev => prev + '\nНачинаем проверку статуса...');
        
        const checkStatus = async () => {
          try {
            const status = await storyApi.getGenerationStatus({
              textId: response.textId,
              imageId: response.imageId,
              audioId: response.audioId
            });

            if (!status) {
              throw new Error('Status response is undefined');
            }

            setResult(prev => prev + `\n\nСтатус генерации:\n${JSON.stringify(status, null, 2)}`);

            const allCompleted = 
              status.textId && status.imageId && status.audioId && 
              status.status === 'completed';

            if (allCompleted) {
              const story = await storyApi.getStory({
                textId: response.textId,
                imageId: response.imageId,
                audioId: response.audioId
              });
              setResult(prev => prev + `\n\nГотовая история:\n${JSON.stringify(story, null, 2)}`);
            } else if (status.status === 'failed') {
              setError('Генерация не удалась');
            } else {
              setTimeout(checkStatus, 2000);
            }
          } catch (error) {
            console.error('Error checking status:', error);
            setError('Ошибка при проверке статуса.');
          }
        };
        
        checkStatus();
      }
    } catch (err) {
      console.error('Generation test error:', err);
      if (axios.isAxiosError(err)) {
        const errorData = err.response?.data;
        const errorDetails = typeof errorData === 'string' ? errorData : JSON.stringify(errorData, null, 2);
        
        setError(
          `Ошибка генерации:\n` +
          `URL: ${err.config?.url}\n` +
          `Метод: ${err.config?.method}\n` +
          `Данные запроса: ${JSON.stringify(err.config?.data)}\n` +
          `Статус: ${err.response?.status}\n` +
          `Ответ: ${errorDetails}`
        );
      } else {
        setError(`Неизвестная ошибка: ${err}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const testEndpoints = async () => {
    setResult('Начинаем тестирование эндпоинтов...\n');
    
    try {
      // Тест health check
      setResult(prev => prev + '\nПроверка API...');
      const health = await storyApi.checkHealth();
      setResult(prev => prev + `\nОтвет: ${JSON.stringify(health)}\n`);

      // Тест генерации
      setResult(prev => prev + '\nОтправка запроса на генерацию...');
      const generationResult = await storyApi.generateStory({
        prompt: "Тестовая история",
        genre: "fantasy",
        tone: "positive"
      });
      
      setResult(prev => prev + `\nРезультат генерации:\n${JSON.stringify(generationResult, null, 2)}\n`);

      if (generationResult.textId && generationResult.imageId && generationResult.audioId) {
        // Тест статуса
        setResult(prev => prev + '\nПроверка статуса...');
        const status = await storyApi.getGenerationStatus({
          textId: generationResult.textId,
          imageId: generationResult.imageId,
          audioId: generationResult.audioId
        });
        setResult(prev => prev + `\nСтатусы:\n${JSON.stringify(status, null, 2)}\n`);

        // Тест получения истории
        setResult(prev => prev + '\nЗапрос готовой истории...');
        const story = await storyApi.getStory({
          textId: generationResult.textId,
          imageId: generationResult.imageId,
          audioId: generationResult.audioId
        });
        setResult(prev => prev + `\nИстория:\n${JSON.stringify(story, null, 2)}\n`);
      } else {
        throw new Error('Не получены ID для генерации');
      }
    } catch (error) {
      console.error('Test failed:', error);
      if (axios.isAxiosError(error)) {
        const errorData = error.response?.data;
        const errorDetails = typeof errorData === 'string' ? errorData : JSON.stringify(errorData, null, 2);
        setResult(prev => prev + 
          `\nОшибка: ${error.message}\n` +
          `URL: ${error.config?.url}\n` +
          `Метод: ${error.config?.method}\n` +
          `Данные запроса: ${JSON.stringify(error.config?.data)}\n` +
          `Статус: ${error.response?.status}\n` +
          `Ответ: ${errorDetails}\n`
        );
      }
    }
  };

  const testVoices = async () => {
    setLoading(true);
    setError('');
    try {
      setResult('Получение списка доступных голосов...\n');
      const voices = await storyApi.getAvailableVoices();
      setResult(prev => prev + `\nДоступные голоса:\n${JSON.stringify(voices, null, 2)}`);
    } catch (err) {
      console.error('Voice test error:', err);
      if (axios.isAxiosError(err)) {
        const errorData = err.response?.data;
        const errorDetails = typeof errorData === 'string' ? errorData : JSON.stringify(errorData, null, 2);
        setError(
          `Ошибка получения голосов:\n` +
          `URL: ${err.config?.url}\n` +
          `Метод: ${err.config?.method}\n` +
          `Статус: ${err.response?.status}\n` +
          `Ответ: ${errorDetails}`
        );
      } else {
        setError(`Неизвестная ошибка: ${err}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Тестирование API</h2>
      
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button 
          onClick={testConnection} 
          disabled={loading}
        >
          Проверить подключение
        </button>
        <button 
          onClick={testGeneration} 
          disabled={loading}
        >
          Тест генерации
        </button>
        <button 
          onClick={testEndpoints} 
          disabled={loading}
        >
          Тест эндпоинтов
        </button>
        <button 
          onClick={testVoices} 
          disabled={loading}
        >
          Проверить голоса
        </button>
      </div>

      {loading && <div>Загрузка...</div>}
      
      {error && (
        <div style={{ color: 'red', marginBottom: '10px' }}>
          Ошибка: {error}
        </div>
      )}
      
      {result && (
        <pre style={{ 
          background: '#f5f5f5', 
          padding: '10px', 
          borderRadius: '4px',
          whiteSpace: 'pre-wrap',
          maxHeight: '400px',
          overflow: 'auto'
        }}>
          {result}
        </pre>
      )}
    </div>
  );
};

export default ApiTester; 