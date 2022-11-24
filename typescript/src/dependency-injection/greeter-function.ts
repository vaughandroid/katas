import { Config, createProductionConfig } from './config';
import { createProductionRenderer, Renderer } from './renderer';

export function createGreetFunction(
  config: Config = createProductionConfig(),
  renderer: Renderer = createProductionRenderer()
): () => void {
  return () => renderer.render(config.greeting);
}

export function greetInProductionUsingFunction() {
  return createGreetFunction()();
}
