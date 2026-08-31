export type StudioToolId =
  | 'agent'
  | 'script'
  | 'video'
  | 'editor'
  | 'image'
  | 'voiceover'
  | 'captions'
  | 'dubbing'
  | 'music'
  | 'reels'
  | 'ad-creative'
  | 'social'
  | 'brand-kit'
  | 'templates';

export interface StudioToolMeta {
  id: StudioToolId;
  name: string;
  tagline: string;
  description: string;
  category: 'Core AI' | 'Video & Motion' | 'Image & Visuals' | 'Audio & Voice' | 'Marketing & Social';
  icon: string;
  href: string;
  badge?: string;
  creditCost: number;
  featured?: boolean;
}

export type AspectRatio = '9:16' | '16:9' | '1:1' | '4:5' | '3:2' | '2:3';

export type VideoStyle =
  | 'Cinematic Realism'
  | 'Hyperrealistic 8K'
  | 'Cyberpunk Neon'
  | 'Anime & Manga'
  | '3D Pixar Animation'
  | 'Minimalist Commercial'
  | 'Vintage Film Grain';

export type CameraMovement =
  | 'Static Framing'
  | 'Slow Push-in Dolly'
  | 'Dynamic Orbit 360'
  | 'Aerial Drone Crane'
  | 'FPV Speed Rush'
  | 'Handheld Cinematic';

export interface VideoGenerationParams {
  prompt: string;
  durationSeconds: number;
  aspectRatio: AspectRatio;
  style: VideoStyle;
  cameraMovement: CameraMovement;
  preset?: string;
  quality: 'Standard 1080p' | 'Ultra 4K';
  seed?: number;
  brandKitId?: string;
}

export interface VideoEditorTrackItem {
  id: string;
  trackId: string;
  type: 'video' | 'audio' | 'voiceover' | 'text' | 'sticker' | 'caption';
  title: string;
  startSec: number;
  durationSec: number;
  sourceUrl?: string;
  content?: string;
  style?: Record<string, string | number>;
  volume?: number;
  speed?: number;
  filters?: string;
}

export interface VideoEditorTrack {
  id: string;
  name: string;
  type: 'video' | 'audio' | 'voiceover' | 'text' | 'sticker' | 'caption';
  isMuted?: boolean;
  isLocked?: boolean;
  items: VideoEditorTrackItem[];
}

export interface VoiceOption {
  id: string;
  name: string;
  gender: 'Male' | 'Female' | 'Neutral';
  language: string;
  languageCode: string;
  accent: string;
  previewAudioUrl: string;
  styleTags: string[];
}

export interface DubbingTask {
  id: string;
  sourceLanguage: string;
  targetLanguage: string;
  originalVideoUrl: string;
  dubbedVideoUrl?: string;
  status: 'QUEUED' | 'TRANSCRIBING' | 'TRANSLATING' | 'SYNTHESIZING' | 'COMPLETED' | 'FAILED';
  progress: number;
  originalTranscript?: string;
  translatedTranscript?: string;
}

export interface CreativeAgentStep {
  key:
    | 'IDEA'
    | 'STRATEGY'
    | 'SCRIPT'
    | 'SCENES'
    | 'VISUALS'
    | 'VIDEO'
    | 'VOICEOVER'
    | 'CAPTIONS'
    | 'THUMBNAIL'
    | 'SOCIAL_CAPTION'
    | 'FINAL_EXPORT';
  title: string;
  description: string;
  status: 'WAITING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'SKIPPED';
  output?: Record<string, any> | string;
  error?: string;
}

export interface AdCreativeOption {
  hook: string;
  headline: string;
  primaryText: string;
  cta: string;
  videoStoryboard: { scene: number; visual: string; audio: string }[];
  displayVariationUrl?: string;
}

export interface SocialPostVariation {
  platform: 'Instagram' | 'YouTube' | 'TikTok' | 'LinkedIn' | 'Twitter' | 'Facebook';
  caption: string;
  hashtags: string[];
  cta: string;
  idealPostTime: string;
  formatSuggestion: string;
}
