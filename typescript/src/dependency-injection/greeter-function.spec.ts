import { expect } from 'chai';
import { createTestConfig } from './config';
import { createTestRenderer } from './renderer';
import { createGreetFunction, greetInProductionUsingFunction } from './greeter-function';

describe('Function-based DI', () => {
  it('Use in production code with a factory method', () => {
    const greet = createGreetFunction();

    greet();
  });

  it('Use in production code by just calling a function', () => {
    greetInProductionUsingFunction();
  });

  it('pass in test doubles for use in tests', () => {
    const testGreeting = 'Hello, test!';
    const testRenderer = createTestRenderer();
    const greet = createGreetFunction(createTestConfig(testGreeting), testRenderer);

    greet();

    expect(testRenderer.getRenderedText()).to.equal(testGreeting);
  });
});
