import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.166.0/testing/asserts.ts";
import {
  beforeEach,
  describe,
  it,
} from "https://deno.land/std@0.166.0/testing/bdd.ts";
import { Ohce } from "./ohce.ts";
import { Exiter, Output, TimeProvider } from "./interfaces.ts";

describe("ohce", () => {
  let stubTimeProvider: StubTimeProvider;
  let outputSpy: OutputSpy;
  let exiterSpy: ExiterSpy;
  let ohce: Ohce;

  beforeEach(() => {
    stubTimeProvider = new StubTimeProvider();
    outputSpy = new OutputSpy();
    exiterSpy = new ExiterSpy();
    ohce = new Ohce({
      timeProvider: stubTimeProvider,
      output: outputSpy,
      exiter: exiterSpy,
    }, "Pedro");
  });

  describe("Greetings", () => {
    it("6am is morning", () => {
      stubTimeProvider.currentHourOfDay = 6;

      ohce.startSession();

      assertEquals(outputSpy.lines[0], "¡Buenas días Pedro!");
    });

    it("11am is morning", () => {
      stubTimeProvider.currentHourOfDay = 11;

      ohce.startSession();

      assertEquals(outputSpy.lines[0], "¡Buenas días Pedro!");
    });

    it("12pm is afternoon", () => {
      stubTimeProvider.currentHourOfDay = 12;

      ohce.startSession();

      assertEquals(outputSpy.lines[0], "¡Buenas tardes Pedro!");
    });

    it("7pm is afternoon", () => {
      stubTimeProvider.currentHourOfDay = 19;

      ohce.startSession();

      assertEquals(outputSpy.lines[0], "¡Buenas tardes Pedro!");
    });

    it("8pm is evening", () => {
      stubTimeProvider.currentHourOfDay = 20;

      ohce.startSession();

      assertEquals(outputSpy.lines[0], "¡Buenas noches Pedro!");
    });

    it("5am is evening", () => {
      stubTimeProvider.currentHourOfDay = 5;

      ohce.startSession();

      assertEquals(outputSpy.lines[0], "¡Buenas noches Pedro!");
    });
  });

  describe("Echoing", () => {
    it("Echoes non-palindromes backwards", () => {
      ohce.handleInput("hello");
      assertEquals(outputSpy.lines[0], "olleh");

      ohce.handleInput("foo");
      assertEquals(outputSpy.lines[1], "oof");

      ohce.handleInput("Bar");
      assertEquals(outputSpy.lines[2], "raB");
    });

    it("Likes palindromes", () => {
      ohce.handleInput("oto");
      assertEquals(outputSpy.lines[0], "oto");
      assertEquals(outputSpy.lines[1], "¡Bonita palabra!");

      ohce.handleInput("foo");
      assertEquals(outputSpy.lines[2], "oof");

      ohce.handleInput("xoxox");
      assertEquals(outputSpy.lines[3], "xoxox");
      assertEquals(outputSpy.lines[4], "¡Bonita palabra!");
    });
  });

  describe('Ending a session when the user enters "Stop!"', () => {
    it("Says goodbye", () => {
      ohce.handleInput("Stop!");

      assertEquals(outputSpy.lines[0], "Adios Pedro");
    });

    it("Exits", () => {
      ohce.handleInput("Stop!");

      assert(exiterSpy.hasExited);
    });
  });
});

class StubTimeProvider implements TimeProvider {
  constructor(public currentHourOfDay: number = 12) {
  }
}

class OutputSpy implements Output {
  lines: string[] = [];

  printLine(text: string): void {
    this.lines.push(text);
  }
}

class ExiterSpy implements Exiter {
  hasExited = false;

  exit() {
    this.hasExited = true;
  }
}
