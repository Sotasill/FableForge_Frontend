import React, { useState } from 'react';
import { storyApi } from '../../services/api/storyApi';
import styles from './ImageTestPage.module.css';

interface StoryResponse {
    textId: string;
    text: string;
    imageId: string;
    audioId: string;
    status: string;
}

interface StoryState {
    text: string;
    imageUrl: string;
    audioUrl: string;
}

const ImageTestPage: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [story, setStory] = useState<StoryState | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [status, setStatus] = useState<any>(null);

    const handleTest = async () => {
        if (!prompt.trim()) {
            setError('Пожалуйста, введите описание истории');
            return;
        }

        setLoading(true);
        setError(null);
        setStory(null);

        try {
            console.log('Отправка запроса на генерацию:', prompt);
            
            const generationResult = await storyApi.generateStory({
                prompt,
                genre: 'fantasy',
                tone: 'positive'
            });
            
            console.log('Результат генерации:', generationResult);

            const checkStatus = async () => {
                const status = await storyApi.getGenerationStatus({
                    textId: generationResult.textId,
                    imageId: generationResult.imageId,
                    audioId: generationResult.audioId
                });

                console.log('Статус генерации:', status);

                if (status.status === 'completed') {
                    const fetchedStory = await storyApi.getStory({
                        textId: generationResult.textId,
                        imageId: generationResult.imageId,
                        audioId: generationResult.audioId
                    }) as StoryResponse;
                    
                    console.log('Полученная история:', fetchedStory);

                    setStory({
                        text: fetchedStory.text,
                        imageUrl: `http://localhost:5500/api/images/${fetchedStory.imageId}`,
                        audioUrl: `http://localhost:5500/api/audio/${fetchedStory.audioId}`
                    });
                    setLoading(false);
                } else if (status.status === 'failed') {
                    setError('Ошибка при генерации истории');
                    setLoading(false);
                } else {
                    setTimeout(checkStatus, 2000);
                }

                setStatus(status);
            };

            checkStatus();

        } catch (error: any) {
            console.error('Test failed:', error);
            setError(error.message || 'Ошибка при генерации истории.');
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.inputSection}>
                <h2>Тестирование генерации истории с изображением</h2>
                <textarea 
                    className={styles.textarea}
                    value={prompt} 
                    onChange={(e) => setPrompt(e.target.value)} 
                    placeholder="Введите описание истории..."
                    rows={5}
                />
                <button 
                    className={styles.button}
                    onClick={handleTest} 
                    disabled={loading}
                >
                    {loading ? 'Генерация...' : 'Создать историю'}
                </button>
            </div>

            {error && <div className={styles.error}>{error}</div>}

            {loading && (
                <div className={styles.loading}>
                    <div className={styles.spinner}></div>
                    <div className={styles.progressInfo}>
                        <p>Генерация истории... Это может занять некоторое время</p>
                        <ul>
                            <li>Текст: {status?.text?.progress || 0}%</li>
                            <li>Изображение: {status?.image?.progress || 0}%</li>
                            <li>Аудио: {status?.audio?.progress || 0}%</li>
                        </ul>
                    </div>
                </div>
            )}

            {story && (
                <div className={styles.outputSection}>
                    <h3>Сгенерированная история:</h3>
                    <div className={styles.storyText}>
                        {typeof story.text === 'string' ? story.text : JSON.stringify(story.text, null, 2)}
                    </div>
                    
                    {story.imageUrl && (
                        <div className={styles.imageContainer}>
                            <img 
                                className={styles.image}
                                src={story.imageUrl} 
                                alt="Сгенерированное изображение" 
                            />
                        </div>
                    )}
                    
                    {story.audioUrl && (
                        <div className={styles.audioContainer}>
                            <h3>Аудиоверсия:</h3>
                            <audio 
                                controls 
                                src={story.audioUrl}
                            >
                                Ваш браузер не поддерживает аудио.
                            </audio>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ImageTestPage; 