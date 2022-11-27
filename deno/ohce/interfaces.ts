export interface TimeProvider {
  get currentHourOfDay(): number;
}

export interface Output {
  printLine(line: string): void;
}

export interface Exiter {
  exit(): void;
}

export interface Dependencies {
  timeProvider: TimeProvider;
  output: Output;
  exiter: Exiter;
}
