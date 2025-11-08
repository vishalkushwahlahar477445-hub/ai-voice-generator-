
export type Language = 'English' | 'Hindi' | 'Bengali' | 'Tamil' | 'Telugu' | 'Marathi' | 'Gujarati' | 'Kannada' | 'Malayalam' | 'Odia' | 'Punjabi' | 'Urdu' | 'Assamese' | 'Maithili' | 'Santali' | 'Kashmiri' | 'Nepali' | 'Sindhi' | 'Konkani' | 'Dogri' | 'Manipuri' | 'Bodo' | 'Sanskrit' | 'Chhattisgarhi' | 'Haryanvi' | 'Rajasthani';

export type Emotion = 'Default' | 'Happy' | 'Sad' | 'Angry' | 'Excited' | 'Calm';

export interface VoiceOption {
  id: string;
  name: string;
  gender: 'Male' | 'Female';
}
