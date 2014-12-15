# Test whether the browser can toggle classes based on rules
do ->
  div = document.createElement("div")
  div.classList.toggle "t", false

  if div.classList.contains "t"
    console?.log "Overwriting toggle with force ability."
    DOMTokenList::toggle = (klass, rule) ->
      if @contains(klass) and !rule
        @remove klass
      else if rule or !rule?
        @add klass

      @contains klass
