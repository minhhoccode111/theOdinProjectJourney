//3.2 Use computed property names when creating objects with dynamic property names
const getKey = (keyName) => `a key named ${keyName}`;
//good
const o32 = {
  id: 5,
  name: 'Hoang Minh',
  [getKey('Minh Hoang')]: true,
  //"a key named Minh Hoang": true,
};

//3.3 Use object method shorthand
//bad
const o33b = {
  method: function () {
    return 'something';
  },
};
//good
const o33g = {
  method() {
    return 'something';
  },
};

//3.5 group your shorthand properties at the beginning of you object declaration
const v350 = 0;
const v351 = 1;
//good
const o35 = {
  v350,
  v351,
  someValue: 3,
};

//3.6 only quote properties that are invalid identifies
//good
const o36g = {
  hoang: 'minh',
  dang: 1,
  'hoang-minh': 'my name is hoang minh',
};

//3.7 Do not call Object.prototype methods directly, such as 'hasOwnProperty', 'propertyIsEnumerable' and 'isPrototypeOf'
//Why? These methods may be shadowed by properties on the object in question - consider {hasOwnProperty:false} - or, the object may be a null object (Object.create(null))
const o37 = {
  bla: 1,
};
//bad
console.log(o37.hasOwnProperty('bla'));
//good
console.log(Object.prototype.hasOwnProperty.call(o37, 'bla'));
//best
const has37 = Object.prototype.hasOwnProperty; //cache the lookup once, in module scope
console.log(has.call(o37, 'bla'));
//or
import has from 'has'; //https://www.npmjs.com/package/has
console.log(has(o37, 'bla'));
//or
console.log(Object.hasOwn(o37, 'bla')); //https://www.npmjs.com/package/object.hasOwn

//3.8 Prefer the object spread syntax over Object.assign to shallow-copy objects. Use the object rest parameter syntax to get a new object with certain properties omitted
//very bad
const originalVB = { a: 1, b: 2 };
const copyVB = Object.assign(originalVB, { c: 3 }); //this mutates 'original' object
delete copyVB.a; //so does this
//bad
const originalB = { a: 1, b: 2 };
const copyB = Object.assign({}, originalB, { c: 3 }); //copy => {a:1,b:2,c:3}
//good
const originalG = { a: 1, b: 2 };
const copyG = { ...originalG, c: 3 }; //copy => {a:1,b:2,c:3}
const { a, ...noA } = copyG; //noA=>{b:2,c:3}

//4.3 Use array spread ... to copy arrays
//bad
const arr43 = [];
const arrCopy43b = [];
for (let i = 0; i < arr43.length; i++) {
  arr43[i] = arrCopy43b[i];
}
//good
const arrCopy43g = [...arr43];

//4.4 To convert an iterable object to an array, use spreads ... instead of Array.from
const foo44 = document.querySelectorAll('div');
//good
const nodes44g = Array.from(foo44);
//best
const nodes44best = [...foo];

//4.5 Use Array.from for converting an array-like object to an array
const arrLike = { 1: 'boo', 2: 'foo', 3: 'baz' };
//bad
const arr45bad = Array.prototype.slice.call(arrLike);
//good
const arr45good = Array.from(arrLike);

//4.6 Use Array.from instead of spread ... for mapping over iterables, because it avoids creating an intermediate array
//bad
const baz46 = [...foo].map(bar);
//GOOD
const baz46g = Array.from(foo, bar);

//5.1 Use object destructuring when accessing and using multiple properties of an object
//why? Destructuring saves you from creating temporary references for those properties
//bad
function getFullName51Bad(user) {
  const first = user.first;
  const last = user.last;
  return `${first} ${last}`;
}
//good
function getFullName51Good(user) {
  const { first, last } = user;
  return `${first} ${last}`;
}
//best
function getFullName51Best({ first, last }) {
  return `${first} ${last}`;
}
//better than best
const getFullName51BetterThanBest = ({ first, last }) => `${first} ${last}`;

//5.2 Use array destructuring
function f52() {
  const arr = [1, 2, 3, 4];
  //bad
  const firstBad = arr[0];
  const secondBad = arr[1];
  //good
  const [firstGood, secondGood] = arr;
}

//5.3 Use object destructuring for multiple return values, not array destructuring
function f53() {
  //bad
  function processInputBad(input) {
    //then a miracle occurs
    return [leftB, right, topB, bottom];
  }
  //the caller needs to think about the order of return data
  const [leftB, __, topB] = processInputBad(input);
  //good
  function processInputGood(input) {
    //then a miracle occurs
    return { leftG, rightB, topG, bottomG };
  }
  //the caller selects only the data they need
  const { leftG, topG } = processInputGood(input);
}

