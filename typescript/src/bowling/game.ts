export class Game {
  #rollCount = 0;
  #score = 0;

  roll(pinsKnockedDown: number) {
    if (this.gameIsInProgress()) {
      this.#score += pinsKnockedDown;
      this.#rollCount++;
    }
  }

  score() {
    return this.#score;
  }

  private gameIsInProgress() {
    return this.#rollCount < 20;
  }
}