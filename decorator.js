/*global
  $
*/

////////////////////////////////////////////////////////////////////////////////

// DECORATORS

// Decorators are a structural design pattern that aim to promote code re-use.
// Similar to Mixins, they can be considered another viable alternative to
// object sub-classing.

// Classically, Decorators offered the ability to add behaviour to existing
// classes in a system dynamically. The idea was that the decoration itself
// wasn't essential to the base functionality of the class, otherwise it would
// be baked into the superclass itself.

// The Decorator pattern isn't heavily tied to how objects are created but
// instead focuses on the problem of extending their functionality. Rather
// than just relying on prototypal inheritance, we work with a single base
// object and progressively add decorator objects which provide the additional
// capabilities.

////////////////////////////////////////////////////////////////////////////////

// 1. SIMPLE DECORATOR

// A vehicle constructor
function Vehicle(vehicleType) {

  // some sane defaults
  this.vehicleType = vehicleType || "car";
  this.model = "default";
  this.license = "00000-000";
}

// Test instance for a basic vehicle
var testInstance = new Vehicle("car");
console.log(testInstance);

// Outputs:
// vehicle: car, model: default, license: 00000-000

// Create a new instance of vehicle, to be decorated
var truck = new Vehicle("truck");

// New functionality we're decorating vehicle with
truck.setModel = function(modelName) {
  this.model = modelName;
};

truck.setColor = function(color) {
  this.color = color;
};

// Test the value setters and value assignment works correctly
truck.setModel("CAT");
truck.setColor("blue");

console.log(truck);

// Outputs:
// vehicle: truck, model: CAT, color: blue

// Demonstrate "vehicle" is still unaltered
var secondInstance = new Vehicle("car");
console.log(secondInstance);

// Outputs:
// vehicle: car, model: default, license: 00000-000

////////////////////////////////////////////////////////////////////////////////

// 2. MULTIPLE DECORATORS

// The constructor to decorate
function MacBook() {
  this.cost = function() {return 997;};
  this.screenSize = function() {return 11.6;};
}

// Decorator 1
function memory(macbook) {
  var v = macbook.cost();
  macbook.cost = function() {
    return v + 75;
  };
}

// Decorator 2
function engraving(macbook) {
  var v = macbook.cost();
  macbook.cost = function() {
    return v + 200;
  };
}

// Decorator 3
function insurance(macbook) {
  var v = macbook.cost();
  macbook.cost = function() {
    return v + 250;
  };
}

var mb = new MacBook();
memory(mb);
engraving(mb);
insurance(mb);

// Outputs: 1522
console.log(mb.cost());

// Outputs: 11.6
console.log(mb.screenSize());

////////////////////////////////////////////////////////////////////////////////

// 3. INTERFACES

// An interface is a way of defining the methods an object should have,
// however, it doesn't actually directly specify how those methods should be
// implemented.

// Constructor
var Interface = function (name, methods) {
  if (arguments.length != 2) {
    throw new Error("Interface constructor called with " + arguments.length + "arguments, but expected exactly 2.");
  }
  this.name = name;
  this.methods = [];
  for (var i = 0, len = methods.length; i < len; i++) {
    if (typeof methods[i] !== 'string') {
      throw new Error("Interface constructor expects method names to be " + "passed in as a string.");
    }
    this.methods.push(methods[i]);
  }
};

// Static class method.
Interface.ensureImplements = function (object) {
  if (arguments.length < 2) {
    throw new Error("Function Interface.ensureImplements called with " + arguments.length + "arguments, but expected at least 2.");
  }
  for (var i = 1, len = arguments.length; i < len; i++) {
    var interface = arguments[i];
    if (interface.constructor !== Interface) {
      throw new Error("Function Interface.ensureImplements expects arguments" + "two and above to be instances of Interface.");
    }
    for (var j = 0, methodsLen = interface.methods.length; j < methodsLen; j++) {
      var method = interface.methods[j];
      if (!object[method] || typeof object[method] !== 'function') {
        throw new Error("Function Interface.ensureImplements: object " + "does not implement the " + interface.name + " interface. Method " + method + " was not found.");
      }
    }
  }
};

// Create interfaces using a pre-defined Interface constructor that accepts an
// interface name and skeleton methods to expose. In this example summary()
// and placeOrder() represent functionality the interface should support.

var reminder = new Interface("List", ["summary", "placeOrder"]);

var properties = {
  name: "Remember to buy the milk",
  date: "05/06/2016",
  actions: {
    summary: function() {
      return "Remember to buy milk, we're almost out!";
    },
    placeOrder: function() {
      return "Ordering milk from your local grocery store";
    }
  }
};

