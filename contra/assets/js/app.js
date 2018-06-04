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

// import socket from "./socket"
import ConvoSetup from "./convo_setup"

let itemList = document.getElementsByClassName("link-item")
let currentURL = window.location.href
let item, text, relativeLink, newLink, newHTML = ""
for (var i = 0; i < itemList.length; i++) {
  item = itemList[i]
  text = item.innerHTML
  relativeLink = "/" + text.trim().replace(" ", "-")

  if (window.location.pathname != "/new-convo")
    newLink = currentURL + relativeLink
  else
    newLink = relativeLink

  if ((text == "Gun Control") != (window.location.pathname == "/American-Politics")) continue;

  newHTML += `
    <li><a href="${newLink}">${text}</a></li>
  `
}

itemList = document.getElementById("link-list")
if (itemList != null)
  itemList.innerHTML = newHTML
