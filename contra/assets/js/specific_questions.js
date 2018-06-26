import CommonFunctions from "./common_functions"

let SpecificQuestions = {
  init(socket) {
    let channelStr = "convo-setup:specific-questions"
    let channel = CommonFunctions.joinChannel(socket, channelStr, {})
  },
}

export default SpecificQuestions
