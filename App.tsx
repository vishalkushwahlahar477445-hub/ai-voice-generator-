import React, { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleGenAI, Modality } from "@google/genai";
import { Header } from './components/Header';
import { VoiceGeneratorForm } from './components/VoiceGeneratorForm';
import { AudioPlayer } from './components/AudioPlayer';
import { generateSpeech } from './services/geminiService';
import { createAudioUrlFromBase64 } from './utils/audioUtils';
import { VoiceOption, Language, Emotion } from './types';
import { VOICES_BY_LANGUAGE, LANGUAGES, PLACEHOLDER_TEXTS, EMOTIONS, EMOTION_PROMPTS } from './constants';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('English');
  const [text, setText] = useState<string>(PLACEHOLDER_TEXTS.English);
  const [voiceOptions, setVoiceOptions] = useState<VoiceOption[]>(VOICES_BY_LANGUAGE[selectedLanguage]);
  const [selectedVoice, setSelectedVoice] = useState<VoiceOption>(voiceOptions[0]);
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion>('Default');
  const [speed, setSpeed] = useState<number>(1);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setText(PLACEHOLDER_TEXTS[selectedLanguage]);
    const newVoiceOptions = VOICES_BY_LANGUAGE[selectedLanguage] || VOICES_BY_LANGUAGE['English'];
    setVoiceOptions(newVoiceOptions);
    setSelectedVoice(newVoiceOptions[0]);
  }, [selectedLanguage]);

  const handleGenerateSpeech = useCallback(async () => {
    if (!text.trim()) {
      setError('Please enter some text to generate audio.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setAudioUrl(null);

    try {
      const promptPrefix = EMOTION_PROMPTS[selectedEmotion];
      const finalText = promptPrefix ? `${promptPrefix}${text}` : text;

      const base64Audio = await generateSpeech(finalText, selectedVoice.id);
      if (base64Audio) {
        const url = createAudioUrlFromBase64(base64Audio);
        setAudioUrl(url);
      } else {
        throw new Error('API returned empty audio data.');
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [text, selectedVoice, selectedEmotion]);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 flex flex-col selection:bg-blue-500/20">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 flex items-center justify-center">
        <div className="w-full max-w-2xl">
          <VoiceGeneratorForm
            text={text}
            setText={setText}
            voiceOptions={voiceOptions}
            selectedVoice={selectedVoice}
            setSelectedVoice={setSelectedVoice}
            speed={speed}
            setSpeed={setSpeed}
            isLoading={isLoading}
            onSubmit={handleGenerateSpeech}
            audioRef={audioRef}
            languages={LANGUAGES}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
            placeholder={PLACEHOLDER_TEXTS[selectedLanguage]}
            emotions={EMOTIONS}
            selectedEmotion={selectedEmotion}
            setSelectedEmotion={setSelectedEmotion}
          />
          {error && (
            <div className="mt-4 bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-lg relative" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <AudioPlayer 
            audioUrl={audioUrl}
            isLoading={isLoading}
            audioRef={audioRef}
            speed={speed}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;