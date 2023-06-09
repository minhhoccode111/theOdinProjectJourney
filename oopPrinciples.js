// // // //SOLID The first 5 principles of object oriented design with javaScript
// // // //SOLID stand for
// // // //"S"- Single responsibility principle
// // // //"O"- open/closed principle
// // // //"L"- Liskov substitution principle
// // // //"I"- Interface segregation principle
// // // //"D"- Dependency inversion principle

// // // //SINGLE RESPONSIBILITY PRINCIPLE
// // // //A class should have one and only one reason to change, meaning that a class should only have one job.

// // // //For example, say we have some shapes and we wanted to sum all the areas of the shapes. Well this is pretty simple, right?

// // // var circle = (radius) => {
// // //   const proto = {
// // //     type: "Circle",
// // //     //some code
// // //   };
// // //   return Object.assign(Object.create(proto), {
// // //     radius,
// // //     area: Math.PI * radius * radius,
// // //   });
// // // };

// // // var square = (side) => {
// // //   const proto = {
// // //     type: "Square",
// // //     //some code
// // //   };
// // //   return Object.assign(Object.create(proto), { side, area: side * side });
// // // };

// // // //First we create our shapes factory functions and setup the required parameters

// // // //Next we move on by creating the areaCalculator factory function and then write up our logic to sum up the area of all provided shapes.

// // // var areaCalculator = (shapes) => {
// // //   const proto = {
// // //     sum: function () {
// // //       return this.shapes.reduce((total, current) => {
// // //         return total + current.area;
// // //       }, 0);
// // //     },
// // //     output: function () {
// // //       return `
// // //       <h1>Sum of the areas of provided shapes: ${this.sum()}</h1>`;
// // //     },
// // //   };
// // //   return Object.assign(Object.create(proto), { shapes });
// // // };

// // // //To use the areaCalculator factory function, we simply call the function and pass in an array of shapes, and display the output at the bottom of the page.

// // // const shapes = [circle(5), square(5), circle(10), square(10)];

// // // const areas = areaCalculator(shapes);
// // // console.log(areas.output()); //<h1>Sum of the areas of provided shapes: 517.6990816987242</h1>

// // // //The problem with the output method is that the areaCalculator handles the logic to output the data. Therefore, what if the user wanted to output the data as json or something else?
// // // //All of the logic would be handled by the areaCalculator factory function, this is what "Single Responsibility Principle" frowns against; the areaCalculator factory function should only sum the areas of provided shapes, it should not care whether the user wants JSON or HTML
// // // //So, to fix this you can create an SumCalculatorOutput factory function and use this to handle whatever logic you need on how the sum areas of all provided shapes are displayed
// // // //The sumCalculatorOutput factory function would work liked this:

// // // const sumCalculatorOutput = (obj) => {
// // //   const proto = {
// // //     JSON: function () {
// // //       //return output in JSON
// // //       return "return in JSON";
// // //     },
// // //     HTML: function () {
// // //       //return output in HTML
// // //       return `<h1>Sum of the areas of provided shapes: ${obj.sum()}</h1>`;
// // //     },
// // //     number: function () {
// // //       //return output in number
// // //       return obj.sum();
// // //     },
// // //   };
// // //   return Object.assign(Object.create(proto), { obj });
// // // };

// // // const output = sumCalculatorOutput(areas);

// // // console.log(output.HTML());
// // // console.log(output.JSON());
// // // console.log(output.number());

// // // //Now, whatever logic you need to output the data to the used is now handled by the sumCalculatorOutput factory function

// // // //OPEN-CLOSE PRINCIPLE
// // // //Object or entities should be open for extension, but closed for modification

// // // //Open for extension means that we should be able to add new features or components to the application without breaking existing code.

// // // //Closed for modification means that we should not introduce breaking changes to existing functionality, because that would force you to refactor a lot of existing code

// // // //In simpler words, means that a class or factory function in out case, should be easily extendable without modifying the class or function itself. Let's look at the areaCalculator factory function, especially it's sum method.

// // // var areaCalculator = (shapes) => {
// // //   const proto = {
// // //     sum: function () {
// // //       const area = [];
// // //       for (let shape of this.shapes) {
// // //         if (shape.type === "Circle") {
// // //           area.push(Math.PI * shape.radius * shape.radius);
// // //         } else if (shape.type === "Square") {
// // //           area.push(shape.side * shape.side);
// // //         }
// // //       }
// // //       return area.reduce((total, current) => total + current, 0);
// // //     },
// // //   };
// // // };

// // // //If we wanted the sum method to be able to sum the areas of more shapes, we would have to add more if/else blocks and that goes against the OPEN-CLOSE principle

// // // //A way we can make this sum method better is to remove the logic to calculate the area of each shape out of the sum method and attach it to the shape's factory functions.

// // // var square = (side) => {
// // //   const proto = {
// // //     type: "Square",
// // //     //I've already have a specific implementation of the area method for square above, so this is just a repeatitive code
// // //     area: function () {
// // //       return side * side;
// // //     },
// // //   };
// // //   return Object.assign(Object.create(proto), { side });
// // // };

