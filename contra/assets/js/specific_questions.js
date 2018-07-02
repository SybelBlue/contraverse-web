import CommonFunctions from "./common_functions"

let SpecificQuestions = {
  init(socket) {
    let channel = this.join(socket)

    // load questions here
    let area = document.getElementById("question-area")

    // matchmaking and chat_id generation here
    let id = "temp_id" //fix
    let link = window.location.href + "/" + id
    area.innerHTML = `<a href=${link}>Continue to Chat</a>`
  },

  join(socket){
      let channelStr = "convo-setup:specific-questions"
      let channel = CommonFunctions.joinChannel(socket, channelStr, {})
      return channel
  },
}

export default SpecificQuestions
