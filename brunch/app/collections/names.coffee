class NamesCollection extends Backbone.Collection

  url: "data/names.json"

  initialize: ->
    @prefiltered = {}

  ready: ->
    for i in [3..9]
      @prefiltered[i] = @filter (m) -> m.get("name").length is i

  randomName: (length) ->
    reduced = @prefiltered[length]

    if reduced
      random = Math.floor reduced.length * Math.random()
      reduced[random].get("name")
    else
      random = Math.floor @length * Math.random()
      @at(random).get("name")

module.exports = NamesCollection
