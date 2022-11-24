import { expect } from 'chai';
import { GreeterClass, greetInProductionUsingClass } from './greeter-class';
import { createTestConfig } from './config';
import { createTestRenderer } from './renderer';

describe('Class-based DI', () => {
  it('Use in production code with a constructor', () => {
    const greeter = new GreeterClass();

    greeter.greet();
  });

  it('Use in production code by just calling a function', () => {
    greetInProductionUsingClass();
  });

  it('pass in test doubles for use in tests', () => {
    const testGreeting = 'Hello, test!';
    const testRenderer = createTestRenderer();
    const greeter = new GreeterClass(
      createTestConfig(testGreeting),
      testRenderer
    );

    greeter.greet();

    expect(testRenderer.getRenderedText()).to.equal(testGreeting);
  });
});
