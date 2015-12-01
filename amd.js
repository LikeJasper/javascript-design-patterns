/*global
  $
*/

////////////////////////////////////////////////////////////////////////////////

// AMD

// The AMD module format itself is a proposal for defining modules where both
// the module and dependencies can be asynchronously loaded. It has a number
// of distinct advantages including being both asynchronous and highly
// flexible by nature which removes the tight coupling one might commonly find
// between code and module identity.

////////////////////////////////////////////////////////////////////////////////

// 1. DEFINE()

// define is used to define named or unnamed modules

define("myModule", // optional (module is "named" if present)

  ["foo", "bar"], // optional

  // module definition function
  // dependencies (foo and bar) are mapped to function parameters
  function(foo, bar) {
    // return a value that defines the module export
    // (i.e. the functionality we want to expose for consumption)

    // create your module here
    var myModule = {
      doStuff: function() {
        console.log("Yay stuff");
      }
    };

    return myModule;
  }

);

// An alternative
define("myOtherModule",

  ["math", "graph"],

  function(math , graph) {

    // With AMD it's possible to define modules in a few different ways
    return {
      plot: function(x, y) {
        return graph.drawPie(math.randomGrid(x, y));
      }
    };
  }

);

////////////////////////////////////////////////////////////////////////////////

// 2. REQUIRE()

// require is typically used to load code in a top-level JavaScript file or
// within a module should we wish to dynamically fetch dependencies

// with "foo" and "bar" as external modules, their exports are passed as
// function arguments to the callback so they can be accessed
require(["foo", "bar"], function(foo, bar) {
  // rest of your code here
  foo.doSomething();
});

////////////////////////////////////////////////////////////////////////////////

// 3. DYNAMICALLY-LOADED DEPENDENCIES

define(function(require) {
  var isReady = false, foobar;

  // note the inline require within our module definition
  require(["foo", "bar"], function(foo, bar) {
    isReady = true;
    foobar = foo() + bar();
  });

  // we can still return a module
  return {
    isReady: isReady,
    foobar: foobar
  };
});

////////////////////////////////////////////////////////////////////////////////

// 4. PLUGINS

// With AMD, it's possible to load in assets of almost any kind including
// text-files and HTML. This enables us to have template dependencies which
// can be used to skin components either on page-load or dynamically.

define(["./templates", "text!./template.md", "css!./template.css"],

  function(templates, template) {
    console.log(templates);
    // do something with our templates here
  }

);

////////////////////////////////////////////////////////////////////////////////

// 5. LOADING AMD MODULES

// RequireJS
require(["app/myModule"],

  function(myModule) {
    // start the main module which in turn loads other modules
    var module = new myModule();
    module.doStuff();
  }

);

// curl.js
curl(["app/myModule.js"],

  function(myModule) {
    // start the main module which in turn loads other modules
    var module = new myModule();
    module.doStuff();
  }
);

////////////////////////////////////////////////////////////////////////////////

// 6. DEFERRED DEPENDENCIES

// This could be compatible with e.g. jQuery's deferred implementation
// futures.js

define(["lib/Deferred"], function(Defered) {
  var defer = new Deferred();

  require(["lib/templates/?index.html", "lib/data/?stats"],

    function(template, data) {
      defer.resolve({template: template, data: data});
    }
  );

  return defer.promise();
});

////////////////////////////////////////////////////////////////////////////////

// 7. AMD MODULES WITH JQUERY

// Easy module definition
define(["js/jquery.js", "js/jquery.color.js", "js/underscore.js"],

  function($, colorPlugin, _) {
    // Here we've pased in jQuery, the color plugin and Underscore. None of
    // these will be accessible in the global scope but can easily be
    // referenced below.

    // Pseudo-randomize an array of colors, selecting the first item in the
    // shuffled array
    var shuffleColor = _.first(_.shuffle(["#666", "#333", "#111"]));

    // Animate the background-color of any elements with the class "item" on
    // the page using the shuffled color
    $(".item").animate({"backgroundColor": shuffleColor});

    // What we return can be used by other modules
    return {};
  }
);

// Account for the existence of more than one global instances of jQuery in
// the document, cater for testing .noConflict()

var jQuery = this.jQuery || "jQuery";
var $ = this.$ || "$";
var originaljQuery = jQuery;
var original$ = $;

define(["jquery"], function($) {
  $(".items").css("background", "green");
  return function() {};
});
