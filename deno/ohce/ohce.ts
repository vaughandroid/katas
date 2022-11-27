import { readLines } from "https://deno.land/std/io/buffer.ts";
import { Dependencies } from "./interfaces.ts";
import { createDependencies } from "./createDependencies.ts";

export class Ohce {
  constructor(
    private readonly dependencies: Dependencies,
    private readonly username: string,
  ) {
  }

  startSession(): void {
    this.output.printLine(this.getGreeting());
  }

  handleInput(text: string): void {
    if (text === "Stop!") {
      this.endSession();
    } else {
      this.outputReversedText(text);
    }
  }

  private getGreeting(): string {
    const hourOfDay = this.timeProvider.currentHourOfDay;
    if (hourOfDay >= 6 && hourOfDay < 12) {
      return `¡Buenas días ${this.username}!`;
    } else if (hourOfDay >= 12 && hourOfDay < 20) {
      return `¡Buenas tardes ${this.username}!`;
    } else {
      return `¡Buenas noches ${this.username}!`;
    }
  }

  private outputReversedText(text: string) {
    const reversedText = text.split("").reverse().join("");
    this.output.printLine(reversedText);

    if (text === reversedText) {
      this.output.printLine("¡Bonita palabra!");
    }
  }

  private endSession(): void {
    this.output.printLine(`Adios ${this.username}`);
    this.exiter.exit();
  }
}

if (import.meta.main) {
  const username = Deno.args[0];
  const dependencies = createDependencies();
  const ohce = new Ohce(dependencies, username);

  ohce.startSession();

  for await (const line of readLines(Deno.stdin)) {
    ohce.handleInput(line);
  }
}
