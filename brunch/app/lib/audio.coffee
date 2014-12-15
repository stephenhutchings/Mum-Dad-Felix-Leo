# Empty style in which we can check for the existence of CSS property support.
emptyStyle = document.createElement("div").style

AudioPlayer = ->
  @loadAudio()
  return this

AudioPlayer:: =
  paths:
    "bark": "bark.mp3"
    "quack": "quack.mp3"

  loadAudio: ->
    @sounds = {}
    for key, val of @paths
      @sounds[key] = new Audio("192.168.0.6:3333/mp3/" + val)

  play: (sound) ->
    @sounds[sound]?.play?()

player = new AudioPlayer()

# Wrap the prefix function to provide quick access to the good stuff.
module.exports = (sound) -> player.play(sound)
