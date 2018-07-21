import {Presence} from "phoenix"

let anonymousStr = "<anonymous>"
let presences = {}

let CommonFunctions = {
  // joins the channel at channelStr with the params on
  // the socket
  joinChannel(socket, channelStr, params) {
    let channel = socket.channel(channelStr, params)

    channel.on("presence_state", state => {
      presences = Presence.syncState(presences, state)
      try {
        params.onStateChange(presences)
      } catch (e) {
        this.logPresenceListHTML(socket, presences);
      }
    })

    channel.on("presence_diff", diff => {
      presences = Presence.syncDiff(presences, diff)
      try {
        params.onStateChange(presences)
      } catch (e) {
        this.logPresenceListHTML(socket, presences)
      }
    })


    channel.join()
      .receive("ok", resp => { console.log("Joined \"" + channelStr + "\" successfully", resp) })
      .receive("error", resp => { console.log("Unable to join \"" + channelStr + "\"", resp) })

    if (socket.params.debuggingMode)
      console.log(new Error("DEBUG STACK TRACE").stack)

    return channel
  },

  getPresences() {
    return presences;
  },

  // replaces all instances of target with
  // replacement in the source string
  replaceAll(source, target, replacement) {
    if (target.length == 0) return source;
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

  generatePresenceListHTML(presences) {
    let response = ""

    Presence.list(presences, (id, {metas: [first, ...rest]}) => {
      let count = rest.length + 1
      if (id.length == 0) id = anonymousStr
      response += `<br>${id} (count: ${count})</br>`
    })

    return response;
  },

  anonymousUsersPresent() {
    let out = false;
    Presence.list(presences, (id, {metas: [first, ...rest]}) => {
      if (id.length == 0)
        out = true;
    })
    return out;
  },

  logPresenceListHTML(socket, presences) {
    if (this.anonymousUsersPresent())
      console.warn("Anonymous users detected");

    if (socket.params.debuggingMode)
      console.log(this.generatePresenceListHTML(presences));
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
