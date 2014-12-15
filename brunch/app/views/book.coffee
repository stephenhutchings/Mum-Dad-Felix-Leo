app = require "app"
prefix = require "lib/prefix"
player = require "lib/audio"

# Templates
template = require "./templates/book"

class BookView extends Backbone.View

  id: "book-view"

  events:
    "touchstart .char": "startChar"
    "touchmove .char": "moveChar"
    "touchend .char": "endChar"

  initialize: (params, callback) ->
    @render(params)
    callback()

    window.addEventListener "orientationchange", =>
      @onOrientationChange()
      @sizeContent()
      @scrollView?.refresh()
      @onScrollEnd(true)

  render: (params) ->
    @el.innerHTML = template()

    @pages = @el.querySelectorAll(".page")

    @sizeContent()

    @currentPage = params.page

    window.setTimeout (=>
      @wrapLetters()
      @applyDelays()

      window.setTimeout (=>
        @scrollView = new IScroll @el,
          scrollX: true
          scrollY: false
          snap: true
          tap: "scrolltap"
          deceleration: 0.002
          indicators:
            el: "#indicator"
            resize: true
            shrink: "clip"
            listenY: false
            ignoreBoundaries: true

        @scrollView.goToPage(params.page, 0, 0)
        @scrollViewReady()
      ), 100
    ), 200

  scrollViewReady: ->
    @scrollView.on "scrollEnd", => @onScrollEnd()
    @scrollView.on "scrollStart", => @onScrollStart()

    @onScrollEnd(true)

  onScrollStart: ->
    @el.classList.add("scrolling")

  onScrollEnd: (force) ->
    @el.classList.remove("scrolling")

    i = +@scrollView?.currentPage?.pageX

    if force is true or i isnt @currentPage
      @currentPage = i
      app.router.navigate("page/#{i}")

      for page, j in @pages
        page.classList.remove "active"
        page.classList.remove "hidden"
        page.classList.toggle "inactive", i isnt j

      for char in @el.querySelectorAll(".char")
        char.style[prefix "transform"] = ""

      @pages.item(i).querySelector(".text")?.offsetWidth
      @pages.item(i).querySelector(".char")?.offsetWidth

    @pages.item(i).classList.add "active"

    for char in @pages.item(i).querySelectorAll(".char")
      char.style[prefix "transform"] =
        "translate3d(0, 0, 0) scale(1) rotate(#{_.random(-12, 12)}deg)"

  startChar: (e) ->
    @canRotate = true
    e.stopImmediatePropagation()
    @moveChar(e)

  moveChar: (e) ->
    return unless @canRotate

    e.preventDefault()

    tar = document.elementFromPoint(e.touches[0].pageX, e.touches[0].pageY)
    return unless tar?.classList.contains "char"

    rotation = _.random(-12, 12) - 360 * _.random(-2, 2)
    transitionDelay = tar.style[prefix "transitionDelay"]

    tar.style[prefix "pointer-events"] = "none"
    tar.style[prefix "transitionDelay"] = "0ms"
    tar.style[prefix "transform"] =
      "translate3d(0, 0, 0) scale(1.2) rotate(#{rotation}deg)"

    if tar.dataset.sound
      player tar.dataset.sound

    window.setTimeout (->
      tar.style[prefix "pointer-events"] = ""
      tar.style[prefix "transform"] =
          "translate3d(0, 0, 0) scale(1) rotate(#{rotation}deg)"
      tar.offsetWidth
      tar.style[prefix "transitionDelay"] = transitionDelay
    ), 300

  endChar: (e) ->
    @canRotate = false

  wrapLetters: ->
    for el, i in @el.querySelectorAll("p")
      count = 0
      content = ""
      replace = (w) ->
        count++
        switch w
          when " "
            "&nbsp;"
          when ""
            "<br />"
          else
            "<span class='char char-#{count}'>#{w}</span>"

      for node in el.childNodes
        if node.nodeType is 3
          content += node.textContent.replace(/./g, replace)

        else if node.nodeType is 1 and node.innerHTML isnt ""
          node.innerHTML =
            node.innerHTML.replace /(([\w'])(?![^(<|\&)]*?(>|;))|(\&\w+;))/g,
              replace

          content += node.outerHTML
        else
          content += node.outerHTML

      el.innerHTML = content

  applyDelays: ->
    for el, j in @el.querySelectorAll("p")
      j = 0
      p = el
      j++ while p = p.previousSibling

      for char, i in el.querySelectorAll ".char"
        char.style[prefix "transition"] =
          "all 600ms #{i * 40 + j * 1500}ms cubic-bezier(.36,1.47,.54,.89)"

  sizeContent: ->
    width = window.innerWidth

    for page in @pages
      page.style.width = width + "px"
      page.classList.add("hidden")

    @el.querySelector("#pages").style.width = width * @pages.length + "px"

  onOrientationChange: (force) ->
    @el.classList.toggle("landscape", window.orientation % 180 isnt 0)
    @el.classList.toggle("portrait", window.orientation % 180 is 0)

  stopListening: ->
    super

    window.removeEventListener "orientationchange"

module.exports = BookView
