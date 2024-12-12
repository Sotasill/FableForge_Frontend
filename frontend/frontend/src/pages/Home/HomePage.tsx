import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../store/AuthContext';
import StoryForm from '../../components/StoryForm/StoryForm';
import StoryCard from '../../components/StoryCard/StoryCard';
import { axiosInstance } from '../../services/api/axios';
import { useApi } from '../../hooks/useApi';
import styles from './HomePage.module.css';

interface Story {
  id: string;
  title: string;
  text: string;
  audioUrl: string;
  createdAt: string;
  author: string;
}

const MOCK_STORIES: Story[] = [
  {
    id: '1',
    title: 'Первая история',
    text: 'Текст первой истории...',
    audioUrl: '',
    createdAt: new Date().toISOString(),
    author: 'Автор 1'
  },
  {
    id: '2',
    title: 'Вторая история',
    text: 'Текст второй истории...',
    audioUrl: '',
    createdAt: new Date().toISOString(),
    author: 'Автор 2'
  }
];

const HomePage: React.FC = () => {
  const [stories, setStories] = useState<Story[]>(MOCK_STORIES);
  const { auth } = useAuthContext();
  const { loading, error } = useApi<Story>();

  useEffect(() => {
    loadStories();
  }, []);

  const loadStories = async () => {
    try {
      // Временно закомментируем реальный API-запрос
      // const response = await axiosInstance.get('/stories');
      // if (response.data) {
      //   setStories(response.data);
      // }
      setStories(MOCK_STORIES);
    } catch (err) {
      console.error('Failed to load stories:', err);
    }
  };

  const handleSubmitStory = async (text: string) => {
    try {
      // Временная имитация создания истории
      const newStory: Story = {
        id: Date.now().toString(),
        title: 'Новая история',
        text,
        audioUrl: '',
        createdAt: new Date().toISOString(),
        author: 'Текущий пользователь'
      };
      setStories(prev => [newStory, ...prev]);
    } catch (err) {
      console.error('Failed to create story:', err);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>FableForge</h1>
      {auth.isAuthenticated && (
        <StoryForm onSubmit={handleSubmitStory} />
      )}
      {error && <div className={styles.error}>{error}</div>}
      {loading ? (
        <div className={styles.loading}>Загрузка историй...</div>
      ) : (
        <div className={styles.stories}>
          {stories.map(story => (
            <StoryCard
              key={story.id}
              title={story.title}
              text={story.text}
              audioUrl={story.audioUrl}
              createdAt={story.createdAt}
              author={story.author}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
