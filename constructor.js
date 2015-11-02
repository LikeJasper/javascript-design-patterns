////////////////////////////////////////////////////////////////////////////////

// CONSTRUCTORS

// A constructor is a special method used to initialize a newly created object

////////////////////////////////////////////////////////////////////////////////

// 1. OBJECT CREATION

// There are three ways to create a new empty object:

var newObject1 = {};

var newObject2 = Object.create(Object.prototype);

var newObject3 = new Object();

// There are four ways to assign keys and values to an object:

var newObject = newObject1;

// i. Dot syntax

newObject.someKey = "Hello world";

var value1 = newObject.someKey; // Get value using dot syntax

// ii. Square bracket syntax

newObject['someKey'] = "Hello world";

var value2 = newObject['someKey']; // Get value using square bracket syntax

// iii. Object.defineProperty

Object.defineProperty(newObject, 'definePropertyKey', {
  value: "for more control of the property's behavior",
  writable: true,
  enumerable: true,
  configurable: true
});

var defineProp = function (obj, key, value) { // Shortcut function
  config = {
    value: value,
    writable: true,
    enumerable: true,
    configurable: true
  };
  Object.defineProperty(obj, key, config);
};

var person = {}; // Example usage
defineProp(person, 'name', 'will');
defineProp(person, 'age', 100);

// iv. Object.defineProperties

Object.defineProperties(newObject, {

  'definePropertiesKey': {
    value: 'Hello world',
    writable: true
  },

  'anotherDefinePropertiesKey': {
    value: 'Goodbye world',
    writable: false
  }

});

// These methods can be used for inheritance:

var programmer = Object.create(person);

defineProp(programmer, 'language', 'JavaScript');

console.log(programmer.name); // 'will'

////////////////////////////////////////////////////////////////////////////////

// 2. BASIC CONSTRUCTORS

// By simply prefixing a call to a constructor function with the keyword "new", 
// we can tell JavaScript we would like the function to behave like a 
// constructor and instantiate a new object with the members defined by that 
// function.

// Inside a constructor, the keyword _this_ references the new object that's 
// being created.

function Car (model, year) {
  this.model = model
  this.year = year

  this.toString = function () { // This function is redefined for each new Car
    return this.model + " was made in " + this.year;
  }
}

var civic = new Car("Honda Civic", 2009);
var mondeo = new Car("Ford Mondeo", 2010);

// Constructors with prototypes: Functions, like almost all objects in 
// JavaScript, contain a "prototype" object. When we call a JavaScript 
// constructor to create an object, all the properties of the constructor's 
// prototype are then made available to the new object.

function ProtoCar (model, year) {
  this.model = model
  this.year = year
}

ProtoCar.prototype.toString = function () { // This function is the same for all protoCars
    return this.model + " was made in " + this.year;
}

var merc = new ProtoCar("Mercedes Benz", 2005);
var bentley = new ProtoCar("Bentley", 1950);

// merc and bentley share a single instance of toString()
