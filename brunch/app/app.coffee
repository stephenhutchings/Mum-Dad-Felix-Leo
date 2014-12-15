# The application is the singleton which stores all collections, models, the
# router and sets up other modules. It is invoked by the initializer.

NiceTouch = require("lib/touch")
Preloader = require("lib/preload")

# Models
UserModel = require("models/user")

# Collections
NamesCollection = require("collections/names")

Application =
  initialize: (callback) ->

    # This loads all images in the spritesheet before hiding the splash screen
    Preloader.initialize()

    # This adds the "iostap" event, a nicer implementation of Zepto's tap
    NiceTouch.initialize()

    # Light colored status bar
    StatusBar?.styleLightContent()

    # No scrolling of webview
    Keyboard?.disableScroll(true)

    # Require the router during initialization to avoid infinite requiring
    Router = require("lib/router")

    ready = (firstRun) =>
      # The router is a singleton that handles app-wide navigation
      # Now the the requisite collections are fetched we'll let the
      # router continue
      @router = new Router()

      # Everything is now loaded, so callback the callback which start
      # Backbone.history in the initializer
      callback()

    # Create the user, where an error suggests the app is running for the
    # first time, so we pass a variable to show this
    @currentUser = new UserModel(id: "ME")
    @currentUser.fetch
      success: => ready()
      error: => ready(true)

module.exports = Application
