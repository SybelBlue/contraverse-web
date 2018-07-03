// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html"

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

import socket from "./socket"
import ConvoSetup from "./convo_setup"
import ChatRoom from "./chat_room"
import SpecificQuestions from "./specific_questions"

// toggles debugging statements
socket.params.debuggingMode = false

// connects to socket to enable joining channels, DO NOT MOVE!
socket.connect();

// when in convomode (topic selection, specific questions, chatroom)...
if (socket.params.convoMode) {
  // ...counts number of segments in the url to determine route
  switch (socket.params.pathname.split('/').length) {
    case 1: // / or /new-convo or /category -> category/topic selection
      ConvoSetup.init(socket)
      break;
    case 2: // /category/topic -> specific question
      SpecificQuestions.init(socket)
      break;
    case 3: // /category/topic/id -> chatroom
      ChatRoom.init(socket)
      break;
  }
}

// logs socket in debugging mode
if (socket.params.debuggingMode)
  console.log(socket);
