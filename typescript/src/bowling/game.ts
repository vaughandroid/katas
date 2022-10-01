export class Game {
  private _currentFrameIndex = 0;
  private _frames = [
    new Frame(), new Frame(), new Frame(), new Frame(), new Frame(),
    new Frame(), new Frame(), new Frame(), new Frame(), new FinalFrame()
  ]

  roll(pinsKnockedDown: number) {
    if (this.hasEnded) {
      return;
    }

    this._frames.forEach(frame => frame.addBonusIfNeeded(pinsKnockedDown));

    this.currentFrame.roll(pinsKnockedDown);
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

  get hasEnded() {
    return this._currentFrameIndex === 9 && this.currentFrame.isCompleted;
  }

  private get currentFrame() {
    return this._frames[this._currentFrameIndex];
  }

  private advanceFrame() {
    if (!this.hasEnded) {
      this._currentFrameIndex++;
    }
  }
}

class Frame {
  rollsThisFrame = 0;
  score = 0;
  pendingBonusRolls = 0;

  roll(pinsKnockedDown: number) {
    this.score += pinsKnockedDown;
    this.rollsThisFrame++;

    if (this.score === 10) {
      this.pendingBonusRolls = this.rollsThisFrame === 1 ? 2 : 1;
    }
  }

  get isCompleted() {
    return this.score >= 10 || this.rollsThisFrame === 2;
  }

  addBonusIfNeeded(pinsKnockedDown: number) {
    if (this.pendingBonusRolls > 0) {
      this.score += pinsKnockedDown;
      this.pendingBonusRolls--;
    }
  }
}

class FinalFrame extends Frame {
  roll(pinsKnockedDown: number) {
    if (!super.isCompleted) {
      super.roll(pinsKnockedDown);
    }
  }

  get isCompleted() {
    return super.isCompleted && this.pendingBonusRolls === 0;
  }
}