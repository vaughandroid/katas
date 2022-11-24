# Typescript katas

## Bowling

Taken from: https://kata-log.rocks/bowling-game-kata

### Bowling Rules

The game consists of 10 frames. In each frame the player has two rolls to knock down 10 pins.The score for the frame is
the total number of pins knocked down, plus bonuses for strikes and spares.

A spare is when the player knocks down all 10 pins in two rolls. The bonus for that frame is the number of pins knocked
down by the next roll.

A strike is when the player knocks down all 10 pins on his first roll. The frame is then completed with a single roll.
The bonus for that frame is the value of the next two rolls.

In the tenth frame a player who rolls a spare or strike is allowed to roll the extra balls to complete the frame.
However, no more than three balls can be rolled in the tenth frame.

### Requirements

Write a class Game that has two methods:

* `void roll(int)` is called each time the player rolls a ball. The argument is the number of pins knocked down.
* `int score()` returns the total score for that game.

### Writeup

This took quite a bit longer than I expected (~2.5hrs). It started off very simply, but there were a couple of points in
the exercise where the complexity increased somewhat.

The first was the handling of bonuses for spares and strikes, which led me to introduce the separate class for frames.
Adding in the concept of frames helped quite a bit - a good example of why it can sometimes help to model parts of the
that aren't explicitly listed in the requirements.

The second complex bit was the special case handling for the last frame. I ended up using a special subclass of frame
for this, but I'm not entirely happy with the approach so would look to try a different approach if I tried this
exercise again.

Along the way, I ended up adding some extra public methods and properties which weren't described in the spec, but made
writing tests much easier. I think this was a valid thing to do, since they felt like things that would be useful to
clients rather than just internal details.

All in all it's an interesting exercise to try, and I can see why it's a popular kata.

## Dependency Injection

Not really a kata, this is just a demo of a couple of options for doing Dependency Injection in TypeScript.

* [greeter-class.ts](src/dependency-injection/greeter-class.ts) demonstrates class-based DI.
* [greeter-function.ts](src/dependency-injection/greeter-function.ts) demonstrates function-based DI.

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
