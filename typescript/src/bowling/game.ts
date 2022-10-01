export class Game {
  #rollCount = 0;
  #score = 0;
  #frame = 0;
  #rollsThisFrame = 0;

  roll(pinsKnockedDown: number) {
    if (this.gameIsInProgress()) {
      this.#score += pinsKnockedDown;
      this.#rollCount++;
      this.#rollsThisFrame++;
      if (this.#rollsThisFrame === 2) {
        this.advanceFrame();
      }
    }
  }

  get score() {
    return this.#score;
  }

  get frame() {
    return this.#frame;
  }

  private gameIsInProgress() {
    return this.#rollCount < 20;
  }

  private advanceFrame() {
    this.#frame++;
    this.#rollsThisFrame = 0;
  }
}