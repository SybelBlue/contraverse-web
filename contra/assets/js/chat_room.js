import {Socket/*, Presence*/} from "phoenix"
import CommonFunctions from "./common_functions"

let ChatRoom = {
  init(socket) {
    this.join(socket)
  },

  join(socket) {
    let channelStr = socket.params.category + ":" + "insert-id-here" //fix
    let channel = CommonFunctions.joinChannel(socket, channelStr, {})
  },
}

export default ChatRoom
