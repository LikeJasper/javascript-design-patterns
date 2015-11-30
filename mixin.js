/*global
  $
*/

////////////////////////////////////////////////////////////////////////////////

// MIXINS

// Mixins are classes which offer functionality that can be easily inherited
// by a sub-class or group of sub-classes for the purpose of function re-use.

// Sub-classing is a term that refers to inheriting properties for a new
// object from a base or superclass object. In traditional object-oriented
// programming, a class B is able to extend another class A. Here we consider
// A a superclass and B a subclass of A. As such, all instances of B inherit
// the methods from A. B is however still able to define its own methods,
// including those that override methods originally defined by A.

// In JavaScript, we can look at inheriting from Mixins as a means of
// collecting functionality through extension. Each new object we define has a
// prototype from which it can inherit further properties. Prototypes can
// inherit from other object prototypes but, even more importantly, can define
// properties for any number of object instances.

////////////////////////////////////////////////////////////////////////////////

// 1. SUB-CLASSING

var Person = function(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.gender = "male";
};

// create a new instance of Person
var clark = new Person("Clark", "Kent");

// define a subclass constructor for "Superhero"
var Superhero = function(firstName, lastName, powers) {

  // Invoke the superclass constructor on the new object then use .call() to
  // invoke the constructor as a method of the object to be initialized
  Person.call(this, firstName, lastName);

  // Finally, store their powers, a new array of traits to found in a normal
  // "Person"
  this.powers = powers;
};

Superhero.prototype = Object.create(Person.prototype);
var superman = new Superhero("Clark", "Kent", ["flight", "heat-vision"]);
console.log(superman); // Person attributes plus powers

////////////////////////////////////////////////////////////////////////////////

// 2. BASIC MIXIN

var myMixins = {

  moveUp: function() {
    console.log("move up");
  },
  moveDown: function() {
    console.log("move down");
  },
  stop: function() {
    console.log("stop!");
  }

};

// A skeleton carAnimator constructor
function CarAnimator() {
  this.moveLeft = function() {
    console.log("move left");
  };
}

// A skeleton personAnimator constructor
function PersonAnimator() {
  this.moveRandomly = function() {};
}

// Extend both constructors with our Mixin using underscore's _.extend()
_.extend(CarAnimator.prototype, myMixins);
_.extend(PersonAnimator.prototype, myMixins);

// Create a new instance of carAnimator
var myAnimator = new CarAnimator();
myAnimator.moveLeft(); // 'move left'
myAnimator.moveDown(); // 'move down'
myAnimator.stop(); // 'stop!'

////////////////////////////////////////////////////////////////////////////////

// 3. MIXIN WITHOUT DUPLICATION

// Define a simple Car constructor
var Car = function(settings) {
  this.model = settings.model || "no model provided";
  this.color = settings.color || "no colour provided";
};

// Mixin
var Mixin = function() {};

Mixin.prototype = {

  driveForward: function() {
    console.log("drive forward");
  },

  driveBackward: function() {
    console.log("drive backward");
  },

  driveSideways: function() {
    console.log("drive sideways");
  }
};

// Extend an existing object with a method from another
function augment(receivingClass, givingClass) {

  // only provide certain methods
  if (arguments[2]) {
    for (var i=2, len=arguments.length; i<len; i++) {
      receivingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]];
    }
  }
  // provide all methods
  else {
    for (var methodName in givingClass.prototype) {
      // check for method name clash
      if (!Object.hasOwnProperty.call(receivingClass.prototype, methodName)) {
        receivingClass.prototype[methodName] = givingClass.prototype[methodName];
      }
      // Alternatively check prototype chain as well
      // if (!receivingClass.prototype[methodName]) {
      //   receivingClass.prototype[methodName] = givingClass.prototype[methodName];
      // }
    }
  }
}

// Augment the ar constructor to include "driveForward" and "driveBackward"
augment(Car, Mixin, "driveForward", "driveBackward");

// Create a new Car
var myCar = new Car({
  model: "Ford Escort",
  color: "blue"
});

// Test to make sure we now have access to the methods
myCar.driveForward(); // 'drive forward'
myCar.driveBackward(); // 'drive backward'

// We can also augment Car to include all functions from our mixin by not
// explicitly listing a selection of them
augment(Car, Mixin);

var mySportsCar = new Car({
  model: "Porsche",
  color: "red"
});

mySportsCar.driveSideways(); // 'drive sideways'
