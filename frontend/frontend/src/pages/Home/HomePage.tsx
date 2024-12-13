import React, { useState } from 'react';
import StoryGenerator from '../../components/StoryGenerator/StoryGenerator';
import ApiTester from '../../components/ApiTester/ApiTester';
import styles from './HomePage.module.css';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const [generating, setGenerating] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.title}>FableForge</h1>
        <p className={styles.subtitle}>Создавайте уникальные истории с помощью ИИ</p>
      </div>

      <div className={styles.features}>
        <div className={styles.feature}>
          <div className={styles.featureIcon}>📝</div>
          <h3>Генерация историй</h3>
          <p>Создавайте уникальные истории на основе ваших идей</p>
        </div>
        <div className={styles.feature}>
          <div className={styles.featureIcon}>🎨</div>
          <h3>Иллюстрации</h3>
          <p>Автоматическая генерация изображений для ваших историй</p>
        </div>
        <div className={styles.feature}>
          <div className={styles.featureIcon}>🎧</div>
          <h3>Озвучка</h3>
          <p>Преобразование текста в реалистичную речь</p>
        </div>
      </div>

      <div className={styles.generateSection}>
        <h2>Создать новую историю</h2>
        <StoryGenerator 
          onGenerating={(isGenerating) => setGenerating(isGenerating)}
        />
        {generating && (
          <div className={styles.generating}>
            <div className={styles.spinner}></div>
            <p>Генерируем вашу историю...</p>
          </div>
        )}
      </div>

      <div className={styles.testSection}>
        <ApiTester />
      </div>

      <Link to="/test">
        <button>Перейти к тестированию возможностей приложения</button>
      </Link>

      <Link to="/image-test">
        <button>Перейти к тестированию генерации изображений</button>
      </Link>
    </div>
  );
};

export default HomePage;
