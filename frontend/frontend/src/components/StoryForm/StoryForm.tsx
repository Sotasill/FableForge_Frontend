import React, { useState } from 'react';
import styles from './StoryForm.module.css';

interface StoryFormProps {
  onSubmit: (text: string, image?: File) => void;
}

const StoryForm: React.FC<StoryFormProps> = ({ onSubmit }) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text, image || undefined);
      setText('');
      setImage(null);
      setPreview('');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea
        className={styles.textarea}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Напишите свою историю..."
        rows={5}
      />
      <div className={styles.imageInput}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className={styles.fileInput}
        />
        {preview && (
          <div className={styles.preview}>
            <img src={preview} alt="Preview" />
          </div>
        )}
      </div>
      <button type="submit" className={styles.button}>
        Создать историю
      </button>
    </form>
  );
};

export default StoryForm; 