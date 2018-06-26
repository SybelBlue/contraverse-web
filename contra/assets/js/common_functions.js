let CommonFunctions = {
  joinChannel(socket, channelStr, params) {
    let channel = socket.channel(channelStr, params)
    channel.join()
      .receive("ok", resp => { console.log("Joined \"" + channelStr + "\" successfully", resp) })
      .receive("error", resp => {
        console.log("Unable to join \"" + channelStr + "\"", resp) 
      })

    return channel
  },
}
export default CommonFunctions
