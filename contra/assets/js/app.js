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

import {Socket} from "phoenix"
import ConvoSetup from "./convo_setup"
import ChatRoom from "./chat_room"
import SpecificQuestions from "./specific_questions"

let socket = new Socket("/socket", {
  params: { token: window.userToken }
})

socket.connect();
//counts number of / in the url
switch ((window.location.pathname.match(/\//g) || []).length) {
  case 0:
    break;
  case 1: //new convo, category
    ConvoSetup.init(socket)
    break;
  case 2:
    SpecificQuestions.init(socket)
    break;
  case 3:
    ChatRoom.init(socket)
    break;
}
