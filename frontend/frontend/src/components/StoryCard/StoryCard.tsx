import React from 'react';
import { AudioPlayer } from '../AudioPlayer/AudioPlayer';
import styles from './StoryCard.module.css';

interface StoryCardProps {
  title: string;
  text: string;
  audioUrl?: string;
  createdAt: string;
  author: string;
}

const StoryCard: React.FC<StoryCardProps> = ({
  title,
  text,
  audioUrl,
  createdAt,
  author
}) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.text}>{text}</p>
      {audioUrl && <AudioPlayer src={audioUrl} />}
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