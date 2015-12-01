/*global
  $
*/

////////////////////////////////////////////////////////////////////////////////

// COMMONJS

// The CommonJS module proposal specifies a simple API for declaring modules
// server-side and unlike AMD attempts to cover a broader set of concerns such
// as io, file-system, promises and more.

// From a structure perspective, a CommonJS module is a reusable piece of
// JavaScript which exports specific objects made available to any dependent
// code. Unlike AMD, there are typically no function wrappers around such
// modules (so we won't see define here for example).

////////////////////////////////////////////////////////////////////////////////

// 1. COMMONJS: REQUIRE() AND EXPORTS

// CommonJS modules basically contain two primary parts: a free variable named
// exports which contains the objects a module wishes to make available to
// other modules and a require function that modules can use to import the
// exports of other modules.

// package/lib is a dependency we require
var lib = require("package/lib");

// behaviour for our module
function foo() {
  lib.log("hello world");
}

// export (expose) foo to other modules
exports.foo = foo;

////////////////////////////////////////////////////////////////////////////////

// 2. BASIC CONSUMPTION OF EXPORTS

// define more behaviour we would like to expose
function foobar() {
  this.foo = function() {
    console.log("Hello foo");
  };

  this.bar = function() {
    console.log("Hello bar");
  };
}

// expose foobar to other modules
exports.foobar = foobar;

// an application consuming "foobar": access the module relative to the path
// where both usage and module files exist in the same directory
var foobar = require("./foobar").foobar;
var test = new foobar();

// Outputs "Hello bar"
test.bar();

////////////////////////////////////////////////////////////////////////////////

// 3. CONSUMING MULTIPLE DEPENDENCIES

// app.js
var modA = require("./foo");
var modB = require("./bar");

exports.app = function() {
  console.log("I'm an application!");
};

exports.foo = function() {
  return modA.helloWorld();
};

// bar.js
exports.name = "bar";

// foo.js
require("./bar");
exports.helloWorld = function() {
  return "Hello world!!";
};
