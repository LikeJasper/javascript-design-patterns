/*global
  $
*/

////////////////////////////////////////////////////////////////////////////////

// MVC

// MVC is an architectural design pattern that encourages improved application
// organization through a separation of concerns. It enforces the isolation of
// business data (Models) from user interfaces (Views), with a third component
// (Controllers) traditionally managing logic and user-input.

////////////////////////////////////////////////////////////////////////////////

// 1. Models

// Models manage the data for an application. They are concerned with neither
// the user-interface nor presentation layers but instead represent unique
// forms of data that an application may require. When a model changes (e.g
// when it is updated), it will typically notify its observers (e.g views, a
// concept we will cover shortly) that a change has occurred so that they may
// react accordingly.

var Photo = Backbone.Model.extend({

  // Default attributes for the photo
  defaults: {
    src: "placeholder.jpg",
    caption: "A default image",
    viewed: false
  },
  // Ensure that each photo created has an 'src'
  initialize: function() {
    this.set({
      "src": this.defaults.src
    });
  }

});

var PhotoGallery = Backbone.Collection.extend({

  // Reference to this collection's model.
  model: Photo,

  // Filter down the list of all photos that have been viewed
  viewed: function() {
    return this.filter(function(photo) {
      return photo.get("viewed");
    });
  },

  // Filter down the list to only photos that have not yet been viewed
  unviewed: function() {
    return this.without.apply(this, this.viewed());
  }

});

////////////////////////////////////////////////////////////////////////////////

// 2. Views

// Views are a visual representation of models that present a filtered view of
// their current state. Whilst Smalltalk views are about painting and
// maintaining a bitmap, JavaScript views are about building and maintaining a
// DOM element. A view typically observes a model and is notified when the
// model changes, allowing the view to update itself accordingly.

var buildPhotoView = function(photoModel, photoController) {

  var base = document.createElement("div");
  var photoEl = document.createElement("div");

  base.appendChild(photoEl);

  var render = function() {
    // We use a templating library such as Underscore templating which
    // generates the HTML for our photo entry
    photoEl.innerHTML = _.template("#photoTemplate", {
      src: photoModel.getSrc()
    });
  };

  photoModel.addSubscriber(render);

  photoEl.addEventListener("click", function() {
    photoController.handleEvent("click", photoModel);
  });

  var show = function() {
    photoEl.style.display = "";
  };

  var hide = function() {
    photoEl.style.display = "none";
  };

  return {
    showView: show,
    hideView: hide
  };

};

////////////////////////////////////////////////////////////////////////////////

// 3. Controllers

// Controllers are an intermediary between models and views which are
// classically responsible for updating the model when the user manipulates
// the view.

// In Spine, controllers are considered the glue for an application, adding
// and responding to DOM events, rendering templates and ensuring that views
// and models are kept in sync.
var PhotosController = Spine.Controller.sub({

  init: function() {
    this.item.bind("update", this.proxy(this.render));
    this.item.bind("destroy", this.proxy(this.remove));
  },

  render: function() {
    // Handle templating
    this.replace($("#photoTemplate").tmpl(this.item));
    return this;
  },

  remove: function() {
    this.el.remove();
    this.release();
  }
});

// In Backbone, one shares the responsibility of a controller with both the
// Backbone.View and Backbone.Router.
var PhotoRouter = Backbone.Router.extend({
  routes: {"photos/:id": "route"},

  route: function(id) {
    var item = photoCollection.get(id);
    var view = new PhotoView({model: item});

    $('.content').html(view.render().el);
  }
});
