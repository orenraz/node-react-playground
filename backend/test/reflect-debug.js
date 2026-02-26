require('reflect-metadata');

console.log('Reflect object:', Reflect);

function TestDecorator(target) {
  console.log('Decorator applied to:', target);
}

@TestDecorator
class TestClass {}

console.log('TestClass:', TestClass);