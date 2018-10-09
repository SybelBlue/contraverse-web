import {Presence} from "phoenix"

// the list of presences on the current channel
let presences = {}

let CommonFunctions = {
  // joins the channel at channelStr with the params on
  // the socket, sets up presence change operations,
  // prints relevant debug information
  //
  // params is passed in socket.channel(channelStr, params)
  // as well as searched for a params.onStateChange(change)
  // that defines a custom action for presence change on
  // the channel
  joinChannel(socket, channelStr, params) {
    // define the channel at channelStr
    let channel = socket.channel(channelStr, params)

    // on state change for presence, sync presence list,
    // if onStateChange is specfied, run it, else, run default

    // state change is a new list of presences
    channel.on("presence_state", state => {
      presences = Presence.syncState(presences, state);

      if (params.onStateChange != null)
        params.onStateChange(socket, presences);
      else
        this.logPresenceListHTML(socket, presences);
    })

    // state change is a new entry to existing list
    channel.on("presence_diff", diff => {
      presences = Presence.syncDiff(presences, diff);

      if (params.onStateChange != null)
        params.onStateChange(socket, presences);
      else
        this.logPresenceListHTML(socket, presences);
    })

    // join the channel with all responses logged
    channel.join()
      .receive("ok", resp => {
        console.log("Joined \"" + channelStr + "\" successfully", resp)
      })
      .receive("error", resp => {
        console.log("Unable to join \"" + channelStr + "\"", resp)
      })

    // when debug is on, print debug stack
    if (socket.params.debuggingMode)
      console.log(new Error("DEBUG STACK TRACE").stack)

    return channel
  },

  // fetches the full presence list
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

  // returns true if String source contains any
  // of the Strings in array targets
  includesAny(source, targets) {
    let srcLen = source.length, item

    for (let i = 0; i < targets.length; i++) {
      item = targets[i]

      if (item.length > srcLen)
        continue;
      if (source.includes(item))
        return true;
    }

    return false
  },


  // the sting used in innerHTML to represent all
  // users with id of length 0
  anonymousStr: "anonymous!",

  // generates inner HTML for a presence list
  generatePresenceListHTML(presences) {
    let response = ""

    Presence.list(presences, (id, {metas: [first, ...rest]}) => {
      let count = rest.length + 1;
      let label;

      if (id.length == 0)
        label = this.anonymousStr;
      else
        label = id;

      response += `<br>${label} (count: ${count})</br>`;
    })

    return response;
  },

  // checks if any users have an empty id field
  anonymousUsersPresent() {
    let out = false;
    Presence.list(presences, (id, {metas: [first, ...rest]}) => {
      if (id.length == 0)
        out = true;
    })
    return out;
  },

  // warns if anonymous users are present,
  // writes inner HTML for presences when
  // debug mode is on
  logPresenceListHTML(socket, presences) {
    if (this.anonymousUsersPresent())
      console.warn("Anonymous users detected");

    if (socket.params.debuggingMode)
      console.log(this.generatePresenceListHTML(presences));
  },
}

// defines property includesAny for String,
// see CommonFunctions.inculdesAny
Object.defineProperty(String.prototype, "includesAny", {
    value: function includesAny(targets) {
        return CommonFunctions.includesAny(this, targets);
    }
});

// defines property replaceAll for String,
// see CommonFunctions.replaceAll
Object.defineProperty(String.prototype, "replaceAll", {
    value: function replaceAll(target, replacement) {
        return CommonFunctions.replaceAll(this, target, replacement);
    }
});

export default CommonFunctions