//7.1 USe named function expression instead of function declarations
//Why? Function declaration are hoisted, which means that it's easy - too easy - to reference the function before it is defined in the file. This harms readability and maintainability. If you find that a function's definition is large or complex enough that it is interfering with understanding the rest of the file, the perhaps it's time to extract it to its own module! Don't forget to explicitly name the expression, regardless of whether or not the name is inferred from the containing variable (which is often the case in modern browsers or when using compilers such as Babel). This eliminates any assumptions made about the Error's call stack
function f71() {
  //bad
  function fooBad() {}
  //bad
  const fooBad = function () {};
  //good
  //lexical name distinguished from the variable-referenced invocation(s)
  const short = function someSuperLongUniqueDescriptiveNamedOfFoo() {};
}

//7.3 Never declare a function in a non-function block (if, while, etc). Assign the function to a variable instead. Browsers will allow you to do it, but they all interpret it differently, which is bad news bears

//7.4 Note: ECMA-262 defines a block as a list of statements. A function declaration is not a statement

//7.5 Never name a parameter "arguments". This will take precedence over the "arguments" object that is given to every function scope

//7.6 Never use "arguments", opt to use rest syntax ... instead.
//Why? ... is explicit about which arguments you want to pulled. Plus, rest arguments are a real Array, and not merely Array-like like "arguments"
//function concatenateAll(...args){}

//7.7 Use default parameter syntax rather than mutating function arguments
//function handleThings(opts = {}){}

//7.8 Avoid side effects with default parameters
//Why? They are confusing to reason about
//bad
//function count(a=b++){}
//If I read this piece of shit, I will be dead

//7.9 Always put default parameters last
//function handleThings(name,opts={}){}

//7.10 Never use the Function constructor to create a new function
//Why? Creating a function in this way evaluates a string similarly to eval(), which opens vulnerabilities
//bad
// const subtract = Function('a', 'b', 'return a-b');

//7.12 Never mutate parameters
//Why? Manipulating objects passed in as parameters can cause unwanted variable side effects in the original caller.
const f712 = function exampleOf712() {
  //bad
  const bad = function badExample(obj) {
    obj.key = 1;
  };
  //good
  const good = function goodExample(obj) {
    const key = Object.prototype.hasOwnProperty.call(obj, 'key') ? obj.key : 1;
  };
};

//7.13 Never reassign parameters
const f713 = function neverReassignParameters(a) {
  const bad0 = function (a) {
    a = 1;
  };
  const bad1 = function (a) {
    if (!a) {
      a = 1;
    }
  };
  const good0 = function (a) {
    const b = a || 1;
  };
  const good1 = function (a = 1) {};
};

//7.14 Prefer the use of the spread syntax ... to call variadic functions
//Why? It's cleaner, you don't need to supply a context, and you can not easily compose "new" with "apply"
const f714 = function () {
  const arr = [1, 2, 3, 4, 5, 6];
  //bad
  console.log.apply(console, x);

  //good
  console.log(...arr);

  //bad
  new (Function.prototype.bind.apply(Data, [null, 2016, 8, 5]))();

  //good
  new Date(...[2016, 8, 5]);
};

//9.1 Always use "class". Avoid manipulating "prototype" directly
//Why? "class" syntax in more concise and easier to reason about.
const f91 = function examples() {
  //bad
  const bad = function () {
    function Queue(contents = []) {
      this.queue = [...contents];
    }
    Queue.prototype.pop = function () {
      return this.queue.splice(0, 1)[0];
    };
  };

  //good
  const good = function () {
    class Queue {
      constructor(contents = []) {
        this.queue = [...contents];
      }
      pop() {
        return this.queue.splice(0, 1)[0];
      }
    }
  };
};

//9.2 Use "extends" for inheritance
//Why? It is a built-in way to inherit prototype functionality without breaking "instanceof"
const f92 = function () {
  class Queue {}
  class PeekableQueue extends Queue {
    peek() {
      return this.queue[0];
    }
  }
};

//9.3 Methods can return "this" to help with method chaining
const f93 = function () {
  //good
  class Jedi {
    jump() {
      this.jumping = true;
      return this;
    }
    setHeight(value) {
      this.height = value;
      return this;
    }
  }
  const jedi0 = new Jedi();

  jedi0.jump().setHeight(100).name = 'hoang minh'; //this is insane
};

//9.4 It's okay to write a custom "toString()" method, just to make sure it works successfully and causes no side effects
const f94 = function () {
  class Jedi {
    constructor(options = {}) {
      this.name = options.name || 'no name';
    }
    getName() {
      return this.name;
    }
    toString() {
      return `Jedi - ${this.getName()}`;
    }
  }
};

//9.5 Avoid duplicate class members
//Why? Duplicate class member declarations will silently prefer the last one - having duplicates is almost certainly a bug //true
const f95 = function () {
  //bad
  class Foo {
    bar() {
      return 1;
    }
    bar() {
      return 2;
    }
    //who is going to write this piece of shit?
  }
};

