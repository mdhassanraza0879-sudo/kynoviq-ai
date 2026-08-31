import {
  VideoGenerationParams,
  VoiceOption,
  DubbingTask,
  AdCreativeOption,
  SocialPostVariation,
} from '@/types/studio';

export interface ScriptGenerationOutput {
  title: string;
  hook: string;
  introduction: string;
  fullScript: string;
  sceneBreakdown: {
    sceneNumber: number;
    visualDescription: string;
    bRollSuggestions: string[];
    voiceoverText: string;
    durationEstimateSec: number;
    transitionType: string;
  }[];
  callToAction: string;
  videoDescription: string;
  socialVersions: {
    shortHook: string;
    caption: string;
    hashtags: string[];
  };
}

export interface ImageGenerationOutput {
  imageUrl: string;
  prompt: string;
  style: string;
  aspectRatio: string;
  width: number;
  height: number;
  seed: number;
}

export interface VideoGenerationOutput {
  jobId: string;
  videoUrl: string;
  thumbnailUrl: string;
  durationSec: number;
  aspectRatio: string;
  status: 'QUEUED' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
}

export interface VoiceoverOutput {
  audioUrl: string;
  durationSec: number;
  language: string;
  voiceId: string;
  wordCount: number;
  waveformFrequencies: number[];
}

export interface SubtitleItem {
  id: string;
  startMs: number;
  endMs: number;
  text: string;
  confidence?: number;
}

export interface SubtitleOutput {
  fullText: string;
  language: string;
  subtitles: SubtitleItem[];
  srtContent: string;
  vttContent: string;
}

export interface MusicSuggestionItem {
  id: string;
  title: string;
  artist: string;
  mood: 'Cinematic' | 'Energetic' | 'Calm' | 'Corporate' | 'Emotional' | 'Futuristic';
  genre: string;
  bpm: number;
  key: string;
  durationSec: number;
  previewUrl: string;
  licensingNotice: string;
  recommendedUse: string;
}

export interface CreativeAgentWorkflowPlan {
  campaignId: string;
  goal: string;
  targetAudience: string;
  brandTone: string;
  strategySummary: string;
  estimatedCredits: number;
  estimatedDurationSec: number;
  script: ScriptGenerationOutput;
  suggestedVisualPrompts: string[];
  voiceoverConfig: {
    voiceId: string;
    language: string;
    speed: number;
  };
  socialVariants: SocialPostVariation[];
  adCreative: AdCreativeOption;
}

// -------------------------------------------------------------
// Core Provider Interfaces
// -------------------------------------------------------------

export interface ITextProvider {
  generateScript(prompt: string, brandContext?: Record<string, any>): Promise<ScriptGenerationOutput>;
  generateAdCreative(params: {
    product: string;
    targetAudience: string;
    platform: string;
    goal: string;
    brandContext?: Record<string, any>;
  }): Promise<AdCreativeOption[]>;
  generateSocialContent(prompt: string, platforms: string[]): Promise<SocialPostVariation[]>;
  planCreativeWorkflow(prompt: string, brandContext?: Record<string, any>): Promise<CreativeAgentWorkflowPlan>;
}

export interface IImageProvider {
  generateImage(params: {
    prompt: string;
    style?: string;
    aspectRatio?: string;
    negativePrompt?: string;
  }): Promise<ImageGenerationOutput>;
  editImage(params: {
    sourceImageUrl: string;
    instruction: string;
    mode: 'remove_background' | 'erase_object' | 'upscale' | 'expand';
  }): Promise<ImageGenerationOutput>;
}

export interface IVideoProvider {
  generateVideo(params: VideoGenerationParams): Promise<VideoGenerationOutput>;
  checkStatus(jobId: string): Promise<VideoGenerationOutput>;
}

export interface IAudioProvider {
  generateVoiceover(params: {
    text: string;
    voiceId: string;
    languageCode?: string;
    speed?: number;
    pitch?: number;
  }): Promise<VoiceoverOutput>;
  suggestMusic(params: {
    mood?: string;
    videoType?: string;
    durationSec?: number;
  }): Promise<MusicSuggestionItem[]>;
}

export interface ITranscriptionProvider {
  transcribe(audioOrVideoUrl: string): Promise<SubtitleOutput>;
  generateCaptions(params: {
    text: string;
    style: 'clean' | 'bold' | 'minimal' | 'social' | 'highlight';
  }): Promise<SubtitleOutput>;
}

export interface IDubbingProvider {
  startDubbing(params: {
    videoUrl: string;
    sourceLanguage: string;
    targetLanguage: string;
    targetVoiceGender?: 'Male' | 'Female';
  }): Promise<DubbingTask>;
  getDubbingStatus(taskId: string): Promise<DubbingTask>;
}
