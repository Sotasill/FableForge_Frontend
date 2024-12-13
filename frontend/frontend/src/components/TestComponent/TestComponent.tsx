import React, { useState } from 'react';
import { storyApi } from '../../services/api/storyApi';

const TestComponent: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [story, setStory] = useState<any>(null); // Замените any на правильный тип, если у вас есть
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleTest = async () => {
        setLoading(true);
        setError(null);
        setStory(null);

        try {
            // Генерация истории
            const generationResult = await storyApi.generateStory({
                prompt,
                genre: 'fantasy',
                tone: 'positive'
            });

            // Получение истории
            const fetchedStory = await storyApi.getStory({
                textId: generationResult.textId,
                imageId: generationResult.imageId,
                audioId: generationResult.audioId
            });

            setStory(fetchedStory);
        } catch (error) {
            console.error('Test failed:', error);
            setError('Ошибка при генерации истории.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Тестирование генерации истории</h2>
            <textarea 
                value={prompt} 
                onChange={(e) => setPrompt(e.target.value)} 
                placeholder="Введите описание истории..."
            />
            <button onClick={handleTest} disabled={loading}>
                {loading ? 'Генерация...' : 'Создать историю'}
            </button>

            {error && <div style={{ color: 'red' }}>{error}</div>}

            {story && (
                <div>
                    <h3>Сгенерированная история:</h3>
                    <p>{story.text}</p>
                    {story.imageId && <img src={`https://example.com/images/${story.imageId}`} alt="Сгенерированное изображение" />}
                    {story.audioId && <audio controls src={`https://example.com/audio/${story.audioId}`}>Ваш браузер не поддерживает аудио.</audio>}
                </div>
            )}
        </div>
    );
};

export default TestComponent; 