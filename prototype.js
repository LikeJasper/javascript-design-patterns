/*global
  $
*/

////////////////////////////////////////////////////////////////////////////////

// PROTOTYPES

// We can think of the prototype pattern as being based on prototypal
// inheritance where we create objects which act as prototypes for other
// objects. The prototype object itself is effectively used as a blueprint for
// each object the constructor creates. If the prototype of the constructor
// function used contains a property called name for example (as per the code
// sample lower down), then each object created by that same constructor will
// also have this same property.

// The reality is that prototypal inheritance avoids using classes altogether.
// There isn't a "definition" object nor a core object in theory. We're simply
// creating copies of existing functional objects.

////////////////////////////////////////////////////////////////////////////////

// 1. BASIC PROTOTYPE

var myCar = {

  name: "Ford Escort",

  drive: function () {
    console.log("Weee, I'm driving!");
  },

  panic: function () {
    console.log("Wait. How do you stop?");
  }
};

// Use Object.create to instantiate a new car

var yourCar = Object.create(myCar);

// Now we can see that one is a prototype of the other
console.log(yourCar.name); // "Ford Escort"

////////////////////////////////////////////////////////////////////////////////

// 2. DIFFERENTIAL INHERITANCE

var vehicle = {
  getModel: function () {
    console.log("The model of this vehicle is: " + this.model);
  }
};

var car = Object.create(vehicle, {

  'id': {
    value: MY_GLOBAL.nextId(),
    // writable:false, configurable:false by default
    enumerable: true
  },

  'model': {
    value: "Ford",
    enumerable: true
  }

});

// Simulation without using Object.create

var vehiclePrototype = {
  init: function (carModel) {
    this.model = carModel;
  },

  getModel: function () {
    console.log("The model of this vehicle is: " + this.model);
  }
};

function vehicle(model) {
  function F() {}
  F.prototype = vehiclePrototype;

  var f = new F();

  f.init(model);
  return  f;
}

var car = vehicle("Ford Escort");
car.getModel(); // "Ford Escort"

// Alternative implementation

var beget = (function () {
  function F() {}

  return function (proto) {
    F.prototype = proto;
    return new F();
  };
}());
