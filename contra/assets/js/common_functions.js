let CommonFunctions = {
  // joins the channel at channelStr with the params on
  // the socket
  joinChannel(socket, channelStr, params) {
    let channel = socket.channel(channelStr, params)

    channel.join()
      .receive("ok", resp => { console.log("Joined \"" + channelStr + "\" successfully", resp) })
      .receive("error", resp => { console.log("Unable to join \"" + channelStr + "\"", resp) })

    if (socket.params.debuggingMode)
      console.log(new Error("DEBUG STACK TRACE").stack)

    return channel
  },

  // replaces all instances of target with
  // replacement in the source string
  replaceAll(source, target, replacement) {
    let str = source

    while (str.includes(target))
      str = str.replace(target, replacement);

    return str
  },

  includesAny(source, targets) {
    let srcLen = source.length, item

    for (let i = 0; i < targets.length; i++) {
      item = targets[i]

      if (item.length > srcLen) continue
      if (source.includes(item)) return true
    }

    return false
  },
}

Object.defineProperty(String.prototype, "includesAny", {
    value: function includesAny(targets) {
        return CommonFunctions.includesAny(this, targets);
    }
});

Object.defineProperty(String.prototype, "replaceAll", {
    value: function replaceAll(target, replacement) {
        return CommonFunctions.replaceAll(this, target, replacement);
    }
});

export default CommonFunctions
