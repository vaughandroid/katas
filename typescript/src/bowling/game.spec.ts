import { expect } from 'chai';
import { Game } from './game';

describe('Bowling', () => {
  it('After the first roll, the score should equal the number of pins knocked down', () => {
    const game = new Game();

    game.roll(3);

    expect(game.score()).to.equal(3);
  });

  it('After the second roll, the score should accumulate', () => {
    const game = new Game();

    game.roll(3);
    game.roll(2);

    expect(game.score()).to.equal(5);
  });

});
