import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../hooks/useTheme';
import styles from './SettingsPage.module.css';

interface Settings {
  language: string;
  theme: 'light' | 'dark' | 'system';
  fontSize: 'small' | 'medium' | 'large';
  notifications: boolean;
  autoplay: boolean;
}

const SettingsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();
  
  const [settings, setSettings] = useState<Settings>({
    language: i18n.language,
    theme: theme as 'light' | 'dark' | 'system',
    fontSize: 'medium',
    notifications: true,
    autoplay: false
  });

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    setSettings(prev => ({ ...prev, language: lang }));
  };

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    setSettings(prev => ({ ...prev, theme: newTheme }));
  };

  const handleSettingChange = <K extends keyof Settings>(
    key: K,
    value: Settings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Настройки</h1>

      <div className={styles.section}>
        <h2>Основные</h2>
        
        <div className={styles.setting}>
          <label>Язык интерфейса</label>
          <select
            value={settings.language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className={styles.select}
          >
            <option value="ru">Русский</option>
            <option value="en">English</option>
            <option value="zh">中文</option>
          </select>
        </div>

        <div className={styles.setting}>
          <label>Тема оформления</label>
          <select
            value={settings.theme}
            onChange={(e) => handleThemeChange(e.target.value as 'light' | 'dark' | 'system')}
            className={styles.select}
          >
            <option value="light">Светлая</option>
            <option value="dark">Темная</option>
            <option value="system">Системная</option>
          </select>
        </div>

        <div className={styles.setting}>
          <label>Размер шрифта</label>
          <select
            value={settings.fontSize}
            onChange={(e) => handleSettingChange('fontSize', e.target.value as 'small' | 'medium' | 'large')}
            className={styles.select}
          >
            <option value="small">Маленький</option>
            <option value="medium">Средний</option>
            <option value="large">Большой</option>
          </select>
        </div>
      </div>

      <div className={styles.section}>
        <h2>Уведомления</h2>
        
        <div className={styles.setting}>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={(e) => handleSettingChange('notifications', e.target.checked)}
            />
            <span>Включить уведомления</span>
          </label>
          <p className={styles.description}>
            Получать уведомления о новых функциях и обновлениях
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h2>Медиа</h2>
        
        <div className={styles.setting}>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={settings.autoplay}
              onChange={(e) => handleSettingChange('autoplay', e.target.checked)}
            />
            <span>Автовоспроизведение аудио</span>
          </label>
          <p className={styles.description}>
            Автоматически воспроизводить аудиоверсию истории
          </p>
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.button}>
          Сохранить изменения
        </button>
        <button className={`${styles.button} ${styles.secondary}`}>
          Сбросить настройки
        </button>
      </div>
    </div>
  );
};

export default SettingsPage; 