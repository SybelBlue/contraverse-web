let CommonFunctions = {
  // joins the channel at channelStr with the params on the socket
  joinChannel(socket, channelStr, params) {
    let channel = socket.channel(channelStr, params)

    channel.join()
      .receive("ok", resp => { console.log("Joined \"" + channelStr + "\" successfully", resp) })
      .receive("error", resp => {console.log("Unable to join \"" + channelStr + "\"", resp)})

    if (socket.params.debuggingMode)
      console.log(new Error("DEBUG STACK TRACE").stack)

    return channel
  },
}
export default CommonFunctions
