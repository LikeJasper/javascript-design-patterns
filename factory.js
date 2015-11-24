/*global
  $
*/

////////////////////////////////////////////////////////////////////////////////

// FACTORIES

// The Factory pattern is another creational pattern concerned with the notion
// of creating objects. Where it differs from the other patterns in its
// category is that it doesn't explicitly require us use a constructor.
// Instead, a Factory can provide a generic interface for creating objects,
// where we can specify the type of factory object we wish to be created.

// This is particularly useful if the object creation process is relatively
// complex, e.g. if it strongly depends on dynamic factors or application
// configuration.

////////////////////////////////////////////////////////////////////////////////

// 1. VEHICLE FACTORY EXAMPLE

// Types.js = Constructors used behind the scenes

// A constructor for defining new cars
function Car (options) {
  // some defaults
  this.doors = options.doors || 4;
  this.state = options.state || "brand new";
  this.color = options.color || "silver";
}

// A constructor for defining new trucks
function Truck (options) {
  this.state = options.state || "used";
  this.wheelSize = options.wheelSize || "large";
  this.color = options.color || "blue";
}

// FactoryExample.js

// Define a skeleton vehicle factory
function VehicleFactory() {}

// Define the prototypes and utilities for this factory

// Our default vehicleClass is Car
VehicleFactory.prototype.vehicleClass = Car;

// Our Factory method for creating new Vehicle instances
VehicleFactory.prototype.createVehicle = function (options) {

  switch (options.vehicleType) {
    case "car":
      this.vehicleClass = Car;
      break;
    case "truck":
      this.vehicleClass = Truck;
      break;
    // defaults to VehicleFactory.prototype.vehicleClass (Car)
  }

  return new this.vehicleClass(options);
};

// Create an instance of our factory that makes cars
var carFactory = newVehicleFactory();
var car = carFactory.createVehicle({
  vehicleType: "car",
  color: "yellow",
  doors: 6
});

// Test to confirm our car was created using the vehicleClass/prototype Car
console.log(car instanceof Car); // true
// Outputs Car object with color "yellow", doors 6, in "brand new" state
console.log(car);

// Approach #1: Modify a VehicleFactory instance to use the Truck class
var movingTruck = carFactory.createVehicle({
  vehicleType: "truck",
  state: "like new",
  color: "red",
  wheelSize: "small"
});

// Test to confirm our truck was created with the vehicleClass/prototype Truck
console.log(movingTruck instanceof Truck);

// Approach #2: Subclass VehicleFactory to create a factory class that builds
// trucks
function TruckFactory () {}
TruckFactory.prototype = new VehicleFactory();
TruckFactory.prototype.vehicleClass = Truck;

var truckFactory = new TruckFactory();
var myBigTruck = truckFactory.createVehicle({
  state: "awful",
  color: "pink",
  wheelSize: "enormous"
});

// Test to confirm our truck was created with the prototype Truck
console.log(myBigTruck instanceof Truck);

////////////////////////////////////////////////////////////////////////////////

// 2. ABSTRACT FACTORY

var abstractVehicleFactory = (function () {

  // Storage for our vehicle types
  var types = {};

  return {
    getVehicle: function (type, customizations) {
      var Vehicle = types[types];

      return (Vehicle ? new Vehicle(customizations) : null);
    },

    registerVehicle: function (type, Vehicle) {
      var proto = Vehicle.prototype;

      // only register classes that fulfil the vehicle contrat
      if (proto.drive && proto.breakDown) {
        types[type] = Vehicle;
      }

      return abstractVehicleFactory;
    }
  };
}());

// Usage

abstractVehicleFactory.registerVehicle("car", Car);
abstractVehicleFactory.registerVehicle("truck", Truck);

// Instantiate a new car based on the abstract vehicle type
var car = abstractVehicleFactory.getVehicle("car", {
  color: "lime green",
  state: "like new"
});

// Instantiate a new truck in a similar manner
var truck = abstractVehicleFactory.getVehicle("truck", {
  wheelSize: "medium",
  color: "neon yellow"
});
