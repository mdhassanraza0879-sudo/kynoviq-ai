export type ToolType = 'CHAT' | 'SUMMARIZER' | 'STUDY' | 'CODE' | 'WRITING' | 'IDEAS';

export interface AIToolConfig {
  id: string;
  type: ToolType;
  name: string;
  description: string;
  iconName: string;
  href: string;
  badge?: string;
  category: 'Productivity' | 'Learning' | 'Coding' | 'Writing' | 'Creation';
  systemPrompt: string;
}

export interface UserProfile {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  createdAt: string;
}

export interface ConversationItem {
  id: string;
  title: string;
  toolType: string;
  createdAt: string;
  updatedAt: string;
  messagesCount?: number;
}

export interface MessageItem {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt: string;
}

export interface SavedItemData {
  id: string;
  userId: string;
  title: string;
  toolType: ToolType;
  content: string;
  metadata?: string | null;
  createdAt: string;
}

export interface ToolUsageData {
  id: string;
  userId: string;
  toolType: ToolType;
  inputSnippet: string | null;
  outputSnippet: string | null;
  createdAt: string;
}

// Tool Input/Output Schemas
export interface SummarizerOptions {
  length: 'short' | 'medium' | 'detailed';
}

export interface StudyAssistantResult {
  explanation: string;
  keyPoints: string[];
  example: string;
  importantTerms: { term: string; definition: string }[];
  quizQuestions?: { question: string; options: string[]; answer: string }[];
}

export interface CodeAssistantResult {
  explanation: string;
  potentialErrors: string[];
  improvementSuggestions: string[];
  refactoredCode: string;
}

export interface WritingAssistantOptions {
  mode: 'improve_grammar' | 'rewrite' | 'make_professional' | 'make_simpler' | 'change_tone';
  targetTone?: string;
}

export interface IdeaGeneratorResult {
  summary: string;
  ideas: {
    title: string;
    description: string;
    targetAudience: string;
    keyFeatures: string[];
    monetization?: string;
  }[];
}
