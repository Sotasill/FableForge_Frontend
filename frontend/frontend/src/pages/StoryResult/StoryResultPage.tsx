import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { storyApi } from '../../services/api/storyApi';
import { AudioPlayer } from '../../components/AudioPlayer/AudioPlayer';
import styles from './StoryResultPage.module.css';
import { GenerateStoryResponse } from '../../types';

const StoryResultPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [story, setStory] = useState<GenerateStoryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStory = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const data = await storyApi.getStory(id);
        setStory(data);
      } catch (err) {
        setError('Не удалось загрузить историю');
        console.error('Failed to load story:', err);
      } finally {
        setLoading(false);
      }
    };

    loadStory();
  }, [id]);

  const handleRegenerate = async () => {
    try {
      setRegenerating(true);
      // Имитация регенерации
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setStory(prev => prev ? {
        ...prev,
        text: 'Новая версия истории...',
        imageUrl: `https://picsum.photos/800/400?${Date.now()}`
      } : null);
    } catch (err) {
      setError('Не удалось регенерировать историю');
    } finally {
      setRegenerating(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Ссылка на историю скопирована!');
  };

  const handleDownload = () => {
    if (!story) return;
    
    // Создаем текстовый файл
    const element = document.createElement('a');
    const file = new Blob([story.text], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `story-${story.id}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Загружаем вашу историю...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>{error}</p>
        <button onClick={() => navigate('/')} className={styles.button}>
          Вернуться на главную
        </button>
      </div>
    );
  }

  if (!story) {
    return (
      <div className={styles.error}>
        <p>История не найдена</p>
        <button onClick={() => navigate('/')} className={styles.button}>
          Вернуться на главную
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{story.title}</h1>
        <div className={styles.actions}>
          <button 
            onClick={handleRegenerate} 
            className={styles.button}
            disabled={regenerating}
          >
            {regenerating ? 'Генерация...' : 'Сгенерировать заново'}
          </button>
          <button onClick={handleShare} className={styles.button}>
            Поделиться
          </button>
          <button onClick={handleDownload} className={styles.button}>
            Скачать текст
          </button>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.imageContainer}>
          <img src={story.imageUrl} alt={story.title} className={styles.image} />
        </div>

        <div className={styles.textContainer}>
          <p className={styles.text}>{story.text}</p>
        </div>

        <div className={styles.audioSection}>
          <h2>Прослушать историю</h2>
          <AudioPlayer src={story.audioUrl} />
        </div>

        <div className={styles.meta}>
          <span>Жанр: {story.genre}</span>
          <span>Создано: {new Date(story.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default StoryResultPage; 