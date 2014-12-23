app = require "app"

# Templates
template = require "./templates/home"

class HomeView extends Backbone.NativeView

  id: "home-view"

  events:
    "touchmove": "preventDefault"

  initialize: (params, callback) ->
    @render()
    callback()

  render: ->
    @el.innerHTML = template()

  display: (callback) ->
    callback()

  preventDefault: (e) ->
    e.preventDefault()

module.exports = HomeView
