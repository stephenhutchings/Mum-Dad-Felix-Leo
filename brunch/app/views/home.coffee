app = require "app"

# Templates
template = require "./templates/home"

class HomeView extends Backbone.View

  id: "home-view"

  events:
    "touchmove": "preventDefault"

  initialize: (params, callback) ->
    @render()
    callback()

  render: ->
    @el.innerHTML = template()

  preventDefault: (e) ->
    e.preventDefault()

module.exports = HomeView
