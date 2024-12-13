import React, { useState } from 'react';
import { storyApi } from '../../services/api/storyApi';

const StoryGenerator: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerate = async () => {
        setLoading(true);
        setError('');

        try {
            const { textId, imageId, audioId } = await storyApi.generateStory({
                prompt,
                genre: 'fantasy',
                tone: 'positive'
            });
            console.log('Generated story IDs:', { textId, imageId, audioId });
            // Здесь можно добавить логику для проверки статуса и получения истории
        } catch (err) {
            console.error('Error generating story:', err);
            setError('Ошибка генерации истории. Пожалуйста, попробуйте еще раз.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} />
            <button onClick={handleGenerate} disabled={loading}>
                {loading ? 'Генерация...' : 'Создать историю'}
            </button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
};

export default StoryGenerator; 