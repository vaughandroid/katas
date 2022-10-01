import { expect } from 'chai';
import { Game } from './game';

describe('Bowling', () => {

  it('Before the first roll, the score is 0', () => {
    const game = new Game();

    expect(game.score()).to.equal(0);
  });

  it('If there are no strikes or spares, the score is the total number of pins knocked down', () => {
    const game = new Game();

    game.roll(1);
    expect(game.score()).to.equal(1);

    game.roll(1);
    expect(game.score()).to.equal(2);

    game.roll(2);
    expect(game.score()).to.equal(4);

    game.roll(3);
    expect(game.score()).to.equal(7);

    game.roll(5);
    expect(game.score()).to.equal(12);
  });

  it('With no strikes or spares, only the first 20 rolls are counted', () => {
    const game = new Game();

    for (let i = 0; i < 20; i++) {
      game.roll(1);
    }
    expect(game.score()).to.equal(20);

    for (let i = 0; i < 99; i++) {
      game.roll(1);
    }
    expect(game.score()).to.equal(20);
  });

  it('If there are no strikes, a frame consists of two rolls', () => {
    const game = new Game();

    expect(game.frame()).to.equal(0);

    game.roll(1);
    expect(game.frame()).to.equal(0);

    game.roll(2);
    expect(game.frame()).to.equal(1);

    game.roll(3);
    expect(game.frame()).to.equal(1);

    game.roll(4);
    expect(game.frame()).to.equal(2);

    game.roll(5);
    expect(game.frame()).to.equal(2);
  });

});
