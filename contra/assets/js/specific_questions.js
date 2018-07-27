import CommonFunctions from "./common_functions"

let SpecificQuestions = {
  init(socket) {
    let channel = this.join(socket)

    // load questions here
    let area = document.getElementById("continue-link")

    // matchmaking and chat_id generation here
    let id = "temp_id" //fix
    let link = window.location.href + "/" + id
    area.innerHTML = `<a href=${link}>Continue to Chat</a>`

    return channel;
  },

  join(socket) {
      let channelStr = "convo-setup:specific-questions"
      let channel = CommonFunctions.joinChannel(socket, channelStr, {})
      return channel
  },

  onContinueToChat() {

  },
}

export default SpecificQuestions
