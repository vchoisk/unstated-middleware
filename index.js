const defineDecoratorClass = middlewares => {
  class Decorator {
    constructor() {
      //Get class property and methods of instance
      const propertiesAndMethods = Object.getOwnPropertyNames(this.__proto__);

      propertiesAndMethods.forEach(name => {
        if (
          name !== "constructor" &&
          typeof this.__proto__[name] === "function"
        ) {
          const oldMethod = this[name];
          middlewares.forEach(middleware => {
            this[name] = middleware(oldMethod);
          });
        }
      });
    }
  }

  window.Decorator = Decorator;
};

defineDecoratorClass([
  method => () => {
    console.log(" function has been decorated");
    method();
  }
]);

class A extends Decorator {
  go() {
    console.log("original go called");
  }

  back() {
    console.log("original back called");
  }
}

const a = new A();

a.go();
a.back();
