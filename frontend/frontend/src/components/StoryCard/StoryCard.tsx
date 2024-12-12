import React from 'react';
import { AudioPlayer } from '../AudioPlayer/AudioPlayer';
import styles from './StoryCard.module.css';

interface StoryCardProps {
  title: string;
  text: string;
  imageUrl?: string;
  audioUrl?: string;
  createdAt: string;
  author: string;
}

const StoryCard: React.FC<StoryCardProps> = ({
  title,
  text,
  imageUrl,
  audioUrl,
  createdAt,
  author
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <p className={styles.text}>{text}</p>
        {imageUrl && (
          <div className={styles.image}>
            <img src={imageUrl} alt={title} />
          </div>
        )}
      </div>
      {audioUrl && (
        <div className={styles.audio}>
          <AudioPlayer src={audioUrl} />
        </div>
      )}
      <div className={styles.footer}>
        <span className={styles.author}>{author}</span>
        <span className={styles.date}>
          {new Date(createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default StoryCard; 