// // // //The same thing should be done for the circle factory function, an area method should be added. Now, to calculate the sum of any shape provided should be as simple as:
// // // var sumCalculatorOutput_0 = (obj) => {
// // //   const proto = {
// // //     sum: function () {
// // //       let result = 0;
// // //       for (const shape of obj.shapes) {
// // //         result += shape.area();
// // //       }
// // //       return result;
// // //     },
// // //   };
// // // };

// // // //Now we create another shape class and pass it in when calculating the sum without breaking our code. However, now another problem arises, how do we know that the object passed into the areaCalculator is actually a shape or if the shape has a method named area?

// // // //Function composition to the rescue!
// // // //First we create shapeInterface factory function, as we are talking about interfaces, out shapeInterface will be as abstracted as an interface, using function composition

// // // var shapeInterface = (state) => {
// // //   return { type: "shapeInterface", area: () => state.area(state) };
// // // };

// // // //Then we implement it to our square factory function

// // // var square = (side) => {
// // //   const proto = {
// // //     side,
// // //     type: "Square",
// // //     area: (args) => args.side * args.side,
// // //   };
// // //   const basics = shapeInterface(proto);
// // //   const composite = Object.assign({}, basics);
// // //   return Object.assign(Object.create(composite), { side });
// // // };

// // // const s = square(5);
// // // console.log("OBJ\n", s);
// // // console.log("PROTO\n", Object.getPrototypeOf(s));
// // // s.area();
// // // // OBJ
// // // //  {side: 5}
// // // // oopPrinciples.js:167 PROTO
// // // //  {type: 'shapeInterface', area: ƒ}

// // // //Note: The "Object.create()" method creates a new object, using an existing object as the prototype of the newly created object.
// // // //Ex: Object.create(proto, [propertiesObject])

// // // //Note: The "Object.assign()" is used to copy the values of all enumerable properties from one or more source objects to a target object. It returns the target object
// // // //Ex: Object.assign(target, ...sources)

// // // //In our areaCalculator sum method we can check if the shapes provided are actually types of shapeInterface, otherwise we throw an exception:

// // // // sum() {
// // // //   const area = []
// // // //   for (shape of this.shapes) {
// // // //     if (Object.getPrototypeOf(shape).type === 'shapeInterface') {
// // // //        area.push(shape.area())
// // // //      } else {
// // // //        throw new Error('this is not a shapeInterface object')
// // // //      }
// // // //    }
// // // //    return area.reduce((v, c) => c += v, 0)
// // // // }

// // // //And again, since JavaScript doesn't have support for interfaces like typed languages the example above demonstrates how we can simulate it, but more than simulating interfaces, what we are doing is using closures and function composition.

// // // //LISKOV SUBSTITUTION PRINCIPLE
// // // //All this is stating is that every subclass/derived class should be substitutable for their base/parent class

// // // //In other words, as simple as that, a subclass should override the parent class methods in a way that does NOT BREAK FUNCTIONALITY FROM A CLIENT'S POINT OF VIEW

// // // //Still making use of out areaCalculator factory function, say we have a volumeCalculator factory function that extends the areaCalculator factory function, and in our case for extending an object without breaking changes in ES6 we do it by using Object.assign() and the Object.getPrototypeOf()

// // // var volumeCalculator = (s) => {
// // //   const proto = {
// // //     type: "volumeCalculator",
// // //   };
// // //   const areaCalProto = Object.getPrototypeOf(areaCalculator());
// // //   const inherit = Object.assign({}, areaCalProto, proto);
// // //   return Object.assign(Object.create(inherit), { shape: s });
// // // };

// // // //INTERFACE SEGREGATION PRINCIPLE
// // // //A client should never be forced to implement an interface that it doesn't use or clients shouldn't be forced to depend on methods they do not use

// // // //Imagine you have a toy that has different buttons. Each button has a specific function. You only use the buttons you need.
// // // //In code, this means clients (classes or objects) should not be forced to depend on interface they don't use
// // // //Ex:
// // // //Bad: A monolithic interface with unnecessary methods
// // // var Toy = class {
// // //   playMusic() {
// // //     //do something
// // //   }
// // //   changeColor() {
// // //     //do something
// // //   }
// // //   moveForward() {
// // //     //do something
// // //   }
// // // };

// // // //Good: smaller interface with specific methods

// // // var MusicPlayer = class {
// // //   playMusic() {
// // //     //do something
// // //   }
// // // };

// // // var ColorChanger = class {
// // //   changeColor() {
// // //     //do something
// // //   }
// // // };

// // // var Toy = class {
// // //   constructor(musicPlayer, colorChanger) {
// // //     this.musicPlayer = musicPlayer;
// // //     this.colorChanger = colorChanger;
// // //   }
// // //   moveForward() {
// // //     //do something
// // //   }
// // // };

// // // //DEPENDENCY INVERSION PRINCIPLE
// // // //Entities must depend on abstractions not on concretions. It states that the high level module must not depend on the low level module, but they should depend on abstractions

