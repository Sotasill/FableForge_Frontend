import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AudioPlayer } from '../../components/AudioPlayer/AudioPlayer';
import styles from './StoryResultPage.module.css';

interface GeneratedStory {
  id: string;
  title: string;
  text: string;
  imageUrl: string;
  audioUrl: string;
  genre: string;
  createdAt: string;
  status: 'generating' | 'completed' | 'failed';
}

const StoryResultPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [story, setStory] = useState<GeneratedStory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [regenerating, setRegenerating] = useState(false);

  useEffect(() => {
    loadStory();
  }, [id]);

  const loadStory = async () => {
    try {
      setLoading(true);
      // Имитация загрузки с сервера
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setStory({
        id: id || '1',
        title: 'Приключения в волшебном лесу',
        text: `В глубине древнего леса, где деревья шептались друг с другом на забытом языке природы, жила маленькая фея по имени Лилия. Она была необычной феей – её крылья переливались всеми цветами радуги, а волосы светились в темноте мягким серебристым светом.

Однажды утром Лилия обнаружила, что все цветы в лесу перестали цвести. Это было странно, ведь сейчас был разгар весны. Она решила разгадать эту загадку и отправилась в путешествие по лесу.

По пути она встретила мудрую сову, которая рассказала ей о древнем кристалле, хранящем силу цветения. Кристалл был похищен злым троллем, который хотел использовать его силу для своих темных целей.

Лилия не испугалась и решила найти тролля. После долгих поисков она обнаружила его пещеру, спрятанную за водопадом. Используя свою волшебную пыльцу, она усыпила тролля и вернула кристалл на его законное место.

Как только кристалл оказался на своем месте, лес вновь ожил – цветы распустились, наполняя воздух сладким ароматом, а деревья зашелестели листвой, благодаря маленькую фею за её храбрость.

С тех пор Лилию стали называть Хранительницей Цветов, и каждую весну лесные жители устраивали праздник в её честь, украшая деревья разноцветными фонариками, которые напоминали её волшебные крылья.`,
        imageUrl: 'https://picsum.photos/800/400',
        audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        genre: 'fantasy',
        createdAt: new Date().toISOString(),
        status: 'completed'
      });
      setLoading(false);
    } catch (err) {
      setError('Не удалось загрузить историю');
      setLoading(false);
    }
  };

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