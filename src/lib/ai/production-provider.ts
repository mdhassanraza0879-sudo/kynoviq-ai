import {
  ITextProvider,
  IImageProvider,
  IVideoProvider,
  IAudioProvider,
  ITranscriptionProvider,
  IDubbingProvider,
  ScriptGenerationOutput,
  ImageGenerationOutput,
  VideoGenerationOutput,
  VoiceoverOutput,
  SubtitleOutput,
  MusicSuggestionItem,
  CreativeAgentWorkflowPlan,
} from './interfaces';
import { VideoGenerationParams, DubbingTask, AdCreativeOption, SocialPostVariation } from '@/types/studio';
import { MockAIProvider } from './mock-provider';
import OpenAI from 'openai';

export class ProductionAIProvider
  implements
    ITextProvider,
    IImageProvider,
    IVideoProvider,
    IAudioProvider,
    ITranscriptionProvider,
    IDubbingProvider
{
  private openai: OpenAI | null = null;
  private fallback: MockAIProvider;

  constructor() {
    this.fallback = new MockAIProvider();
    if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.startsWith('sk-')) {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
    }
  }

  async generateScript(prompt: string, brandContext?: Record<string, any>): Promise<ScriptGenerationOutput> {
    if (!this.openai) {
      return this.fallback.generateScript(prompt, brandContext);
    }

    try {
      const response = await this.openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are Kynoviq AI AI Script Engine. Return valid JSON only with keys: title, hook, introduction, fullScript, sceneBreakdown (array of {sceneNumber, visualDescription, bRollSuggestions, voiceoverText, durationEstimateSec, transitionType}), callToAction, videoDescription, socialVersions ({shortHook, caption, hashtags}).`,
          },
          {
            role: 'user',
            content: `Generate a production video script for idea: "${prompt}". Brand context: ${JSON.stringify(brandContext || {})}`,
          },
        ],
        response_format: { type: 'json_object' },
      });

      const parsed = JSON.parse(response.choices[0].message.content || '{}');
      return {
        title: parsed.title || `Mastering ${prompt.slice(0, 30)}`,
        hook: parsed.hook || `Discover the secret to ${prompt.slice(0, 25)} in 30 seconds.`,
        introduction: parsed.introduction || `Welcome back. Today we explore ${prompt}.`,
        fullScript: parsed.fullScript || `[SCENE 1]\nHost: "Here is everything you need to know about ${prompt}."`,
        sceneBreakdown: parsed.sceneBreakdown || [],
        callToAction: parsed.callToAction || 'Follow Kynoviq AI for more.',
        videoDescription: parsed.videoDescription || prompt,
        socialVersions: parsed.socialVersions || {
          shortHook: prompt,
          caption: prompt,
          hashtags: ['#KynoviqStudio'],
        },
      };
    } catch (e) {
      console.warn('Production AI script call failed, falling back to mock engine', e);
      return this.fallback.generateScript(prompt, brandContext);
    }
  }

  async generateAdCreative(params: {
    product: string;
    targetAudience: string;
    platform: string;
    goal: string;
    brandContext?: Record<string, any>;
  }): Promise<AdCreativeOption[]> {
    if (!this.openai) {
      return this.fallback.generateAdCreative(params);
    }

    try {
      const response = await this.openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are Kynoviq AI Ad Creative Engine. Return valid JSON array of 2 ad variations with keys: hook, headline, primaryText, cta, videoStoryboard (array of {scene, visual, audio}).`,
          },
          {
            role: 'user',
            content: `Create ads for: ${JSON.stringify(params)}`,
          },
        ],
        response_format: { type: 'json_object' },
      });

      const parsed = JSON.parse(response.choices[0].message.content || '{}');
      const ads = parsed.variations || parsed.ads || [parsed];
      return ads.length > 0 ? ads : this.fallback.generateAdCreative(params);
    } catch (e) {
      return this.fallback.generateAdCreative(params);
    }
  }

  async generateSocialContent(prompt: string, platforms: string[]): Promise<SocialPostVariation[]> {
    if (!this.openai) {
      return this.fallback.generateSocialContent(prompt, platforms);
    }

    try {
      const response = await this.openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are Kynoviq AI Social Engine. Return valid JSON array of variations with keys: platform, caption, hashtags (array), cta, idealPostTime, formatSuggestion.`,
          },
          {
            role: 'user',
            content: `Generate social variations for prompt: "${prompt}" on platforms: ${platforms.join(', ')}`,
          },
        ],
        response_format: { type: 'json_object' },
      });

      const parsed = JSON.parse(response.choices[0].message.content || '{}');
      const list = parsed.variations || parsed.posts || [];
      return list.length > 0 ? list : this.fallback.generateSocialContent(prompt, platforms);
    } catch (e) {
      return this.fallback.generateSocialContent(prompt, platforms);
    }
  }

  async planCreativeWorkflow(prompt: string, brandContext?: Record<string, any>): Promise<CreativeAgentWorkflowPlan> {
    return this.fallback.planCreativeWorkflow(prompt, brandContext);
  }

  async generateImage(params: {
    prompt: string;
    style?: string;
    aspectRatio?: string;
    negativePrompt?: string;
  }): Promise<ImageGenerationOutput> {
    if (!this.openai) {
      return this.fallback.generateImage(params);
    }

    try {
      const response = await this.openai.images.generate({
        model: 'dall-e-3',
        prompt: `${params.prompt}, style: ${params.style || 'cinematic ultra-realistic 8k'}`,
        n: 1,
        size: '1024x1024',
      });

      return {
        imageUrl: response.data?.[0]?.url || '',
        prompt: params.prompt,
        style: params.style || 'Cinematic Realism',
        aspectRatio: params.aspectRatio || '1:1',
        width: 1024,
        height: 1024,
        seed: 42,
      };
    } catch (e) {
      return this.fallback.generateImage(params);
    }
  }

  async editImage(params: {
    sourceImageUrl: string;
    instruction: string;
    mode: 'remove_background' | 'erase_object' | 'upscale' | 'expand';
  }): Promise<ImageGenerationOutput> {
    return this.fallback.editImage(params);
  }

  async generateVideo(params: VideoGenerationParams): Promise<VideoGenerationOutput> {
    return this.fallback.generateVideo(params);
  }

  async checkStatus(jobId: string): Promise<VideoGenerationOutput> {
    return this.fallback.checkStatus(jobId);
  }

  async generateVoiceover(params: {
    text: string;
    voiceId: string;
    languageCode?: string;
    speed?: number;
    pitch?: number;
  }): Promise<VoiceoverOutput> {
    return this.fallback.generateVoiceover(params);
  }

  async suggestMusic(params: {
    mood?: string;
    videoType?: string;
    durationSec?: number;
  }): Promise<MusicSuggestionItem[]> {
    return this.fallback.suggestMusic(params);
  }

  async transcribe(audioOrVideoUrl: string): Promise<SubtitleOutput> {
    return this.fallback.transcribe(audioOrVideoUrl);
  }

  async generateCaptions(params: {
    text: string;
    style: 'clean' | 'bold' | 'minimal' | 'social' | 'highlight';
  }): Promise<SubtitleOutput> {
    return this.fallback.generateCaptions(params);
  }

  async startDubbing(params: {
    videoUrl: string;
    sourceLanguage: string;
    targetLanguage: string;
    targetVoiceGender?: 'Male' | 'Female';
  }): Promise<DubbingTask> {
    return this.fallback.startDubbing(params);
  }

  async getDubbingStatus(taskId: string): Promise<DubbingTask> {
    return this.fallback.getDubbingStatus(taskId);
  }
}
