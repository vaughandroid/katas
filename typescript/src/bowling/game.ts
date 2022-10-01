export class Game {
  private _rollCount = 0;
  private _currentFrame = 0;
  private _frames = [
    new Frame(), new Frame(), new Frame(), new Frame(), new Frame(),
    new Frame(), new Frame(), new Frame(), new Frame(), new Frame()
  ]

  roll(pinsKnockedDown: number) {
    if (this.gameIsEnded) {
      return;
    }

    const currentFrame = this._frames[this._currentFrame];
    currentFrame.score += pinsKnockedDown;

    this._frames.forEach(frame => {
      if (frame.bonusRolls > 0) {
        frame.score += pinsKnockedDown;
        frame.bonusRolls--;
      }
    })

    this._rollCount++;
    currentFrame.rollsThisFrame++;

    if (currentFrame.score === 10) {
      if (currentFrame.rollsThisFrame === 1) {
        currentFrame.bonusRolls = 2;
      } else {
        currentFrame.bonusRolls = 1;
      }
      this.advanceFrame();
    } else if (currentFrame.rollsThisFrame === 2) {
      this.advanceFrame();
    }
  }

  get score() {
    return this._frames.reduce((prev, curr) => prev + curr.score, 0);
  }

  get currentFrame() {
    return this._currentFrame;
  }

  get frameScores() {
    return this._frames.map(frame => frame.score);
  }

  private get gameIsEnded() {
    return this._rollCount === 20;
  }

  private advanceFrame() {
    if (this._currentFrame < 9) {
      this._currentFrame++;
    }
  }
}

class Frame {
  rollsThisFrame = 0;
  score = 0;
  bonusRolls = 0;
}
