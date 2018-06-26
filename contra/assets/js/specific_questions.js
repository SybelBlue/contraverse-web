let SpecificQuestions = {
  init(socket) {
    let channel = socket.channel("convo-setup:specific-questions", {})
    channel.join()
      .receive("ok", resp => { console.log("Joined successfully", resp) })
      .receive("error", resp => { console.log("Unable to join", resp) })
    console.log("specific_questions.js");
  },
}

export default SpecificQuestions
