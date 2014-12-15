# Creates a new zepto event called "iostap", which creates pseudo active
# states ("__active") for all elements that are touched.

module.exports =
  initialize: ->

    # The touch object stores the current touch information
    touch = {}

    # Multi-device events
    isTouch = "ontouchstart" of window
    _start  = if isTouch then "touchstart" else "mousedown"
    _move   = if isTouch then "touchmove" else "mousemove"
    _end    = if isTouch then "touchend" else "mouseup"

    # Buffers are proportional to overall size of the window
    nearBuffer       = Math.pow(window.innerHeight * window.innerWidth, 0.35)
    activeClass      = "__active"
    minimumActiveMS  = 100
    nearEnough       = null
    inputRegEx       = /INPUT|LABEL|TEXTAREA|SELECT/

    tapEvent = new CustomEvent "iostap",
      bubbles: true
      cancelable: true

    parentIfText = (node) ->
      if "tagName" of node then node else node.parentNode

    parentNodes = (node) ->
      while node.parentNode
        nodes.push(node)
        node = node.parentNode

    toggleActiveState = (isEnd) ->
      nearEnough = touch? and
                   Math.abs(touch.x1 - touch.x2) < nearBuffer and
                   Math.abs(touch.y1 - touch.y2) < nearBuffer

      if nearEnough
        el = touch.el
        while el.parentNode
          el.classList.add activeClass
          break if el.dataset.nobubble
          el = el.parentNode
      else
        for el in document.querySelectorAll("." + activeClass)
          el.classList.remove activeClass

    onStart = (e) ->
      _e = if isTouch then e.touches[0] else e
      el = parentIfText(_e.target)

      touch =
        el: el
        x1: _e.clientX
        y1: _e.clientY

      toggleActiveState(false)
      onMove(e)

    onMove = (e) ->
      return unless touch?

      _e = if isTouch then e.touches[0] else e
      touch.x2 = _e.clientX
      touch.y2 = _e.clientY
      toggleActiveState(false)

    onEnd = ->
      return unless touch?

      touch.el.dispatchEvent(tapEvent) if nearEnough
      touch.el.focus() if touch.el.nodeName.match inputRegEx

      touch = null

      window.setTimeout (->
        toggleActiveState(true)
      ), minimumActiveMS

    onCancel = ->
      return unless touch?

      touch = null
      toggleActiveState(true)

    onClick = (e) ->
      unless e.target.type is "file"
        e.preventDefault()
        false

    Backbone?.on("didscroll", onCancel)

    document.body.addEventListener(_start, onStart)
    document.body.addEventListener(_move, onMove)
    document.body.addEventListener(_end, onEnd)

    if isTouch
      document.body.addEventListener("touchcancel", onCancel)
      document.body.addEventListener("click", onClick)

