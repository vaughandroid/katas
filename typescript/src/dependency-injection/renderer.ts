export interface Renderer {
  render(text: string): void;
}

export function createProductionRenderer(): Renderer {
  return {
    render(text: string) {
      console.log(text);
    }
  };
}

export interface TestRenderer extends Renderer {
  getRenderedText(): string | undefined;
}

export function createTestRenderer(): TestRenderer {
  let renderedText: string | undefined = undefined;
  return {
    render(text: string) {
      renderedText = text;
    },
    getRenderedText(): string | undefined {
      return renderedText;
    }
  };
}
