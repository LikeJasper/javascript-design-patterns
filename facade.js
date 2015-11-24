/*global
  $
*/

////////////////////////////////////////////////////////////////////////////////

// FACADES

// This pattern provides a convenient higher-level interface to a larger body
// of code, hiding its true underlying complexity. Think of it as simplifying
// the API being presented to other developers, something which almost always
// improves usability.

// The Facade pattern both simplifies the interface of a class and it also
// decouples the class from the code that utilizes it. This gives us the
// ability to indirectly interact with subsystems in a way that can sometimes
// be less prone to error than accessing the subsystem directly.

////////////////////////////////////////////////////////////////////////////////

// 1. SIMPLE FACADES

// Cross-browser event-listener
var addMyEvent = function (el, ev, fn) {
  if (el.addEventListener) {
    el.addEventListener(ev, fn, false);
  } else if (el.attachEvent) {
    el.attachEvent("on" + ev, fn);
  } else {
    el["on" + ev] = fn;
  }
};

// Module example
var module = (function () {

  var _private = {
    i: 5,
    get: function () {
      console.log("current value: " + this.i);
    },
    set: function (val) {
      this.i = val;
    },
    run: function () {
      console.log("running");
    },
    jump: function () {
      console.log("jumping");
    }
  };

  return {
    facade: function (args) {
      _private.set(args.val);
      _private.get();
      if (args.run) {
        _private.run();
      }
    }
  };
}());

// Outputs: "current value: 10" and "running"
module.facade({run: true, val: 10});

