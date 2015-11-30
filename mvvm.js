/*global
  $
*/

////////////////////////////////////////////////////////////////////////////////

// MVVM

// MVVM (Model View ViewModel) is an architectural pattern based on MVC and
// MVP, which attempts to more clearly separate the development of user-
// interfaces (UI) from that of the business logic and behavior in an
// application. To this end, many implementations of this pattern make use of
// declarative data bindings to allow a separation of work on Views from other
// layers.

////////////////////////////////////////////////////////////////////////////////

// 1. Models

// As with other members of the MV* family, the Model in MVVM represents
// domain-specific data or information that our application will be working
// with. Models hold information, but typically don’t handle behavior. The
// only exception to this rule tends to be validation and it’s considered
// acceptable for Models to validate data being used to define or update
// existing models.

// KnockoutJS: observables are special JS objects that can notify subscribers
// about changes and automatically detect dependencies

var Todo = function(content, done) {
  this.content = ko.observable(content);
  this.done = ko.observable(done);
  this.editing = ko.observable(false);
};

////////////////////////////////////////////////////////////////////////////////

// 2. Views

// As with MVC, the View is the only part of the application that users
// actually interact with. They are an interactive UI that represent the state
// of a ViewModel. In this sense, the view is considered active rather than
// passive. MVVM’s active View contains the data-bindings, events and
// behaviors which requires an understanding of the ViewModel.

// A KnockoutJS View is simply a HTML document with declarative bindings to
// link it to the ViewModel. KnockoutJS Views display information from the
// ViewModel, pass commands to it (e.g a user clicking on an element) and
// update as the state of the ViewModel changes.

// ViewModel

var aViewModel = {
  contactName: ko.observable("John")
};
ko.applyBindings(aViewModel);

// View: See test.html



