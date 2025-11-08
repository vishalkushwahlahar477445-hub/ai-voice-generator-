
function decode(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

function writeString(view: DataView, offset: number, str: string): void {
  for (let i = 0; i < str.length; i++) {
    view.setUint8(offset + i, str.charCodeAt(i));
  }
}

function pcmToWavBlob(pcmData: Int16Array, sampleRate: number, numChannels: number): Blob {
  const header = new ArrayBuffer(44);
  const view = new DataView(header);
  const dataSize = pcmData.length * 2;

  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true);
  writeString(view, 8, 'WAVE');
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * numChannels * 2, true);
  view.setUint16(32, numChannels * 2, true);
  view.setUint16(34, 16, true);
  writeString(view, 36, 'data');
  view.setUint32(40, dataSize, true);

  const wavBytes = new Uint8Array(44 + dataSize);
  wavBytes.set(new Uint8Array(header), 0);
  wavBytes.set(new Uint8Array(pcmData.buffer), 44);

  return new Blob([wavBytes], { type: 'audio/wav' });
}

export const createAudioUrlFromBase64 = (base64Audio: string): string => {
  const pcmBytes = decode(base64Audio);
  const pcmDataInt16 = new Int16Array(pcmBytes.buffer);
  
  // Gemini TTS model 'gemini-2.5-flash-preview-tts' outputs audio at a 24000 sample rate with 1 channel.
  const sampleRate = 24000;
  const numChannels = 1;

  const wavBlob = pcmToWavBlob(pcmDataInt16, sampleRate, numChannels);
  return URL.createObjectURL(wavBlob);
};
