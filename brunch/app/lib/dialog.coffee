# Proxy for various dialogs. Delegates to native browser dialogs in
# environments where Cordova plugins are unavailable.

class Dialog
  prompt: (msg, callback, title, btns = ["Cancel", "OK"], placeholder = "") ->
    if navigator.notification?.prompt
        navigator.notification.prompt(
          msg
          callback
          title
          btns
          placeholder
        )
      else
        input = window.prompt(msg, placeholder)
        callback?(
          input1: input
          buttonIndex: if input then 2 else 1
        )

module.exports =
  new Dialog
