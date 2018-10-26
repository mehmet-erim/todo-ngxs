import { Component, OnInit } from '@angular/core';

function Log(target, name, descriptor) {
  const original = descriptor.value;

  descriptor.value = function (...args) {
    console.log(args);
    const result = original.apply(this, args);
    console.log('The result function is', result);
    return result;
  };
  return descriptor;
}

export function ClassDecorator(config) {
  return (target) => {
    Object.defineProperty(target.prototype, 'name', { value: config.name });
    console.log(target);
  }
}

@Component({
  selector: 'app-decorator-tutorial',
  template: ` `
})
@ClassDecorator({
  name: 'Mehmet'
})
export class DecoratorTutorialComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log(this.exampleMethod(5, 2));
    console.warn(this['name']);
  }

  @Log
  exampleMethod(a, b) {
    return a * b;
  }

}
