import 'reflect-metadata';

function TestDecorator(target: Object, context: ClassMethodDecoratorContext) {
    console.log('Decorator target:', target);
    console.log('Decorator context:', context);
    Reflect.defineMetadata('test', 'value', target, context.name);
}

class TestClass {
    @TestDecorator
    testMethod() {}
}

const metadataValue = Reflect.getMetadata('test', TestClass.prototype, 'testMethod');
console.log('Metadata value:', metadataValue);