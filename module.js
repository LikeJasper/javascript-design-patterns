////////////////////////////////////////////////////////////////////////////////

// MODULES

// Modules help in keeping the units of code for a project both cleanly 
// separated and organized.

////////////////////////////////////////////////////////////////////////////////

// 1. OBJECT LITERALS

// In object literal notation, an object is described as a set of 
// comma-separated name/value pairs enclosed in curly braces ({}). Names inside 
// the object may be either strings or identifiers that are followed by a 
// colon. There should be no comma used after the final name/value pair in the 
// object as this may result in errors.

var myObjectLiteral = {
  variableKey: "variableValue",
  functionKey: function () {
    // ...
  }
};

// More complete example of module

var myModule = {

  myProperty: "Some property",
  myConfig: {
    useCaching: true
  },

  myFunction: function () {
    console.log("This is a module function");
  },

  reportConfig: function () {
    console.log("Caching is " + (this.myConfig.useCaching ? "enabled" : "disabled"));
  },

  updateConfig: function (newConfig) {
    if (typeof(newConfig) === 'object') {
      this.myConfig = newConfig;
    }
  }
};

////////////////////////////////////////////////////////////////////////////////

// 2. THE MODULE PATTERN

// The Module pattern encapsulates "privacy", state and organization using 
// closures. It provides a way of wrapping a mix of public and private methods 
// and variables, protecting pieces from leaking into the global scope and 
// accidentally colliding with another developer's interface. With this 
// pattern, only a public API is returned, keeping everything else within the 
// closure private.

var myNamespace = (function () {

  var myPrivateVar, myPrivateMethod;

  myPrivateVar = 0;

  myPrivateMethod = function (foo) {
    console.log(foo);
  };

  return {

    myPublicVar: "foo",

    myPublicFunction: function (bar) {
      myPrivateVar++;
      myPrivateMethod(bar);
    }

  }
}());

// Module pattern variations

// i. Import mixins: globals (e.g jQuery, Underscore) can be passed in as 
// arguments to our module's anonymous function. This effectively allows us to 
// import them and locally alias them as we wish.

var myModule = (function ($, _) {

  function privateMethod1 () {
    $('.container').html("test");
  }

  function privateMethod2 () {
    console.log(_.min([10, 5, 100]));
  }

  return {
    publicMethod: function () {
      privateMethod1();
    }
  }


}(jQuery, _));

myModule.publicMethod();

// ii. Exports: declare globals without consuming them.

var globalModule = (function () {

  var module = {},
    privateVariable = "This is private";

  function privateMethod() {
    // ...
  }

  module.publicProperty = "This is public";
  module.publicMethod = function () {
    console.log(privateVariable);
  }

  return module;

}());

////////////////////////////////////////////////////////////////////////////////

// 3. THE MODULE PATTERN WITH JQUERY CODE

function library (module) {

  $(function () { //shorthand for $(document).ready()
    if (module.init) {
      module.init();
    }
  });

  return module
}

var myLibrary = library(function () {
  return {
    init: function () {
      // module implementation
    }
  }
}());
