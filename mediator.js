/*global
  $
*/

////////////////////////////////////////////////////////////////////////////////

// MEDIATORS

// A mediator is a behavioral design pattern that allows us to expose a
// unified interface through which the different parts of a system may
// communicate.

// If it appears a system has too many direct relationships between
// components, it may be time to have a central point of control that
// components communicate through instead. The Mediator promotes loose
// coupling by ensuring that instead of components referring to each other
// explicitly, their interaction is handled through this central point.

////////////////////////////////////////////////////////////////////////////////

// 1. SIMPLE MEDIATOR

var mediator = {};

var orgChart = {

  addNewEmployee: function () {
    // getEmployeeDetail provides a view that users interact with
    var employeeDetail = this.getEmployeeDetail();

    // when the employee detail is complete, the mediator (the 'orgChart'
    // object) decides what should happen next
    employeeDetail.on("complete", function(employee) {

      // set up additional objects that have additional events, which are used
      // by the mediator to do additional things
      var managerSelector = this.selectManager(employee);
      managerSelector.on("save", function(employee) {
        employee.save();
      });
    });
  }
};

////////////////////////////////////////////////////////////////////////////////

// 2. MEDIATOR + EVENT AGGREGATOR

var menuItem = MyFrameworkView.extend({

  events: {
    "click .thatThing": "clickedIt"
  },

  clickedIt: function(e) {
    e.preventDefault();

    // assume this triggers "menu:click:foo"
    MyFramework.trigger("menu:click" + this.model.get("name"));
  }

});

// ... somewhere else in the app

var myWorkflow = function() {
  MyFramework.on("menu:click:foo:", this.doStuff, this);
};

MyWorkflow.prototype.doStuff = function () {
  // instantiate multiple objects here.
  // set up event handlers for those objects.
  // coordinate all of the objects into a meaningful workflow
};
