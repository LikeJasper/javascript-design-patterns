////////////////////////////////////////////////////////////////////////////////

// REVEALING MODULES

// This pattern allows the syntax of our scripts to be more consistent. It also 
// makes it more clear at the end of the module which of our functions and 
// variables may be accessed publicly which eases readability.

////////////////////////////////////////////////////////////////////////////////

var myRevealingModule = (function () {

  var privateVar = "Ben Cherry",
    publicVar = "Hey there!";

  function privateFunction () {
    console.log("Name: " + privateVar);
  }

  function publicSetName (strName) {
    privateVar = strName;
  }

  function publicGetName () {
    privateFunction();
  }

  // Reveal public pointers to private functions and properties

  return {
    greeting: publicVar,
    setName: publicSetName,
    getName: publicGetName
  }

}());

myRevealingModule.setName("John Kerry");

// It can be helpful for more specific naming schemes

var myOtherRevealingModule = (function () {

  var privateCounter = 0;

  function privateFunction () {
    privateCounter++;
  }

  function publicIncrement () {
    privateFunction();
  }

  function publicFunction () {
    publicIncrement();
  }

  function publicGetCount () {
    return privateCounter;
  }

  // Reveal public pointers to private functions and properties

  return {
    start: publicFunction,
    increment: publicIncrement,
    count: publicGetCount
  }

}());

myOtherRevealingModule.start();
