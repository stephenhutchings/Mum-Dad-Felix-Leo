# The MainView holds the wrapper template and is used to control rendering
# between the different child views.
require("lib/element.toggle")

app = require "app"
template = require "views/templates/main"
Prefix = require("lib/prefix")

# Cache frequently used inbound/outbound containers, which are used
# when rendering new views
content = inbound = outbound = null

isTouch = "ontouchstart" of window

class MainView extends Backbone.NativeView

  currentClass: "none"
  views: {}

  events:
    "iostap a[href]": "navigateWithoutDelay"

  # Add the html from the corresponding template and create the child views
  initialize: ->
    @el.innerHTML = template()

    # View rendering elements
    inbound = @el.querySelector("#inbound")
    outbound = @el.querySelector("#outbound")
    content = @el.querySelector("#content")

    @classForDeviceVersion()
    @classForDeviceSize()

  classForDeviceVersion: ->
    @el.classList.toggle("ios-lt-7", window.device?.version.match(/[\d]+/) < 7)

  classForDeviceSize: ->
    if window.innerWidth < 600
      @el.classList.add "mobile"

  # If the link contains a hash, follow the route as normal. "mailto" links
  # open the Cordova email plugin, with the link broken into its segments.
  # Otherwise, open the inAppBrowser with the link.
  navigateWithoutDelay: (e) ->
    if e.delegateTarget.hash
      app.router.navigate(e.delegateTarget.hash, true)

    else if e.delegateTarget.href.match("mailto:") and window.plugin?.email?
      href = e.delegateTarget.href.replace("mailto:", "")
      to = href.split("?subject=")[0]
      sub = (href.split("?subject=")[1] or "").split("&body=")[0]
      body = href.split("&body=")[1]

      window.plugin.email.open
        to:       [to]
        subject:  window.decodeURIComponent(sub or "")
        body:     window.decodeURIComponent(body or "")

    else
      window.open(e.delegateTarget.href, "_system")

  # Create a new view based on the child view name and params passed. Avoid
  # this if its the same view already showing, and enclass the main view
  # element for styling subview content.
  display: (child, params) ->
    View = require "./#{child}"
    klass = "#{child}-active"
    done = (callback) => @afterDisplay(callback)

    @undelegateEvents()

    inbound.removeAttribute("id")
    outbound.removeAttribute("id")
    inbound.id = "outbound"
    outbound.id = "inbound"

    @el.classList.remove "display", @currentClass
    @el.classList.add klass

    @currentClass = klass

    # Remove any listeners from the current view
    if @currentView?
      @currentView.stopListening()
      @currentView.undelegateEvents()
      @currentView.hide?()

    if @views[child] and @views[child].cid isnt @currentView.cid
      @currentView = @views[child]
      @currentView.display done, params
    else
      @currentView = new View params, done
      @currentView.el.classList.add("view")
      @currentView.undelegateEvents()
      @views[child] = @currentView unless @currentView.cache is false

    outbound.removeChild(outbound.lastChild) while (outbound.lastChild)
    outbound.appendChild @currentView.el

  afterDisplay: (callback) ->
    window.clearTimeout @afterTimeout
    @afterTimeout = window.setTimeout (=>
      @el.classList.add("display")
      callback() if callback
      @afterTransition()
    ), 10

  # Remove oldView after transition
  afterTransition: ->
    window.clearTimeout @timeout
    @timeout = window.setTimeout( =>
      @currentView.delegateEvents()
      @delegateEvents()
      @swapContainers()
    , 600)

  swapContainers: ->
    _inb = outbound
    _otb = inbound
    inbound = _inb
    outbound = _otb
    outbound.removeChild(outbound.lastChild) while (outbound.lastChild)

module.exports = MainView
