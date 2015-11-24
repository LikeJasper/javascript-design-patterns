/*global
  $
*/

////////////////////////////////////////////////////////////////////////////////

// COMMANDS

// The general idea behind the Command pattern is that it provides us a means
// to separate the responsibilities of issuing commands from anything
// executing commands, delegating this responsibility to different objects
// instead.

// It enables us to decouple objects invoking the action from the objects
// which implement them, giving us a greater degree of overall flexibility in
// swapping out concrete classes (objects).

////////////////////////////////////////////////////////////////////////////////

// 1. SIMPLE COMMAND

(function () {

  var carManager = {
    // request information
    requestInfo: function (model, id) {
      return "The information for " + model + " with ID " + id + " is foobar";
    },

    // purchase the car
    buyVehicle: function (model, id) {
      return "You have successfully purchased Item " + id + ", a " + model;
    },

    // arrange a viewing
    arrangeViewing: function (model, id) {
      return "You have successfully booked a viewing of " + model + " (" + id + ")";
    }
  };
}());

carManager.execute = function (name) {
  return carManager[name] && carManager[name].apply(carManager, [].slice.call(arguments, 1));
};

carManager.execute("arrangeViewing", "Ferrari", "14523");
carManager.execute("requestInfo", "Ford Mondeo", "54323");
carManager.execute("requestInfo", "Ford Escort", "34232");
carManager.execute("buyVehicle", "Ford Escort", "34232");
