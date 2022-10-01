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

    this.currentFrame.score += pinsKnockedDown;

    this._frames.forEach(frame => {
      if (frame.pendingBonusRolls > 0) {
        frame.score += pinsKnockedDown;
        frame.pendingBonusRolls--;
      }
    })

    this.currentFrame.rollsThisFrame++;

    if (this.currentFrame.score === 10) {
      if (this.currentFrame.rollsThisFrame === 1) {
        this.currentFrame.pendingBonusRolls = 2;
      } else {
        this.currentFrame.pendingBonusRolls = 1;
      }
      this.advanceFrame();
    } else if (this.currentFrame.rollsThisFrame === 2) {
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
    return this._currentFrameIndex === 9 && this.currentFrame.rollsThisFrame === 2;
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
}
