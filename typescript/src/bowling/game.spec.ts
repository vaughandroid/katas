import { expect } from 'chai';
import { Game } from './game';

describe('Bowling', () => {
  let game: Game;

  beforeEach(() => {
    game = new Game();
  });

  describe('Start of a new game', () => {
    it('The score is 0', () => {
      expect(game.score).to.equal(0);
    });

    it('The current frame is 0', () => {
      expect(game.currentFrameIndex).to.equal(0);
    });

    it('The scores for each frame are all 0', () => {
      expect(game.frameScores).to.deep.equal([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    });
  });

  describe('Once the game has ended', () => {
    it('Further rolls are not counted and the frame index does not advance past 9', () => {
      for (let i = 0; i < 20; i++) {
        game.roll(1);
      }
      expect(game.score).to.equal(20);
      expect(game.currentFrameIndex).to.equal(9);

      game.roll(1);
      expect(game.score).to.equal(20);
      expect(game.currentFrameIndex).to.equal(9);
    });
  });

  describe('Simple scoring', () => {
    it('If there are no strikes or spares, the score is the total number of pins knocked down', () => {
      game.roll(1);
      expect(game.score).to.equal(1);

      game.roll(1);
      expect(game.score).to.equal(2);

      game.roll(2);
      expect(game.score).to.equal(4);

      game.roll(3);
      expect(game.score).to.equal(7);

      game.roll(5);
      expect(game.score).to.equal(12);
    });

    it('If there are no strikes or spares, the frame score is the number of pins knocked down that frame', () => {
      game.roll(1);
      expect(game.frameScores[0]).to.equal(1);

      game.roll(1);
      expect(game.frameScores[0]).to.equal(2);

      game.roll(2);
      expect(game.frameScores[1]).to.equal(2);

      game.roll(3);
      expect(game.frameScores[1]).to.equal(5);
    });
  });

  describe('Frames', () => {
    it('If there is not a strike, a frame consists of two rolls', () => {
      game.roll(1);
      expect(game.currentFrameIndex).to.equal(0);

      game.roll(2);
      expect(game.currentFrameIndex).to.equal(1);

      game.roll(3);
      expect(game.currentFrameIndex).to.equal(1);

      game.roll(4);
      expect(game.currentFrameIndex).to.equal(2);

      game.roll(5);
      expect(game.currentFrameIndex).to.equal(2);
    });

    it('Misses still advance the frame', () => {
      game.roll(0);
      game.roll(0);
      expect(game.currentFrameIndex).to.equal(1);

      game.roll(0);
      game.roll(1);
      expect(game.currentFrameIndex).to.equal(2);

      game.roll(1);
      game.roll(0);
      expect(game.currentFrameIndex).to.equal(3);
    });

    it('Prior to the last frame, rolling a strike ends the frame', () => {
      for (let i = 0; i < 9; i++) {
        game.roll(10);
        expect(game.currentFrameIndex).to.equal(i + 1);
      }
    });

    it('There are 10 frames', () => {
      for (let i = 0; i < 10; i++) {
        game.roll(1);
        game.roll(1);
      }
      expect(game.currentFrameIndex).to.equal(9);
    });
  });

  describe('Bonuses', () => {
    describe('Spares', () => {
      it('After a spare, the next roll counts towards the score for the frame as a bonus', () => {
        game.roll(0);
        game.roll(10);

        game.roll(1);
        expect(game.frameScores[0]).to.equal(11);
        expect(game.frameScores[1]).to.equal(1);
        expect(game.score).to.equal(12);

        game.roll(1);
        expect(game.frameScores[0]).to.equal(11);
        expect(game.frameScores[1]).to.equal(2);
        expect(game.score).to.equal(13);
      });

      describe('Strikes', () => {
        it('After a strike, the next two rolls count towards the score for the frame as a bonus', () => {
          game.roll(10);

          game.roll(1);
          expect(game.frameScores[0]).to.equal(11);
          expect(game.frameScores[1]).to.equal(1);
          expect(game.score).to.equal(12);

          game.roll(1);
          expect(game.frameScores[0]).to.equal(12);
          expect(game.frameScores[1]).to.equal(2);
          expect(game.score).to.equal(14);

          game.roll(1);
          expect(game.frameScores[0]).to.equal(12);
          expect(game.frameScores[1]).to.equal(2);
          expect(game.frameScores[2]).to.equal(1);
          expect(game.score).to.equal(15);
        });

        it('Bonuses accumulate correctly after a double strike', () => {
          game.roll(10);

          game.roll(10);
          expect(game.frameScores[0]).to.equal(20);
          expect(game.frameScores[1]).to.equal(10);
          expect(game.score).to.equal(30);

          game.roll(1);
          expect(game.frameScores[0]).to.equal(21);
          expect(game.frameScores[1]).to.equal(11);
          expect(game.frameScores[2]).to.equal(1);
          expect(game.score).to.equal(33);

          game.roll(1);
          expect(game.frameScores[0]).to.equal(21);
          expect(game.frameScores[1]).to.equal(12);
          expect(game.frameScores[2]).to.equal(2);
          expect(game.score).to.equal(35);
        });

        it('Bonuses accumulate correctly after a triple strike', () => {
          game.roll(10);
          game.roll(10);

          game.roll(10);
          expect(game.frameScores[0]).to.equal(30);
          expect(game.frameScores[1]).to.equal(20);
          expect(game.frameScores[2]).to.equal(10);
          expect(game.score).to.equal(60);

          game.roll(1);
          expect(game.frameScores[0]).to.equal(30);
          expect(game.frameScores[1]).to.equal(21);
          expect(game.frameScores[2]).to.equal(11);
          expect(game.frameScores[3]).to.equal(1);
          expect(game.score).to.equal(63);

          game.roll(1);
          expect(game.frameScores[0]).to.equal(30);
          expect(game.frameScores[1]).to.equal(21);
          expect(game.frameScores[2]).to.equal(12);
          expect(game.frameScores[3]).to.equal(2);
          expect(game.score).to.equal(65);
        });
      });
    });
  });

  describe('Final frame', () => {
    it('If there is no strike or spare, the game ends after 2 rolls', () => {
      for (let i = 0; i < 9; i++) {
        game.roll(1);
        game.roll(1);
      }

      game.roll(1);
      game.roll(1);

      expect(game.hasEnded).to.be.true;
      expect(game.score).to.equal(20);
    });

    it('A spare results in 1 extra bonus roll, which is only counted as a bonus', () => {
      for (let i = 0; i < 9; i++) {
        game.roll(1);
        game.roll(1);
      }

      game.roll(0);
      game.roll(10);

      expect(game.hasEnded).to.be.false;
      expect(game.score).to.equal(28);
      expect(game.currentFrameIndex).to.equal(9);

      game.roll(1);

      expect(game.hasEnded).to.be.true;
      expect(game.score).to.equal(29);
      expect(game.currentFrameIndex).to.equal(9);
    });

    it('A strike results in 2 extra bonus rolls, which are only counted as a bonus', () => {
      for (let i = 0; i < 9; i++) {
        game.roll(1);
        game.roll(1);
      }

      game.roll(10);

      expect(game.hasEnded).to.be.false;
      expect(game.score).to.equal(28);
      expect(game.currentFrameIndex).to.equal(9);

      game.roll(1);
      game.roll(1);

      expect(game.hasEnded).to.be.true;
      expect(game.score).to.equal(30);
      expect(game.currentFrameIndex).to.equal(9);
    });
  });
});
