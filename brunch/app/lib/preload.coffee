# Preload images before hiding splash
Preloader =
  initialize: ->
    count = 0
    extraDelayTimeout = 300
    didNotFireTimeout = 3000

    imageRegEx = /(file|http)\:([^\)]+)(png|gif|jpeg|jpg)/

    hideSplashScreen = (msg = "") ->
      window.clearTimeout(didNotFireTimeout)

      window.setTimeout (->
        navigator.splashscreen?.hide()
        document.documentElement.classList.add "preloaded"
        log "hideSplashScreen() #{msg}"
      ), extraDelayTimeout

    # Unless there is an error, increase the count and check whether we're done
    onLoad = (src, images, err) ->
      count++ unless err
      if count is images.length
        log "✔ success #{count} images"
        hideSplashScreen()

    # If there's an error, log it, remove from images and trigger hasLoaded
    # with an error
    onError = (src, images) ->
      log "✕ error " + src
      images.splice(images.indexOf(src), 1)
      onLoad(src, images, true)

    # For every stylesheet, add to array and grab all the unique image urls
    loadImages = ->
      images = []
      log("initialize()")

      for styleSheet in document.styleSheets
        images = images.concat(
          Array.prototype.slice.call(styleSheet.cssRules)
          # Any reference to an image
          .map( (c) ->
            (c.cssText.match(imageRegEx) or [])[0]
          )

          # Exists and is unique
          .filter( (c, i, arr) -> c and arr.indexOf(c) is i)

          # @2x versions for retina screens
          .filter( (c) -> !!c.match("@2x") is (window.devicePixelRatio > 1) )
        )

      # Straight to load if there's none to be had
      return hideSplashScreen() unless images.length > 0

      # Add loading callbacks before changing source
      images.forEach (src) ->
        img = new Image()
        img.onload =  -> onLoad(src, images)
        img.onerror = -> onError(src, images)
        img.src = src

    log = ->
      for argument in arguments
        type = "%s" if typeof (argument) is "string"
        type = "%d" if typeof (argument) is "number"
        type = "%O" if typeof (argument) is "object"

        console?.log?("%cPRELOADER →" + type,
                      "color:#333;background:#eee;padding:0 4px;",
                      argument)

    # Get started by showing the splashscreen and loading the images
    navigator?.splashscreen?.show()
    loadImages()

    # If it takes this long, continue anyway
    didNotFireTimeout = window.setTimeout (->
      hideSplashScreen("timed out")
    ), didNotFireTimeout

module.exports = Preloader
