import React, { useState } from 'react';
import { useApi } from '../../hooks/useApi';
import styles from './StoryForm.module.css';

interface StoryFormProps {
  onSubmit: (story: string) => void;
}

const StoryForm: React.FC<StoryFormProps> = ({ onSubmit }) => {
  const [text, setText] = useState('');
  const { loading, error } = useApi();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text);
      setText('');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea
        className={styles.textarea}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Введите вашу историю..."
        rows={5}
      />
      {error && <div className={styles.error}>{error}</div>}
      <button type="submit" className={styles.button} disabled={loading}>
        {loading ? 'Отправка...' : 'Отправить'}
      </button>
    </form>
  );
};

export default StoryForm; 