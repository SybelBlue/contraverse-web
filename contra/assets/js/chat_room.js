import CommonFunctions from "./common_functions"

let ChatRoom = {
  init(socket) {
    let channel = this.join(socket);

    this.listenForChats(channel);

    return channel;
  },

  join(socket) {
    socket.params.chatroomData = this.getRoomData()
    let params = socket.params
    let channelStr = params.category + ":" + params.chatroomData.id
    let channel =
      CommonFunctions
      .joinChannel(socket, channelStr, {onStateChange: this.markPresence})
    return channel
  },

  markPresence(socket, presences) {
    CommonFunctions.logPresenceListHTML(socket, presences);

    let presenceList = document.getElementById("presence-list");

    presenceList.hidden = !socket.params.debuggingMode;

    presenceList.innerHTML = CommonFunctions.generatePresenceListHTML(presences);
  },

  // returns object literal of room data ////////////TODO!!!!!!!!
  getRoomData() {
    let pathname = window.location.pathname
    let chat_id = pathname.substring(pathname.lastIndexOf('/') + 1)

    // returns object literal of room data, ////////////FIX!!!!!!!!
    return {
      id: chat_id,
      active: true
    }
  },

  /// Prepares all relevant items for sending and recieving messages
  listenForChats(channel) {
    //this.prepUsernameField() old code, keeping just in case
    this.setMessageTransmitter(channel)
    this.setMessageReceiver(channel)
  },

  /// Prepares all relevant logic for transmitting a message
  setMessageTransmitter(channel) {
    //Get fields for username and message
    let messageField = this.getMessageField();
    // let usernameField = this.getUsernameField()

    //Handle pressing enter from the message-field
    messageField.addEventListener('keypress', e => this.onSubmit(channel, e));

    let sendButton = document.getElementById("send-button");
    //Handles hitting the send button
    sendButton.addEventListener('click', e => this.sendMessage(channel, e));
  },

  onSubmit(channel, e){
    if (e.keyCode == 13){  //Continue only if hit enter (13)
      this.sendMessage(channel, e);
    }
  },

  sendMessage(channel, e){
    let messageField = this.getMessageField()

    //Get username and message
    let username = "test_username"//usernameField.value
    let message = messageField.value.trim()

    //force having a username
    // if (username.length === 0) {
      // usernameField.select();
      // return;
    // }

    //force a non-empty message
    if (message.length > 0) {
      //gather a timestamp and reset the message-field's value
      let timestamp = new Date().toLocaleTimeString()
      messageField.value = ""

      //broadcast to the rest of the channel a chat was sent with 'shout'
      channel.push('shout', {username: username, timestamp: timestamp, message: message})
    }
  },

  // Prepares all relevant logic for recieving a message
  setMessageReceiver(channel) {
    channel.on('shout', payload => {
      let messageList = document.getElementById("chat-area");
      let messageElement = this.createMessageHTML(payload);
      // store text as
      messageList.innerHTML += messageElement;
      messageList.scrollTop = messageList.scrollHeight;
    })
  },

  createMessageHTML(payload) {
    //FIX THIS
    let sent = true/*username == payload.username*/? "sent" : "";

    return `<div class="message ${sent}"> ${payload.message} </div>`;
  },

  getMessageField(){
    return document.getElementById("00x00");
  },
}

export default ChatRoom
