////////////////////////////////////////////////////////////////////////////////

// SINGLETONS

// The Singleton pattern is thus known because it restricts instantiation of a 
// class to a single object. Classically, the Singleton pattern can be 
// implemented by creating a class with a method that creates a new instance of 
// the class if one doesn't exist. In the event of an instance already 
// existing, it simply returns a reference to that object.

// Singletons differ from static classes (or objects) as we can delay their 
// initialization, generally because they require some information that may not 
// be available during initialization time.

////////////////////////////////////////////////////////////////////////////////

// 1. BASIC SINGLETON

var mySingleton = (function () {

  // Instance stores a reference to the singleton
  var instance;

  function init () {

    // Singleton

    // Private methods and variables

    function privateMethod() {
      console.log("I am private");
    }

    var privateVariable = "I am also private",
      privateRandomNumber = Math.random();

    return {
      // Public methods and variables
      publicMethod: function () {
        console.log("I am public");
      },
      publicProperty: "I am also public",
      getRandomNumber: function () {
        return privateRandomNumber;
      }
    };

  }

  return {

    // Get the Singleton instance if one exists or create one if it doesn't
    getInstance: function () {
      if (!instance) {
        instance = init();
      }

      return instance;
    }
  };

}());

var myBadSingleton = (function () {

  // Instance stores a reference to the singleton
  var instance;

  function init() {
    // Singleton
    var privateRandomNumber = Math.random();

    return {
      getRandomNumber: function () {
        return privateRandomNumber;
      }
    };
  }

  return {
    // Always create a new Singleton instance
    getInstance: function () {
      instance = init();
      return instance;
    }
  };
}());

// Usage

var singleA = mySingleton.getInstance();
var singleB = mySingleton.getInstance();
// true
console.log(singleA.getRandomNumber() === singleB.getRandomNumber());

var badSingleA = myBadSingleton.getInstance();
var badSingleB = myBadSingleton.getInstance();
// almost certainly true
console.log(badSingleA.getRandomNumber() !== badSingleB.getRandomNumber());

////////////////////////////////////////////////////////////////////////////////

// 2. SINGLETON EXTENSIBLE BY SUBCLASSING

// Note: come back to this when subclasses have been covered

var foo = true;

mySingleton.getInstance = function () {
  if (this._instance == null) {
    if (foo) {
      this._instance = new fooSingleton();
    } else {
      this._instance = new mSingleton();
    }
  }
  return this._instance;
}

////////////////////////////////////////////////////////////////////////////////

// 3. SINGLETON USEFUL FOR COORDINATION

var SingletonTester = (function () {

  function Singleton (options) {
    // set options to empty object if not supplied
    options = options || {};

    this.name = "SingletonTester";
    this.pointX = options.pointX || 6;
    this.pointY = options.pointY || 10;
  }

  var instance;

  // an emulation of static variables and methods
  var _static = {
    name: "SingletonTester",

    // Method returns a singleton instance of a singleton object
    getInstance: function (options) {
      if (instance === undefined) {
        instance = new Singleton (options);
      }
      return instance;
    }
  }

  return _static;

}());

var singletonTest = SingletonTester.getInstance({pointX: 5, pointY: 1});

console.log(singletonTest.pointX); // 5
