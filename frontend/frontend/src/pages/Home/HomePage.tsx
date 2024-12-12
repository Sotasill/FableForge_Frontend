import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../store/AuthContext';
import StoryGenerator from '../../components/StoryGenerator/StoryGenerator';
import styles from './HomePage.module.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { auth } = useAuthContext();
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

      {auth.isAuthenticated ? (
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
      ) : (
        <div className={styles.authPrompt}>
          <h2>Начните создавать истории прямо сейчас!</h2>
          <div className={styles.authDescription}>
            <p>FableForge позволяет:</p>
            <ul>
              <li>Создавать уникальные истории с помощью ИИ</li>
              <li>Генерировать красочные иллюстрации</li>
              <li>Получать профессиональную озвучку</li>
              <li>Делиться историями с другими</li>
            </ul>
          </div>
          <div className={styles.authButtons}>
            <button onClick={() => navigate('/login')} className={styles.button}>
              Войти
            </button>
            <button onClick={() => navigate('/signup')} className={`${styles.button} ${styles.primaryButton}`}>
              Начать бесплатно
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
