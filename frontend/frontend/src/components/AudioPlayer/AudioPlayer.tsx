import React, { useState, useRef } from 'react';
import styles from './AudioPlayer.module.css';

interface AudioPlayerProps {
  src: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const bounds = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const width = bounds.width;
      const percentage = x / width;
      audioRef.current.currentTime = audioRef.current.duration * percentage;
    }
  };

  return (
    <div className={styles.player}>
      <button
        className={`${styles.playButton} ${isPlaying ? styles.playing : ''}`}
        onClick={togglePlay}
      >
        {isPlaying ? '❚❚' : '▶'}
      </button>
      <div className={styles.progressBar} onClick={handleProgressClick}>
        <div
          className={styles.progress}
          style={{ width: `${progress}%` }}
        />
      </div>
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
}; 