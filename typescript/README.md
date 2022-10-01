# Typescript katas

## Katas

### Bowling

From: https://kata-log.rocks/bowling-game-kata

#### Bowling Rules

The game consists of 10 frames. In each frame the player has two rolls to knock down 10 pins. The score for the frame is the total number of pins knocked down, plus bonuses for strikes and spares.

A spare is when the player knocks down all 10 pins in two rolls. The bonus for that frame is the number of pins knocked down by the next roll.

A strike is when the player knocks down all 10 pins on his first roll. The frame is then completed with a single roll. The bonus for that frame is the value of the next two rolls.

In the tenth frame a player who rolls a spare or strike is allowed to roll the extra balls to complete the frame. However no more than three balls can be rolled in tenth frame.

#### Requirements

Write a class Game that has two methods

    void roll(int) is called each time the player rolls a ball. The argument is the number of pins knocked down.
    int score() returns the total score for that game.

#### Writeup

Took longer than expected (~2.5hrs) but the final frame was interesting, so I thought finishing was worthwhile completing.

The crux point was definitely the handling of bonuses. Introducing a separate class for the frames was definitely useful.

Ended up adding some extra public methods and properties which weren't described in the spec, but made writing tests much easier.
I think this was a valid thing to do, since they felt like things that would be useful to clients rather than just internal details.


## Developing

### Set up

```shell
nvm install # install the version of node configured in .nvmrc 
nvm use # use the version of node configured in .nvmrc 

npm i # Install node dependencies
```

### Run tests

```shell
npm t # Run tests once
npm run test:watch # Run in watch mode
```

### Linting

```shell
npm run lint
npm run lint:fix
```