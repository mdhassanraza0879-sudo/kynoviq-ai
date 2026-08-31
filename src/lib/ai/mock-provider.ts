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

export class MockAIProvider
  implements
    ITextProvider,
    IImageProvider,
    IVideoProvider,
    IAudioProvider,
    ITranscriptionProvider,
    IDubbingProvider
{
  async generateScript(prompt: string, brandContext?: Record<string, any>): Promise<ScriptGenerationOutput> {
    const brandName = brandContext?.brandName || 'Kynoviq Studio';
    const brandTone = brandContext?.toneOfVoice || 'Engaging and authoritative';

    return {
      title: `The Ultimate Guide to ${prompt.slice(0, 40)}...`,
      hook: `Did you know that 90% of creators struggle with ${prompt.slice(0, 30)}? Here is how to fix it in 30 seconds.`,
      introduction: `Welcome back to ${brandName}. Today we are breaking down everything you need to know about ${prompt.slice(0, 50)}.`,
      fullScript: `[SCENE 1: HOOK (0-4s)]\nVisual: Fast-paced glitch cut to high-energy subject looking directly into camera.\nHost: "Stop scrolling if you want to master ${prompt.slice(0, 30)}."\n\n[SCENE 2: PROBLEM (4-12s)]\nVisual: Dynamic infographic showing common pitfalls and bottlenecks.\nHost: "Most people do this the old way, wasting hours of time and energy without getting results."\n\n[SCENE 3: SOLUTION (12-22s)]\nVisual: Step-by-step screen recording and high-tech cinematic UI overlay showing instant creation.\nHost: "With intelligent creative automation, you can transform a single idea into full-fledged production-grade assets in seconds."\n\n[SCENE 4: CTA (22-30s)]\nVisual: Glowing brand logo with animated swipe up / subscribe button.\nHost: "Try it yourself today on ${brandName} and start creating without limits!"`,
      sceneBreakdown: [
        {
          sceneNumber: 1,
          visualDescription: 'Extreme close up with neon rim lighting, fast zoom-in motion',
          bRollSuggestions: ['Futuristic neon city timelapse', 'Fast typing on glowing cyber keyboard'],
          voiceoverText: `Stop scrolling if you want to master ${prompt.slice(0, 30)}.`,
          durationEstimateSec: 4,
          transitionType: 'Whip Pan Right',
        },
        {
          sceneNumber: 2,
          visualDescription: 'Split screen showing frustration vs smooth AI workflow',
          bRollSuggestions: ['Overwhelmed person looking at multiple screens', 'Clock ticking at 2x speed'],
          voiceoverText: 'Most people do this the old way, wasting hours of time without results.',
          durationEstimateSec: 8,
          transitionType: 'Glitch Zoom',
        },
        {
          sceneNumber: 3,
          visualDescription: 'Futuristic 3D holographic workspace generating assets automatically',
          bRollSuggestions: ['AI neural nodes connecting', 'High-res video rendering on timeline'],
          voiceoverText: 'With intelligent creative automation, you transform ideas into reality instantly.',
          durationEstimateSec: 10,
          transitionType: 'Cross Dissolve Glow',
        },
        {
          sceneNumber: 4,
          visualDescription: 'Hero brand card with dynamic particle background and glowing CTA button',
          bRollSuggestions: ['Satisfied creator celebrating', 'Mobile feed getting thousands of likes'],
          voiceoverText: `Try it yourself today on ${brandName} and create without limits!`,
          durationEstimateSec: 8,
          transitionType: 'Flash to White',
        },
      ],
      callToAction: `Follow ${brandName} for daily AI creative breakthroughs & claim your free credits!`,
      videoDescription: `Master ${prompt} with our comprehensive step-by-step breakdown. Built with Kynoviq Studio.\n\nTimestamps:\n0:00 - The Hook\n0:04 - The Core Problem\n0:12 - The AI Solution\n0:22 - Next Steps & CTA\n\n#AI #ContentCreation #KynoviqStudio #CreativeAI`,
      socialVersions: {
        shortHook: `Stop making this huge mistake with ${prompt.slice(0, 25)}! 🚀`,
        caption: `Here is the secret to scaling your content production 10x with AI. Comment 'CREATE' to get our complete blueprint! 👇`,
        hashtags: ['#KynoviqStudio', '#AICreator', '#VideoProduction', '#CreatorEconomy', '#ViralReels'],
      },
    };
  }

  async generateAdCreative(params: {
    product: string;
    targetAudience: string;
    platform: string;
    goal: string;
    brandContext?: Record<string, any>;
  }): Promise<AdCreativeOption[]> {
    return [
      {
        hook: `Still struggling to scale ${params.product}? Here is the solution engineered for ${params.targetAudience}.`,
        headline: `Transform How You Build ${params.product} with Kynoviq AI`,
        primaryText: `Stop spending 20+ hours every week on manual content generation. With Kynoviq Studio, ${params.targetAudience} can turn any single prompt into ready-to-publish videos, voiceovers, and ads in 60 seconds.`,
        cta: 'Claim 50 Free AI Credits Today',
        videoStoryboard: [
          { scene: 1, visual: 'Split comparison of manual editing vs 1-click AI generation', audio: 'What if you could produce a week of content in 5 minutes?' },
          { scene: 2, visual: 'Live demo showcasing 10 AI tools generating unified assets', audio: 'Kynoviq AI handles scripts, voice, video, and ads seamlessly.' },
          { scene: 3, visual: 'Customer dashboard showing 4.2x engagement boost', audio: 'Join thousands of modern creators today.' },
        ],
        displayVariationUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      },
      {
        hook: `The #1 secret ${params.targetAudience} are using to dominate ${params.platform}.`,
        headline: `One Idea. Infinite Creation. Test Kynoviq Studio Free.`,
        primaryText: `Tired of juggling 8 different expensive subscriptions? Kynoviq brings your entire creative stack under one roof—from HD video generation to multilingual dubbing and brand kit automation.`,
        cta: 'Start Creating Now',
        videoStoryboard: [
          { scene: 1, visual: 'Bold typography flashing "Stop Paying For 10 AI Subscriptions"', audio: 'You only need one creative operating system.' },
          { scene: 2, visual: 'Rapid fire showcase of video editor, voiceover, and ad generator', audio: 'Script it. Voice it. Render it. Publish it.' },
          { scene: 3, visual: 'Hero CTA with glowing start button', audio: 'Tap below to claim your free trial.' },
        ],
        displayVariationUrl: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80',
      },
    ];
  }

  async generateSocialContent(prompt: string, platforms: string[]): Promise<SocialPostVariation[]> {
    const result: SocialPostVariation[] = [];

    if (platforms.includes('Instagram') || platforms.length === 0) {
      result.push({
        platform: 'Instagram',
        caption: `✨ 3 Game-Changing steps to revolutionize ${prompt.slice(0, 30)}:\n\n1️⃣ Automate the repetitive groundwork\n2️⃣ Focus 100% on creative vision\n3️⃣ Distribute across all channels instantly\n\nSave this post for your next project & tap the link in bio to try the AI workflow! 🚀`,
        hashtags: ['#ContentCreator', '#AITools', '#CreatorEconomy', '#ReelsTips', '#KynoviqStudio'],
        cta: 'Link in Bio to get started',
        idealPostTime: '6:30 PM EST (Peak Engagement)',
        formatSuggestion: '9:16 Reel (under 25 seconds) + 5-slide Carousel',
      });
    }

    if (platforms.includes('YouTube')) {
      result.push({
        platform: 'YouTube',
        caption: `How to Master ${prompt} in 2026 (Full Step-by-Step Breakdown)\n\nIn this video, we cover the exact frameworks, automated workflows, and tools you need to stay ahead.`,
        hashtags: ['#YouTubeShorts', '#Tutorial', '#ArtificialIntelligence', '#TechTips'],
        cta: 'Subscribe & Click the Notification Bell',
        idealPostTime: '3:00 PM EST',
        formatSuggestion: 'YouTube Short with bold centered subtitles + High-contrast 16:9 Thumbnail',
      });
    }

    if (platforms.includes('LinkedIn')) {
      result.push({
        platform: 'LinkedIn',
        caption: `The future of creative production is not about working harder—it is about removing friction.\n\nWhen we analyzed how modern brands approach "${prompt}", the data was clear: teams utilizing unified AI creative ecosystems ship 5.4x more variations at 80% lower cost.\n\nWhat is your biggest creative bottleneck today? Let's discuss in the comments.`,
        hashtags: ['#Productivity', '#GenerativeAI', '#SaaS', '#Leadership', '#Innovation'],
        cta: 'Share your thoughts below',
        idealPostTime: '8:45 AM EST (Tuesday / Thursday)',
        formatSuggestion: 'Text + Document Slide Deck (PDF Carousel)',
      });
    }

    if (platforms.includes('TikTok') || platforms.includes('Twitter')) {
      result.push({
        platform: 'TikTok',
        caption: `I wish I knew this AI trick for ${prompt.slice(0, 25)} sooner 🤯 #fyp #aitools #creatortips #kynoviq`,
        hashtags: ['#fyp', '#aitools', '#growthhacks', '#viral'],
        cta: 'Follow for part 2',
        idealPostTime: '7:00 PM EST',
        formatSuggestion: 'Fast-paced talking head with dynamic B-roll popups',
      });
    }

    return result;
  }

  async planCreativeWorkflow(prompt: string, brandContext?: Record<string, any>): Promise<CreativeAgentWorkflowPlan> {
    const script = await this.generateScript(prompt, brandContext);
    const ads = await this.generateAdCreative({
      product: prompt,
      targetAudience: 'Content Creators & Modern Brands',
      platform: 'Instagram & YouTube',
      goal: 'Conversions & Brand Awareness',
      brandContext,
    });
    const social = await this.generateSocialContent(prompt, ['Instagram', 'YouTube', 'LinkedIn', 'TikTok']);

    return {
      campaignId: `camp_${Date.now()}`,
      goal: prompt,
      targetAudience: 'Digital creators, founders, marketing agencies, and media teams',
      brandTone: brandContext?.toneOfVoice || 'Bold, futuristic, energetic and clean',
      strategySummary: `Multi-channel launch strategy: Drive viral top-of-funnel reach via 9:16 short-form video, capture high-intent leads via high-converting ad copy, and reinforce community engagement across LinkedIn and Instagram.`,
      estimatedCredits: 25,
      estimatedDurationSec: 30,
      script,
      suggestedVisualPrompts: [
        'Cinematic 8K shot of futuristic glass studio with glowing purple holographic displays, photorealistic, Unreal Engine 5 render',
        'Dynamic close up of cybernetic hand touching a glowing AI crystal orb with neon cyan particles floating in zero gravity',
        'Sleek modern minimalist creative workspace with high-end dual monitors displaying timeline editor and audio waves',
      ],
      voiceoverConfig: {
        voiceId: 'voice_hassan_deep',
        language: 'English',
        speed: 1.05,
      },
      socialVariants: social,
      adCreative: ads[0],
    };
  }

  async generateImage(params: {
    prompt: string;
    style?: string;
    aspectRatio?: string;
    negativePrompt?: string;
  }): Promise<ImageGenerationOutput> {
    // Generate contextually styled curated high-resolution AI art placeholders
    const curatedImages = [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1400&q=80',
    ];

    const idx = Math.floor(Math.random() * curatedImages.length);

    let width = 1024;
    let height = 1024;
    if (params.aspectRatio === '9:16') {
      width = 720;
      height = 1280;
    } else if (params.aspectRatio === '16:9') {
      width = 1280;
      height = 720;
    } else if (params.aspectRatio === '4:5') {
      width = 1080;
      height = 1350;
    }

    return {
      imageUrl: curatedImages[idx],
      prompt: params.prompt,
      style: params.style || 'Cinematic Realism',
      aspectRatio: params.aspectRatio || '1:1',
      width,
      height,
      seed: Math.floor(Math.random() * 9999999),
    };
  }

  async editImage(params: {
    sourceImageUrl: string;
    instruction: string;
    mode: 'remove_background' | 'erase_object' | 'upscale' | 'expand';
  }): Promise<ImageGenerationOutput> {
    return {
      imageUrl: params.sourceImageUrl,
      prompt: `[${params.mode.toUpperCase()}] ${params.instruction}`,
      style: 'Enhanced AI Polish',
      aspectRatio: '1:1',
      width: 2048,
      height: 2048,
      seed: 42,
    };
  }

  async generateVideo(params: VideoGenerationParams): Promise<VideoGenerationOutput> {
    const sampleVideos = [
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    ];

    const sampleThumbs = [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80',
    ];

    return {
      jobId: `vid_job_${Date.now()}`,
      videoUrl: sampleVideos[Math.floor(Math.random() * sampleVideos.length)],
      thumbnailUrl: sampleThumbs[0],
      durationSec: params.durationSeconds || 15,
      aspectRatio: params.aspectRatio || '9:16',
      status: 'COMPLETED',
    };
  }

  async checkStatus(jobId: string): Promise<VideoGenerationOutput> {
    return {
      jobId,
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      durationSec: 15,
      aspectRatio: '9:16',
      status: 'COMPLETED',
    };
  }

  async generateVoiceover(params: {
    text: string;
    voiceId: string;
    languageCode?: string;
    speed?: number;
    pitch?: number;
  }): Promise<VoiceoverOutput> {
    // Generate realistic sinusoidal audio waveform data
    const freq = Array.from({ length: 48 }, () => Math.floor(Math.random() * 80) + 15);
    const wordCount = params.text.trim().split(/\s+/).length;
    const duration = Math.max(3, Math.round((wordCount / 2.5) * (1 / (params.speed || 1))));

    return {
      audioUrl: 'https://actions.google.com/sounds/v1/science_fiction/scifi_hum.ogg',
      durationSec: duration,
      language: params.languageCode || 'en-US',
      voiceId: params.voiceId,
      wordCount,
      waveformFrequencies: freq,
    };
  }

  async suggestMusic(params: {
    mood?: string;
    videoType?: string;
    durationSec?: number;
  }): Promise<MusicSuggestionItem[]> {
    return [
      {
        id: 'track_1',
        title: 'Cyberpunk Horizon 2099',
        artist: 'Kynoviq Soundworks',
        mood: 'Futuristic',
        genre: 'Synthwave / Ambient',
        bpm: 124,
        key: 'F Minor',
        durationSec: 145,
        previewUrl: 'https://actions.google.com/sounds/v1/science_fiction/ambient_hum.ogg',
        licensingNotice: '100% Royalty Free for Commercial SaaS & Social Usage',
        recommendedUse: 'High-energy reels, tech reviews, AI tutorials',
      },
      {
        id: 'track_2',
        title: 'Cinematic Dawn Orchestra',
        artist: 'Aetheria Ensemble',
        mood: 'Cinematic',
        genre: 'Orchestral Hybrid',
        bpm: 98,
        key: 'D Major',
        durationSec: 180,
        previewUrl: 'https://actions.google.com/sounds/v1/science_fiction/alien_beacon.ogg',
        licensingNotice: 'Commercial Rights Included with Active Subscription',
        recommendedUse: 'Brand story campaigns, documentary hooks, product reveals',
      },
      {
        id: 'track_3',
        title: 'Silicon Velocity Pulse',
        artist: 'HyperDrive Audio',
        mood: 'Energetic',
        genre: 'Electro Beat',
        bpm: 130,
        key: 'A Minor',
        durationSec: 110,
        previewUrl: 'https://actions.google.com/sounds/v1/science_fiction/computer_beeps.ogg',
        licensingNotice: 'Royalty-Free Commercial License (CC-BY 4.0 Compatible)',
        recommendedUse: 'Speed runs, software showcases, TikTok ads',
      },
      {
        id: 'track_4',
        title: 'Deep Focus Zen Flow',
        artist: 'MindPulse',
        mood: 'Calm',
        genre: 'Lo-Fi Chill',
        bpm: 85,
        key: 'C Major',
        durationSec: 195,
        previewUrl: 'https://actions.google.com/sounds/v1/science_fiction/force_field.ogg',
        licensingNotice: '100% Cleared for Monetized YouTube & Podcasts',
        recommendedUse: 'Study sessions, background narrations, explainer videos',
      },
    ];
  }

  async transcribe(audioOrVideoUrl: string): Promise<SubtitleOutput> {
    const dummyWords = [
      'Welcome',
      'to',
      'Kynoviq',
      'Studio.',
      'One',
      'idea',
      'transforms',
      'into',
      'infinite',
      'creation.',
      'From',
      'AI',
      'scripts',
      'and',
      'cinematic',
      'videos',
      'to',
      'multilingual',
      'dubbing',
      'and',
      'automated',
      'captions.',
    ];

    const subtitles = dummyWords.map((word, i) => ({
      id: `sub_${i}`,
      startMs: i * 450,
      endMs: (i + 1) * 450 - 50,
      text: word,
      confidence: 0.98,
    }));

    return {
      fullText: dummyWords.join(' '),
      language: 'en-US',
      subtitles,
      srtContent: `1\n00:00:00,000 --> 00:00:02,000\nWelcome to Kynoviq Studio.\n\n2\n00:00:02,100 --> 00:00:04,500\nOne idea transforms into infinite creation.\n\n3\n00:00:04,600 --> 00:00:08,000\nFrom AI scripts to multilingual dubbing.`,
      vttContent: `WEBVTT\n\n00:00:00.000 --> 00:00:02.000\nWelcome to Kynoviq Studio.\n\n00:00:02.100 --> 00:00:04.500\nOne idea transforms into infinite creation.`,
    };
  }

  async generateCaptions(params: {
    text: string;
    style: 'clean' | 'bold' | 'minimal' | 'social' | 'highlight';
  }): Promise<SubtitleOutput> {
    const words = params.text.trim().split(/\s+/);
    const subtitles = words.map((w, i) => ({
      id: `sub_gen_${i}`,
      startMs: i * 380,
      endMs: (i + 1) * 380 - 40,
      text: params.style === 'social' ? w.toUpperCase() : w,
      confidence: 0.99,
    }));

    return {
      fullText: params.text,
      language: 'en',
      subtitles,
      srtContent: `1\n00:00:00,000 --> 00:00:03,000\n${params.text}`,
      vttContent: `WEBVTT\n\n00:00:00.000 --> 00:00:03.000\n${params.text}`,
    };
  }

  async startDubbing(params: {
    videoUrl: string;
    sourceLanguage: string;
    targetLanguage: string;
    targetVoiceGender?: 'Male' | 'Female';
  }): Promise<DubbingTask> {
    return {
      id: `dub_${Date.now()}`,
      sourceLanguage: params.sourceLanguage,
      targetLanguage: params.targetLanguage,
      originalVideoUrl: params.videoUrl,
      dubbedVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      status: 'COMPLETED',
      progress: 100,
      originalTranscript: 'In this presentation, we will demonstrate how Kynoviq AI simplifies multi-track video generation.',
      translatedTranscript:
        params.targetLanguage.toLowerCase().includes('hindi')
          ? 'इस प्रस्तुति में, हम प्रदर्शित करेंगे कि कैसे क्यूनोविक एआई मल्टी-ट्रैक वीडियो निर्माण को सरल बनाता है।'
          : 'En esta presentación, demostraremos cómo Kynoviq AI simplifica la creación de video multipista.',
    };
  }

  async getDubbingStatus(taskId: string): Promise<DubbingTask> {
    return {
      id: taskId,
      sourceLanguage: 'English',
      targetLanguage: 'Hindi',
      originalVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      dubbedVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      status: 'COMPLETED',
      progress: 100,
      originalTranscript: 'Create videos, voiceovers and scripts in seconds.',
      translatedTranscript: 'सेकंडों में वीडियो, वॉयसओवर और स्क्रिप्ट बनाएं।',
    };
  }
}
