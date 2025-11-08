import React, { useEffect } from 'react';
import { Loader } from './ui/Loader';
import { DownloadIcon } from './icons/DownloadIcon';

interface AudioPlayerProps {
  audioUrl: string | null;
  isLoading: boolean;
  audioRef: React.RefObject<HTMLAudioElement>;
  speed: number;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl, isLoading, audioRef, speed }) => {

  useEffect(() => {
    if (audioRef.current && audioUrl) {
      audioRef.current.playbackRate = speed;
    }
  }, [audioUrl, speed, audioRef]);

  if (isLoading) {
    return (
      <div className="mt-6 bg-white/60 dark:bg-slate-800/60 rounded-xl shadow-lg backdrop-blur-2xl border border-white/30 dark:border-slate-700/50 p-6 flex flex-col items-center justify-center h-28">
        <Loader />
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Generating audio, please wait...</p>
      </div>
    );
  }

  if (!audioUrl) {
    return null;
  }

  return (
    <div className="mt-6 bg-white/60 dark:bg-slate-800/60 rounded-xl shadow-lg backdrop-blur-2xl border border-white/30 dark:border-slate-700/50 p-6 animate-fade-in">
      <div className="flex items-center space-x-4">
        <audio ref={audioRef} controls src={audioUrl} className="w-full dark:filter dark:invert" autoPlay>
          Your browser does not support the audio element.
        </audio>
        <a
          href={audioUrl}
          download="ai-generated-voice.wav"
          className="flex-shrink-0 inline-flex items-center justify-center p-3 border border-transparent rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
          aria-label="Download audio"
        >
          <DownloadIcon className="h-6 w-6" />
        </a>
      </div>
    </div>
  );
};