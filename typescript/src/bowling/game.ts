export class Game {
  private _currentFrameIndex = 0;
  private _frames = [
    new Frame(), new Frame(), new Frame(), new Frame(), new Frame(),
    new Frame(), new Frame(), new Frame(), new Frame(), new Frame()
  ]

  roll(pinsKnockedDown: number) {
    if (this.gameIsEnded) {
      return;
    }

    this._frames.forEach(frame => frame.applyBonus(pinsKnockedDown));

    this.currentFrame.applyRoll(pinsKnockedDown);
    if (this.currentFrame.isCompleted) {
      this.advanceFrame();
    }
  }

  get score() {
    return this._frames.reduce((prev, curr) => prev + curr.score, 0);
  }

  get currentFrameIndex() {
    return this._currentFrameIndex;
  }

  get frameScores() {
    return this._frames.map(frame => frame.score);
  }

  private get currentFrame() {
    return this._frames[this._currentFrameIndex];
  }

  private get gameIsEnded() {
    return this._currentFrameIndex === 9 && this.currentFrame.isCompleted;
  }

  private advanceFrame() {
    if (!this.gameIsEnded) {
      this._currentFrameIndex++;
    }
  }
}

class Frame {
  rollsThisFrame = 0;
  score = 0;
  pendingBonusRolls = 0;
  isCompleted = false;

  applyRoll(pinsKnockedDown: number) {
    this.score += pinsKnockedDown;

    this.rollsThisFrame++;

    if (this.score === 10) {
      if (this.rollsThisFrame === 1) {
        this.pendingBonusRolls = 2;
      } else {
        this.pendingBonusRolls = 1;
      }
      this.isCompleted = true;
    } else if (this.rollsThisFrame === 2) {
      this.isCompleted = true;
    }
  }

  applyBonus(pinsKnockedDown: number) {
    if (this.pendingBonusRolls > 0) {
      this.score += pinsKnockedDown;
      this.pendingBonusRolls--;
    }
  }
}
