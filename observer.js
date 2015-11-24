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

////////////////////////////////////////////////////////////////////////////////

// 2. PUBLISH/SUBSCRIBE

// The Publish/Subscribe pattern uses a topic/event channel which sits between
// the objects wishing to receive notifications (subscribers) and the object
// firing the event (the publisher). This event system allows code to define
// application specific events which can pass custom arguments containing
// values needed by the subscriber. The idea here is to avoid dependencies
// between the subscriber and publisher.

// This differs from the Observer pattern as it allows any subscriber
// implementing an appropriate event handler to register for and receive topic
// notifications broadcast by the publisher.

// A very simple new mail handler

var mailCounter = 0;

// Stubs
function subscribe (subscription, func) {
  // ...
}

function publish (subscription, func) {
  // ...
}

function unsubscribe (subscriber) {
  // ...
}

// Initialize subscribers that will listen out for a topic with the name
// "inbox/newMessage"

// Render a preview of new messages
var subscriber1 = subscribe("inbox/newMessage", function (topic, data) {

  // Log the topic for debugging
  console.log("A new message was received: ", topic);

  // Use the data that was passed from the subject to display a message
  // preview to the user
  $('.message-sender').html(data.sender);
  $('.message-preview').html(data.body);

});

// Another subscriber using the same data for a different task
var subscriber2 = subscribe("inbox/newMessage", function (topic, data) {
  $('.new-message-counter').html(++mailCounter);
});

// Publish a new message
publish("inbox/newMessage",[{
  sender: "hello@google.com",
  body: "Hello there"
}]);

// Unsubscribe
unsubscribe(subscriber1);



////////////////////////////////////////////////////////////////////////////////

// 3. PUBLISH/SUBSCRIBE IMPLEMENTATION

var pubsub = {};

(function (myObject) {

  // Storage for topics that can be broadcast or listened to
  var topics = {};

  // A topic identifier
  var subUid = -1;

  // Publish or broadcast events of interest with a specific topic name and
  // arguments such as the data to pass on
  myObject.publish = function (topic, args) {

    if (!topics[topic]) {
      return false;
    }

    var subscribers = topics[topic];
    var len = subscribers ? subscribers.length : 0;

    while (len--) {
      subscribers[len].func(topic, args);
    }

    return this;
  };

  // Subscribe to events of interest with a specific topic name and a callback
  // function to be executed when the event is observed

  myObject.subscribe = function (topic, func) {

    if (!topics[topic]) {
      topics[topic] = [];
    }

    var token = (++subUid).toString();
    topics[topic].push({
      token: token,
      func: func
    });

    return token;
  };

  // Unsubscribe from a specific topic based on a tokenized reference to the
  // subscription

  myObject.unsubscribe = function (token) {
    for (var m in topics) {
      if (topics[m]) {
        for (var i=0, j=topics[m].length; i<j; i++) {
          if (topics[m][i].token === token) {
            topics[m].splice(i, 1);
            return token;
          }
        }
      }
    }
    return this;
  };

}(pubsub));

// Using the implementation: another simple message notifier

var messageLogger = function (topics, data) {
  console.log("Logging: " + topics + ": " + data);
};

// Subscribers listen for topics they have subscribed to and invoke a callback
// function once a new notification is broadcast on that topic

var subscription = pubsub.subscribe('inbox/newMessage', messageLogger);

// Publishers are in charge of publishing topics or notifications of interest
// to the application

pubsub.publish('inbox/newMessage', "hello world!");

pubsub.publish('inbox/newMessage', ['test', 'a', 'b', 'c']);

pubsub.publish('inbox/newMessage', {
  sender: "hello@google.com",
  body: "Hey again!"
});

pubsub.unsubscribe(subscription);

// After unsubscription this won't result in messageLogger being executed

pubsub.publish('inbox/newMessage', "Hello! Are you listening?");

////////////////////////////////////////////////////////////////////////////////

// 4. PUBLISH/SUBSCRIBE IMPLEMENTATION IN JQUERY

var element = $('.login');

// Subscribe
$(element).on("/login", function (event) {
  // ...
});

// Publish
$(element).trigger("/login", [{username: "test", userData: "test"}]);

// Unsubscribe
$(element).off("/login");

// Ben Alman's jQuery implementation - see HTML

(function ($) {

  // Pre-compile templates and "cache" them using closure
  var userTemplate = _.template($('#userTemplate').html());
  var ratingsTemplate = _.template($('#ratingsTemplate').html());

  // Subscribe to the new user topic, which adds a user to a list of users who
  // have submitted reviews
  $.subscribe("/new/user", function (e, data) {

    if (data) {
      $('#users').append(userTemplate(data));
    }

  });

  // Subscribe to the new rating topic. This is composed of a title and a
  // rating. New ratings are appended to a running list of added user ratings
  $.subscribe("/new/rating", function (e, data) {

    if (data) {
      $('#ratings').append(ratingsTemplate(data));
    }
  });

  // Handler for adding a new user
  $('#add').on("click", function (e) {
    e.preventDefault();

    var strUser = $('[name=twitter-handle]').val();
    var strMovie = $('[name=movie-seen]').val();
    var strRating = $('[name=movie-rating]').val();

    // Inform the app a new user is available
    $.publish("/new/user", {name: strUser});
    // Inform the app a new rating is available
    $.publish("/new/rating", {title: strMovie, rating: strRating});

  });
}(jQuery));

////////////////////////////////////////////////////////////////////////////////

// 5. EXAMPLE: DECOUPLING AN AJAX-BASED JQUERY APPLICATION

(function ($) {

  // Pre-compile template and "cache" it using closure
  var resultTemplate = _.template($('#resultTemplate').html());

  // Subscribe to the new search tags topic
  $.subscribe("/search/tags", function(e, tags) {
    $('#lastQuery')
      .html("<p>Searched for: <strong>" + tags + "</strong></p>");
  });

  // Subscribe to the new results topic
  $.subscribe("/search/resultSet", function(e, results) {
    $('#searchResults').empty().append(resultTemplate(results));
  });

  // Submit a search query and publish tags on the /search/tags topic
  $('#flickrSearch').submit(function(e) {
    e.preventDefault();

    var tags = $(this).find('#query').val();
    if (!tags) {
      return;
    }

    $.publish("/search/tags", [$.trim(tags)]);
  });

  // Subscribe to new tags being published and perform a search query using
  // them. Once data has returned, publish this data for the rest of the
  // application to consume.

  $.subscribe("/search/tags", function(e, tags){
    $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?", {
      tags: tags,
      tagmode: 'any',
      format: 'json'
    },
    function(data) {
      if (!data.items.length) {
        return;
      }

      $.publish("/search/resultSet", {items: data.items});
    });
  });

}(jQuery));
