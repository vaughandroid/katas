import productionConfig from './production-config.json';

export interface Config {
  greeting: string;
}

export function createProductionConfig() {
  return productionConfig;
}

export function createTestConfig(greeting: string) {
  return {
    greeting
  };
}
