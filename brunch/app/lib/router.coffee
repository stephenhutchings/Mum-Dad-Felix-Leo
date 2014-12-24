# The app router watches the browser's navigation and plugs to the
# corresponding action on the mainView

app = require("app")
MainView = require("views/main")

class AppRouter extends Backbone.Router

  # Force the details route to trigger on color changes and create
  # the view that controls rendering of all subviews
  initialize: ->
    @mainView = new MainView(el: "body")

  # Bind the routes to their corresponding methods
  routes:
    "home":         "home"
    "page(/:page)": "book"

    "*default":     "default"

  home: ->
    @mainView.display("home")

  book: (page) ->
    @mainView.display("book", page: page or 0)

  default: ->
    @navigate "home", true

module.exports = AppRouter