//9.7 Class methods should use "this" or be made into a static method unless an external library or framework requires specific non-static methods. Being an instance method should indicate that it behaves differently based on properties of the receiver
const f97 = function () {
  //bad
  class Foo {
    bar() {
      console.log('bar');
    }
  }
  //good - "this" is used
  class Foo {
    bar() {
      console.log(this.bar);
    }
  }
  //good - constructor is exempt
  class Foo {
    constructor() {
      //...
    }
  }
  //good - static methods aren't expected to use this
  class Foo {
    static bar() {
      console.log('bar');
    }
  }
};

//10.2 Do not use wildcard imports
//Why? This makes sure you have a single default export
const f102 = function () {
  //bad
  // import * as SomeModule from './someModule.js';
  //good
  // import SomeModule from "./someModule.js"
};

//10.5 Do not export mutable binding
//Why? Mutation should be avoided in general, but in particular when exporting mutable bindings. While this technique may be needed for some special cases, in general, only constant references should be exported
const f105 = function () {
  //bad
  let foo = 3;
  // export {foo}
  //good
  const boo = 3;
  // export {boo}
};

//10.6 In modules with a single export, prefer default export over named export.
//Why? To encourage more files that only ever export one thing, which is better for readability and maintainability

//10.7 put all "import" above non-import statements

//10.8 Multiline imports should be indented just like multiline array and object literals
//Why? The curly braces follow the same indentation rules as every other curly brace block in the style guide, as do the trailing commas

//10.9 Disallow Webpack loader syntax in module import statements
//Why?Since using Webpack syntax in the imports couples the code to a module bundle. Prefer using the loader syntax in 'webpack.config.js'

//10.10 Do not include JavaScript filename extensions
//Why? Including extensions inhibits refactoring, and inappropriately hardcodes implementation details of the module you're importing in every consumer
//bad
//import foo from "./foo.js";
//import bar from "./bar.jsx";
//import baz from "./baz/index.jsx";

//good
//import foo from "./foo"
//import bar from "./bar"
//import baz from "./baz"

//11.1 Don't use iterators. Prefer JavaScript's higher-order functions instead of loops like "for-in" or "for-of"
//Why? This enforces our immutable rule. Dealing with pure functions that return values is easier to reason about than side effects
//Use "map()"/ "every()"/ "filter()"/ "find()"/ "findIndexOf"/ "reduce()"/ "some()"/ ... to iterate over arrays, and "Object.keys()"/ "Object.values()"/ "Object.entries()" to produce arrays so you can iterate over objects

//11.2 Don't use generators for now
//Why? They don't transpile well to ES5

//11.3 If you must use generators, or if you disregard our advice, make sure their function signature is spaced properly
//Why? function and * are part of the same conceptual keyword - * is not a modifier for function, function* is a unique construct, different from function

//12.3 Use exponentiation operator "**" when calculating exponentiations
const f123 = function () {
  const bad = Math.pow(2, 10);
  const good = 2 ** 10;
};

//13.1 Always use "const" or "let" to declare variables. Not doing so will result in global variables. We want to avoid polluting the global namespace. Captain Planet warned us of that

//13.2 Use one "const" or "let" declaration per variable or assignment
//Why? It's easier to add new variable declarations this way, and you never have to worry about swapping out a ";" for a "," or introducing punctuation-only diffs. You can also step through each declaration with the debugger, instead of jumping through all of them at once

//13.3 Group all your "const"s and "let"s
//Why? This is helpful when later on you might need to assign a variable depending on one of the previously assigned variables

//13.4 assign variables where you need them, but place them in a reasonable place.
//Why? "let" and "const" are block scoped and not function scoped

//13.6 Avoid using unary increments and decrements "++","--"
//Why? Per the eslint documentation, unary increment and decrement statements are subject to automatic semicolon insertion and can cause silent errors with incrementing or decrementing values within an application. It is also more expressive to mutate you values with statement like "num+=1" instead of "num++" or "num--". Disallowing unary increment and decrement statements also prevents you from pre-incrementing/pre-decrementing values unintentionally which can also cause unexpected behavior in you programs

//15.1 Use strict compare ===, !==

//15.2 Conditional statements such as the if statement evaluate their expression using coercion with the "ToBooLean" abstract method and always follow these simple rules:
//Objects evaluate to true
//Undefined evaluate to false
//Null evaluate to false
//Booleans evaluate to the value of the boolean
//Numbers evaluate to false if +0, -0, or NaN, otherwise true
//Strings evaluate to false if an empty string "", otherwise true

//15.3 Use shortcuts for booleans, but explicit comparisons for strings and numbers

//18.3 Use multiline comment with /* */

/*
* this is a multi line comment
*bla bla
this is so easy to read
*/
