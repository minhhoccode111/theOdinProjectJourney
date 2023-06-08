//SOLID The first 5 principles of object oriented design with javaScript
//SOLID stand for
//"S"- Single responsibility principle
//"O"- open/closed principle
//"L"- Liskov substitution principle
//"I"- Interface segregation principle
//"D"- Dependency inversion principle

//SINGLE RESPONSIBILITY PRINCIPLE
//A class should have one and only one reason to change, meaning that a class should only have one job.

//For example, say we have some shapes and we wanted to sum all the areas of the shapes. Well this is pretty simple, right?

const circle = (radius) => {
  const proto = {
    type: "Circle",
    //some code
  };
  return Object.assign(Object.create(proto), {
    radius,
    area: Math.PI * radius * radius,
  });
};

const square = (side) => {
  const proto = {
    type: "Square",
    //some code
  };
  return Object.assign(Object.create(proto), { side, area: side * side });
};

//First we create our shapes factory functions and setup the required parameters

//Next we move on by creating the areaCalculator factory function and then write up our logic to sum up the area of all provided shapes.

var areaCalculator = (shapes) => {
  const proto = {
    sum: function () {
      return this.shapes.reduce((total, current) => {
        return total + current.area;
      }, 0);
    },
    output: function () {
      return `
      <h1>Sum of the areas of provided shapes: ${this.sum()}</h1>`;
    },
  };
  return Object.assign(Object.create(proto), { shapes });
};

//To use the areaCalculator factory function, we simply call the function and pass in an array of shapes, and display the output at the bottom of the page.

const shapes = [circle(5), square(5), circle(10), square(10)];

const areas = areaCalculator(shapes);
console.log(areas.output()); //<h1>Sum of the areas of provided shapes: 517.6990816987242</h1>

//The problem with the output method is that the areaCalculator handles the logic to output the data. Therefore, what if the user wanted to output the data as json or something else?
//All of the logic would be handled by the areaCalculator factory function, this is what "Single Responsibility Principle" frowns against; the areaCalculator factory function should only sum the areas of provided shapes, it should not care whether the user wants JSON or HTML
//So, to fix this you can create an SumCalculatorOutput factory function and use this to handle whatever logic you need on how the sum areas of all provided shapes are displayed
//The sumCalculatorOutput factory function would work liked this:

const sumCalculatorOutput = (obj) => {
  const proto = {
    JSON: function () {
      //return output in JSON
      return "return in JSON";
    },
    HTML: function () {
      //return output in HTML
      return `<h1>Sum of the areas of provided shapes: ${obj.sum()}</h1>`;
    },
    number: function () {
      //return output in number
      return obj.sum();
    },
  };
  return Object.assign(Object.create(proto), { obj });
};

const output = sumCalculatorOutput(areas);

console.log(output.HTML());
console.log(output.JSON());
console.log(output.number());

//Now, whatever logic you need to output the data to the used is now handled by the sumCalculatorOutput factory function

//OPEN-CLOSE PRINCIPLE
//Object or entities should be open for extension, but closed for modification

//Open for extension means that we should be able to add new features or components to the application without breaking existing code.

//Closed for modification means that we should not introduce breaking changes to existing functionality, because that would force you to refactor a lot of existing code

//In simpler words, means that a class or factory function in out case, should be easily extendable without modifying the class or function itself. Let's look at the areaCalculator factory function, especially it's sum method.

var areaCalculator = (shapes) => {
  const proto = {
    sum: function () {
      const area = [];
      for (let shape of this.shapes) {
        if (shape.type === "Circle") {
          area.push(Math.PI * shape.radius * shape.radius);
        } else if (shape.type === "Square") {
          area.push(shape.side * shape.side);
        }
      }
      return area.reduce((total, current) => total + current, 0);
    },
  };
};

//If we wanted the sum method to be able to sum the areas of more shapes, we would have to add more if/else blocks and that goes against the OPEN-CLOSE principle

//A way we can make this sum method better is to remove the logic to calculate the area of each shape out of the sum method and attach it to the shape's factory functions.
