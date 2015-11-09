/*global
  $
*/

////////////////////////////////////////////////////////////////////////////////

// OBSERVERS

// The Observer is a design pattern where an object (known as a subject)
// maintains a list of objects depending on it (observers), automatically
// notifying them of any changes to state.

// When a subject needs to notify observers about something interesting
// happening, it broadcasts a notification to the observers (which can include
// specific data related to the topic of the notification).

////////////////////////////////////////////////////////////////////////////////

// 1. BASIC OBSERVER

// List of dependent observers

function ObserverList () {
  this.observerList = [];
}

ObserverList.prototype.add = function (obj) {
  return this.observerList.push(obj);
};

ObserverList.prototype.count = function () {
  return this.observerList.length;
};

ObserverList.prototype.get = function (index) {
  if (index > -1 && index < this.observerList.length) {
    return this.observerList[index];
  }
};

ObserverList.prototype.getIndexOf = function (obj, startIndex) {
  for (var i = startIndex; i < this.observerList.length; i++) {
    if (this.observerList[i] === obj) {return i;}
  }
  return -1;
};

ObserverList.prototype.removeAt = function (index) {
  this.observerList.splice(index, 1);
};

// Subject of observation

function Subject () {
  this.observers = new ObserverList();
}

Subject.prototype.addObserver = function (observer) {
  this.observers.add(observer);
};

Subject.prototype.removeObserver = function (observer) {
  this.observers.removeAt(this.observers.getIndexOf(observer, 0));
};

Subject.prototype.notify = function (context) {
  var observerCount = this.observers.count();
  for (var i=0; i < observerCount; i++) {
    this.observers.get(i).update(context);
  }
};

// Skeleton for creating observers

function Observer () {
  this.update = function (context) {
    // ...
  };
}

// HTML in test.html

// Sample JavaScript

// Extend an object

function extend (obj, extension) {
  for (var key in extension) {
    obj[key] = extension[key];
  }
}

// References to DOM elements
var controlCheckbox, addBtn, container;

$(document).ready(function () {
  controlCheckbox = $('#mainCheckbox');
  addBtn = $('#addNewObserver');
  container = $('#observersContainer');

  // Concrete Subject

  // Extend controlling checkbox with Subject class
  extend(controlCheckbox, new Subject());

  // Clicking checkbox triggers notifications to its observers
  controlCheckbox.click(function () {
    controlCheckbox.notify(controlCheckbox.prop('checked'));
  });

  addBtn.click(function () {
    addNewObserver();
  });

  // Concrete Observer

  function addNewObserver () {
    // Create a new checkbox
    var check = $(document.createElement('input'));
    check.prop('type', 'checkbox');

    // Extend checkbox with Observer class
    extend(check, new Observer());

    // Override with custom update behavior
    check.update = function (value) {
      this.prop('checked', value);
    };

    // Add the new observer to our subject's list of observers
    controlCheckbox.addObserver(check);

    // Append the item to the container
    container.append(check);
  }

});