// // // //Imagine you have a toy that requires batteries to work. You can replace the batteries with different brands as long as they meet the toy's power requirements

// // // //In code, this means higher-level modules/classes should depend on abstractions (interface) rather than concrete implementations

// // // //Ex
// // // //Bad: Higher-level class directly depends on a low-level class
// // // var Battery = class {};

// // // var Toy = class {
// // //   constructor() {
// // //     this.battery = new Battery(); //bad
// // //   }
// // // };

// // // //Good: Higher-level class depends on an abstraction (interface)
// // // var Toy = class {
// // //   constructor(battery) {
// // //     this.battery = battery;
// // //   }
// // // };

// // // var Battery = class {
// // //   //something here
// // // };

// // const shapeInterface = (state) => {
// //   return {
// //     type: "ShapeInterface",
// //     area: function () {
// //       return state.area(state);
// //     },
// //   };
// // };
// // const circle = (r) => {
// //   const proto = {
// //     r,
// //     type: "Circle",
// //     area: function (protoItself) {
// //       return Math.PI * Math.pow(protoItself.r, 2);
// //     },
// //   };
// //   const basics = shapeInterface(proto);
// //   const composite = Object.assign({}, basics);
// //   return Object.assign(Object.create(composite), { r });
// // };
// // const square = (l) => {
// //   const proto = {
// //     l,
// //     type: "Square",
// //     area: function (protoItself) {
// //       return Math.pow(protoItself.l, 2);
// //     },
// //   };
// //   const basics = shapeInterface(proto);
// //   //This basic variable call shapeInterface function and pass in proto object as an argument, then shapeInterface function will return an object which has property type:"ShapeInterface" and method named area and this method will return another area method (but this time area is a method of the state argument we pass in, but we pass the proto object as an argument so now we can access to proto object through closure) which take an argument and access that argument.l itself (so in this case we keep passing proto object and the method can access proto object's property l to use it and calculate area of itself)
// //   const composite = Object.assign({}, basics);
// //   //and now we copy all variable from nasics object (which has 1 property is ShapeInterface and 1 method return the area of argument we passed in (in this case is proto))
// //   return Object.assign(Object.create(composite), { l });
// //   //then we return an object which has a prototype is composite we just create and a specific property named l (in this case has value equal to the argument we passed in this square function)
// // };
// // const areaTotal = (shapesArr) => {
// //   const proto = {
// //     sum: function () {
// //       return this.shapesArr.reduce((total, current) => {
// //         if (Object.getPrototypeOf(current).type === "ShapeInterface") {
// //           total + current.area();
// //         } else {
// //           throw new Error("This is not a ShapeInterface object");
// //         }
// //       }, 0);
// //     },
// //   };
// //   return Object.assign(Object.create(proto), { shapesArr });
// // };
// // const shapes = [circle(5), circle(15), square(5), square(15), 10];
// // const areaTotalOutput = (shapesObj) => {
// //   const proto = {
// //     HTML: function () {
// //       return `Returning ${shapesObj.sum()} in HTML`;
// //     },
// //     JSON: function () {
// //       return `Returning ${shapesObj.sum()} in JSON`;
// //     },
// //     NUMBER: function () {
// //       return shapesObj.sum();
// //     },
// //   };
// //   return Object.assign(Object.create(proto), shapesObj);
// // };
// let arrP = Array.from(document.querySelectorAll("p"));
// arrP.map((p) => {
//   let text = p.textContent.split(" ");
//   text = text.reduce((total, word) => {
//     switch (word) {
//       case "prominent":
//         word = "nổi bật";
//         break;
//       case "specifications":
//         word = "đặc tả";
//         break;
//       case "examine":
//         word = "kiểm tra";
//         break;
//       case "primarily":
//         word = "chủ yếu";
//         break;
//       case "clarity":
//         word = "rõ ràng";
//         break;
//       case "appropriate":
//         word = "phù hợp";
//         break;
//       case "operate":
//         word = "hoạt động";
//         break;
//       case "temporarily":
//         word = "tạm thời";
//         break;
//       case "variation":
//         word = "biến thể";
//         break;
//       case "observer":
//         word = "người quan sát";
//         break;
//       case "register":
//         word = "đăng ký";
//         break;
//       case "notified":
//         word = "thông báo";
//         break;
//       case "observables":
//         word = "có thể quan sát";
//         break;
//       case "registration":
//         word = "đăng ký";
//         break;
//       case "mediator":
//         word = "trung gian";
//         break;
//       case "isolates":
//         word = "cô lập";
//         break;
//       case "analogy":
//         word = "tương tự";
//         break;
//       case "mechanism":
//         word = "cơ chế";
//         break;
//       case "interval":
//         word = "khoảng thời gian";
//         break;
//       case "sustainable":
//         word = "bền vững";
//         break;
//       case "extensible":
//         word = "mở rộng";
//         break;
//       default:
//         // Word not found, keep it as is
//         break;
//     }
//     return total + word + " ";
//   }, "");
//   p.textContent = text;
// });
