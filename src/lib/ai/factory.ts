import { ProductionAIProvider } from './production-provider';
import { MockAIProvider } from './mock-provider';

let instance: ProductionAIProvider | null = null;

export function getAIProvider() {
  if (!instance) {
    instance = new ProductionAIProvider();
  }
  return instance;
}

export function getMockAIProvider() {
  return new MockAIProvider();
}
