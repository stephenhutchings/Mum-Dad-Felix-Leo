# The userModel stores the user's info, which is persisted in LocalStorage.
app = require("app")

class UserModel extends Backbone.Model

  localStorage: new Backbone.LocalStorage("READER")

  initialize: ->
    @on "change", -> @save()
    @on "sync", @checkVersion, this

  checkVersion: (model) ->
    if @get("version") isnt @defaults.version
      console?.log? "New version: --> Reseting User Model"
      @set(@defaults)

  defaults:
    version: "0.0.1"

module.exports = UserModel
