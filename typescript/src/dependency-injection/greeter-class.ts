import { Config, createProductionConfig } from './config';
import { createProductionRenderer, Renderer } from './renderer';

export class GreeterClass {
  constructor(
    private readonly config: Config = createProductionConfig(),
    private readonly renderer: Renderer = createProductionRenderer()
  ) {}

  greet() {
    this.renderer.render(this.config.greeting);
  }
}

export function greetInProductionUsingClass() {
  new GreeterClass().greet();
}
