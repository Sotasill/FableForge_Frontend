import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../services/api/axios';
import styles from './StoryGenerator.module.css';

interface StoryGeneratorProps {
  onGenerating?: (isGenerating: boolean) => void;
}

const StoryGenerator: React.FC<StoryGeneratorProps> = ({ onGenerating }) => {
  const [prompt, setPrompt] = useState('');
  const [genre, setGenre] = useState('fantasy');
  const [length, setLength] = useState('medium');
  const [generating, setGenerating] = useState(false);
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setGenerating(true);
    onGenerating?.(true);

    try {
      // Временная имитация запроса к API
      // const response = await axiosInstance.post('/api/stories/generate', {
      //   prompt,
      //   genre,
      //   length
      // });
      
      // Имитация задержки
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const storyId = Date.now().toString();
      navigate(`/result/${storyId}`);
    } catch (error) {
      console.error('Failed to generate story:', error);
    } finally {
      setGenerating(false);
      onGenerating?.(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.options}>
        <div className={styles.option}>
          <label>Жанр:</label>
          <select 
            value={genre} 
            onChange={(e) => setGenre(e.target.value)}
            className={styles.select}
          >
            <option value="fantasy">Фэнтези</option>
            <option value="scifi">Научная фантастика</option>
            <option value="adventure">Приключения</option>
            <option value="mystery">Детектив</option>
            <option value="fairytale">Сказка</option>
          </select>
        </div>
        <div className={styles.option}>
          <label>Длина:</label>
          <select 
            value={length} 
            onChange={(e) => setLength(e.target.value)}
            className={styles.select}
          >
            <option value="short">Короткая</option>
            <option value="medium">Средняя</option>
            <option value="long">Длинная</option>
          </select>
        </div>
      </div>

      <textarea
        className={styles.prompt}
        placeholder="Опишите вашу идею для истории..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={5}
      />

      <div className={styles.suggestions}>
        <p>Примеры подсказок:</p>
        <ul>
          <li>"История о драконе, который боится летать"</li>
          <li>"Детектив в космическом городе будущего"</li>
          <li>"Приключения говорящего кота в средневековом замке"</li>
        </ul>
      </div>

      <button
        className={styles.generateButton}
        onClick={handleGenerate}
        disabled={generating || !prompt.trim()}
      >
        {generating ? 'Генерация...' : 'Создать историю'}
      </button>
    </div>
  );
};

export default StoryGenerator; 