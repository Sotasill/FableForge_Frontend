import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StoryForm from '../../components/StoryForm/StoryForm';
import styles from './GenerateStoryPage.module.css';

const GenerateStoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [generating, setGenerating] = useState(false);

  const handleSubmit = async (text: string, image?: File) => {
    setGenerating(true);
    try {
      // Здесь будет логика генерации истории
      const storyId = '123'; // Временный ID
      navigate(`/result/${storyId}`);
    } catch (error) {
      console.error('Failed to generate story:', error);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Создать новую историю</h1>
      <StoryForm onSubmit={handleSubmit} />
      {generating && (
        <div className={styles.generating}>
          Генерируем вашу историю...
        </div>
      )}
    </div>
  );
};

export default GenerateStoryPage; 