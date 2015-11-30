/*global
  $
*/

////////////////////////////////////////////////////////////////////////////////

// FLYWEIGHTS

// The Flyweight pattern is a classical structural solution for optimizing
// code that is repetitive, slow and inefficiently shares data. It aims to
// minimize the use of memory in an application by sharing as much data as
// possible with related objects (e.g application configuration, state and so
// on).

// In practice, Flyweight data sharing can involve taking several similar
// objects or data constructs used by a number of objects and placing this
// data into a single external object. We can pass through this object to
// those depending on this data, rather than storing identical data across
// each one.

////////////////////////////////////////////////////////////////////////////////

// 1. FLYWEIGHT FOR SHARING DATA

Function.prototype.implementsFor = function(parentClassOrObject) {
  if (parentClassOrObject.constructor === Function) {
    // Normal inheritance
    this.prototype = new parentClassOrObject();
    this.prototype.constructor = this;
    this.prototype.parent = parentClassOrObject.prototype;
  } else {
    // Pure virtual inheritance
    this.prototype = parentClassOrObject;
    this.prototype.constructor = this;
    this.prototype.parent = parentClassOrObject;
  }
  return this;
};

// Flyweight object
var CoffeeOrder = {
  // Interfaces
  serveCoffee: function(context) {},
  getFlavor: function(){}
};

// ConcreteFlyweight object that creates ConcreteFlyweight
// Implements CoffeeOrder
function CoffeeFlavor(newFlavor) {

  var flavor = newFlavor;

  // If an interface has been defined for a feature implement the feature
  if (typeof this.getFlavor === "function") {
    this.getFlavor = function() {
      return flavor;
    };
  }

  if (typeof this.serveCoffee === "function") {
    this.serveCoffee = function(context) {
      console.log(
        "Serving coffee flavor " +
        flavor +
        " to table number " +
        context.getTable()
      );
    };
  }
}

// Implement interface for CoffeeOrder
CoffeeFlavor.implementsFor(CoffeeOrder);

// Handle table numbers for a coffee order
function CoffeeOrderContext(tableNumber) {
  return {
    getTable: function() {
      return tableNumber;
    }
  };
}

function CoffeeFlavorFactory() {
  var flavors = {};
  var length = 0;

  return {
    getCoffeeFlavor: function(flavorName) {
      var flavor = flavors[flavorName];
      if (typeof flavor === "undefined") {
        flavor = new CoffeeFlavor(flavorName);
        flavors[flavorName] = flavor;
        length++;
      }
      return flavor;
    },

    getTotalCoffeeFlavorsMade: function() {
      return length;
    }
  };
}

// Sample usage:
// testFlyweight()

function testFlyweight() {

  // The flavors ordered
  var flavors = new CoffeeFlavor();

  // The tables for the orders
  var tables = new CoffeeOrderContext();

  // Number of orders made
  var ordersMade = 0;

  // The CoffeeFlavorFactory instance
  var flavorFactory;

  function takeOrders(flavorIn, table) {
    flavors[ordersMade] = flavorFactory.getCoffeeFlavor(flavorIn);
    tables[ordersMade++] = new CoffeeOrderContext(table);
  }

  flavorFactory = new CoffeeFlavorFactory();

  takeOrders("Cappuccino", 2);
  takeOrders("Cappuccino", 2);
  takeOrders("Frappe", 1);
  takeOrders("Frappe", 1);
  takeOrders("Xpresso", 1);
  takeOrders("Frappe", 897);
  takeOrders("Cappuccino", 97);
  takeOrders("Cappuccino", 97);
  takeOrders("Frappe", 3);
  takeOrders("Xpresso", 3);
  takeOrders("Cappuccino", 3);
  takeOrders("Xpresso", 96);
  takeOrders("Frappe", 552);
  takeOrders("Cappuccino", 121);
  takeOrders("Xpresso", 121);

  for (var i=0; i<ordersMade; ++i) {
    flavors[i].serveCoffee(tables[i]);
  }

  console.log(" ");
  console.log("total CoffeeFlavor objects made: " + flavorFactory.getTotalCoffeeFlavorsMade());
}

////////////////////////////////////////////////////////////////////////////////

// 2. FLYWEIGHT FOR THE DOM

// The DOM (Document Object Model) supports two approaches that allow objects
// to detect events - either top down (event capture) or bottom up (event
// bubbling). In event capture, the event is first captured by the outer-most
// element and propagated to the inner-most element. In event bubbling, the
// event is captured and given to the inner-most element and then propagated
// to the outer-elements.

// Example 1: Centralized event handling - see test.html

var stateManager = {

  fly: function() {

    var self = this;

    $("#dom-flyweight")
      .unbind()
      .on("click", "div.toggle", function(e) {
        self.handleClick(e.target);
      }
    );
  },

  handleClick: function(elem) {
    elem.find("span").toggle("slow");
  }
};

// Example 2: Flyweight for performance optimization

jQuery.single = (function(o) {

  var collection = jQuery([1]);
  return function(element) {

    // Give collection the element
    collection[0] = element;

    // Return the collection
    return collection;
  };
}());

$("div").on("click", function() {
  var html = jQuery.single(this).next().html();
  console.log(html);
});
