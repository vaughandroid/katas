# Ohce

From: https://kata-log.rocks/ohce-kata

## Description

**ohce** is a console application that echoes the reverse of what you input
through the console.

Even though it seems a silly application, ohce knows a thing or two.

1. When you start ohce, it greets you differently depending on the current time,
   but only in Spanish:
   1. Between 20 and 6 hours, ohce will greet you saying: "¡Buenas noches < your
      name >!"
   2. Between 6 and 12 hours, ohce will greet you saying: "¡Buenos días < your
      name >!"
   3. Between 12 and 20 hours, ohce will greet you saying: "¡Buenas tardes <
      your name >!"
2. When you introduce a palindrome, ohce likes it and after reverse-echoing it,
   it adds "¡Bonita palabra!"
3. ohce knows when to stop, you just have to write Stop! and it'll answer "Adios
   < your name >" and end.

This is an example of using ohce during the morning:

```shell
$ ohce Pedro
> ¡Buenos días Pedro!
> $ hola
> aloh
> $ oto
> oto
> ¡Bonita palabra!
> $ stop
> pots
> $ Stop!
> Adios Pedro
```

## Running ohce

Run ohce:

```shell
deno run ohce.ts
```

Run the tests:

```shell
deno test tests.ts
```

## Writeup

I did this exercise to get a little practice using [Deno](https://deno.land).

The exercise itself was very straightforward, and I don't have much interesting
to say about it.

Setup with Deno was a joy, especially compared to the standard
Node.js/TypeScript experience. Absolutely zero work required to get a TypeScript
project running with sensible defaults - just create some TS files and off you
go.

I made use of Deno's standard library for getting user input lines. JS and TS
are sorely missing a decent set of standard libraries, so this is something I
have high hopes for.

The development experience was mostly fine, just a couple of quibbles that would
be solved with better IDE support (I was using WebStorm 2022):

1. Got some weird type errors that only went away when I closed the file and
   reopened it.
2. WebStorm's code formatting rules seem to differ slightly from Deno's ones.
   Also, after running `deno fmt` it can take a couple of seconds for WebStorm
   to pick up on the changes.

Overall it was a very positive experience and I plan on using Deno more in
future.
