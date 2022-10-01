export class Game {
  #score = 0;

  roll(pinsKnockedDown: number) {
    this.#score += pinsKnockedDown;
  }

  score() {
    return this.#score;
  }
}