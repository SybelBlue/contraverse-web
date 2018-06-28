import CommonFunctions from "./common_functions"

let SpecificQuestions = {
  init(socket) {
    let channel = this.join(socket)

    // load questions here
  },

  join(socket){
      let channelStr = "convo-setup:specific-questions"
      let channel = CommonFunctions.joinChannel(socket, channelStr, {})
      return channel
  },
}

export default SpecificQuestions
