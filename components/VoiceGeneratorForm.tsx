import React, { useEffect } from 'react';
import { Language, VoiceOption, Emotion } from '../types';
import { Select, Option } from './ui/Select';
import { Slider } from './ui/Slider';
import { Button } from './ui/Button';
import { ArrowPathIcon } from './icons/ArrowPathIcon';
import { SearchableSelect } from './ui/SearchableSelect';

interface VoiceGeneratorFormProps {
  text: string;
  setText: (text: string) => void;
  voiceOptions: VoiceOption[];
  selectedVoice: VoiceOption;
  setSelectedVoice: (voice: VoiceOption) => void;
  speed: number;
  setSpeed: (speed: number) => void;
  isLoading: boolean;
  onSubmit: () => void;
  audioRef: React.RefObject<HTMLAudioElement>;
  languages: Language[];
  selectedLanguage: Language;
  setSelectedLanguage: (language: Language) => void;
  placeholder: string;
  emotions: Emotion[];
  selectedEmotion: Emotion;
  setSelectedEmotion: (emotion: Emotion) => void;
}

export const VoiceGeneratorForm: React.FC<VoiceGeneratorFormProps> = ({
  text,
  setText,
  voiceOptions,
  selectedVoice,
  setSelectedVoice,
  speed,
  setSpeed,
  isLoading,
  onSubmit,
  audioRef,
  languages,
  selectedLanguage,
  setSelectedLanguage,
  placeholder,
  emotions,
  selectedEmotion,
  setSelectedEmotion,
}) => {
  const characterCount = text.length;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  }, [speed, audioRef]);

  const languageOptions = languages.map(lang => ({ value: lang, label: lang }));
  const voiceSelectOptions = voiceOptions.map(voice => ({ value: voice.name, label: voice.name }));

  return (
    <div className="bg-white/60 dark:bg-slate-800/60 rounded-xl shadow-2xl shadow-slate-900/10 backdrop-blur-2xl border border-white/30 dark:border-slate-700/50 p-6 md:p-8 space-y-6">
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder}
          className="w-full h-48 p-4 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-100/50 dark:bg-slate-900/50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 resize-none text-base"
          maxLength={1000}
        />
        <div className="absolute bottom-3 right-3 text-xs text-slate-400 dark:text-slate-500">
          {characterCount} / 1000
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="language-select" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Language
          </label>
          <SearchableSelect
            id="language-select"
            value={selectedLanguage}
            onChange={(value) => setSelectedLanguage(value as Language)}
            options={languageOptions}
          />
        </div>
        <div>
          <label htmlFor="voice-select" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Voice
          </label>
          <SearchableSelect
            id="voice-select"
            value={selectedVoice.name}
            onChange={(value) => {
              const voice = voiceOptions.find(v => v.name === value);
              if (voice) setSelectedVoice(voice);
            }}
            options={voiceSelectOptions}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div>
          <label htmlFor="emotion-select" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Emotion
          </label>
          <Select
            id="emotion-select"
            value={selectedEmotion}
            onChange={(e) => setSelectedEmotion(e.target.value as Emotion)}
          >
            {emotions.map((emo) => (
              <Option key={emo} value={emo}>
                {emo}
              </Option>
            ))}
          </Select>
        </div>
        <div>
          <label htmlFor="speed-slider" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Speed ({speed.toFixed(2)}x)
          </label>
          <Slider
            id="speed-slider"
            min={0.5}
            max={2}
            step={0.05}
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
          />
        </div>
      </div>
      
      <Button onClick={onSubmit} disabled={isLoading || !text.trim()} className="w-full !py-3">
        {isLoading ? (
          <>
            <ArrowPathIcon className="animate-spin -ml-1 mr-3 h-5 w-5" />
            Generating...
          </>
        ) : (
          'Generate Audio'
        )}
      </Button>
    </div>
  );
};