// Now create a constructor implementing the above properties and methods

function Todo(config) {

  // State the methods we expect to be supported as well as the Interface
  // instance being checked against
  Interface.ensureImplements(config.actions, reminder);

  this.name = config.name;
  this.methods = config.actions;

}

// Create a new instance of our Todo constructor
var todoItem = new Todo(properties);

// Finally test to make sure these function correctly

console.log(todoItem.methods.summary());
console.log(todoItem.methods.placeOrder());

// Outputs:
// Remember to buy milk, we're almost out!
// Order milk from your local grocery store

////////////////////////////////////////////////////////////////////////////////

// 4. ABSTRACT DECORATORS

var Macbook = new Interface("Macbook", [
  "addEngraving",
  "addParallels",
  "add4GBRam",
  "add8GBRam",
  "addCase"
]);

// A Macbook Pro might thus be represented as follows:
var MacbookPro = function() {
  // implements Macbook
};

MacbookPro.prototype = {
  addEngraving: function() {
  },
  addParallels: function() {
  },
  add4GBRam: function() {
  },
  add8GBRam: function() {
  },
  addCase: function() {
  },
  getPrice: function() {
    // Base price
    return 900.00;
  }
};

// Macbook decorator abstract decorator class
var MacbookDecorator = function(macbook) {
  Interface.ensureImplements(macbook, Macbook);
  this.macbook = macbook;
};

MacbookDecorator.prototype = {
  addEngraving: function() {
    return this.macbook.addEngraving();
  },
  addParallels: function() {
    return this.macbook.addParallels();
  },
  add4GBRam: function() {
    return this.macbook.add4GBRam();
  },
  add8GBRam: function() {
    return this.macbook.add8GBRam();
  },
  addCase: function() {
    return this.macbook.addCase();
  },
  getPrice: function() {
    return this.macbook.getPrice();
  }
};

// First, define a way to extend an object a with the properties in object b.
// We'll use this shortly!
function extend(a, b) {
  for (var key in b) {
    if (b.hasOwnProperty(key)) {
      a[key] = b[key];
    }
  }
  return a;
}

var CaseDecorator = function(macbook) {
  this.macbook = macbook;
};

// Let's now extend (decorate) the CaseDecorator with a MacbookDecorator
extend(CaseDecorator, MacbookDecorator);

CaseDecorator.prototype.addCase = function() {
  return this.macbook.addCase() + "Adding case to macbook";
};

CaseDecorator.prototype.getPrice = function() {
  return this.macbook.getPrice() + 45.00;
};

// Instantiation of the macbook
var myMacbookPro = new MacbookPro();

// Outputs: 900.00
console.log(myMacbookPro.getPrice());

// Decorate the macbook
var decoratedMacbookPro = new CaseDecorator(myMacbookPro);

// Outputs: 945.00
console.log(decoratedMacbookPro.getPrice());

////////////////////////////////////////////////////////////////////////////////

// 5. DECORATORS WITH JQUERY

var decoratorApp = decoratorApp || {};

// define the objects we're going to use
decoratorApp = {

  defaults: {
    validate: false,
    limit: 5,
    name: "foo",
    welcome: function() {
      console.log("welcome!");
    }
  },

  options: {
    validate: true,
    name: "bar",
    helloWorld: function() {
      console.log("hello world");
    }
  },

  settings: {},

  printObj: function(obj) {
    var arr = [];
    var next;
    $.each(obj, function(key, val) {
      next = key + ": ";
      next += $.isPlainObject(val) ? printObj(val) : val;
      arr.push(next);
    });
    return "{ " + arr.join(", ") + " }";
  }
};

// merge defaults and options, without modifying defaults explicitly
decoratorApp.settings = $.extend({}, decoratorApp.defaults, decoratorApp.options);

// what we have done here is decorated defaults in a way that provides access
// to the properties and functionality it has to offer (as well as that of the
// decorator "options"). defaults itself is left unchanged.

$("#log").append(
  decoratorApp.printObj(decoratorApp.settings) +
  decoratorApp.printObj(decoratorApp.options) +
  decoratorApp.printObj(decoratorApp.defaults)
);

// settings -- { validate: true, limit: 5, name: bar, welcome: function (){
// console.log( "welcome!" ); }, helloWorld: function (){ console.log( "hello
// world" ); } }

// options -- { validate: true, name: bar, helloWorld: function (){
// console.log( "hello world" ); } }

// defaults -- { validate: false, limit: 5, name: foo, welcome: function (){
// console.log("welcome!"); } }
