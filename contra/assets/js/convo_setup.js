// import {Presence, Socket} from "phoenix"
import CommonFunctions from "./common_functions"

let ConvoSetup = {
  init(socket) {
    let channel = this.join(socket)

    this.demo(socket)
  },

  join(socket) {
    let channelStr = "convo-setup:" + socket.params.pathname
    let channel = CommonFunctions.joinChannel(socket, channelStr, {})
    return channel
  },

  demo(socket) {
      let pathname = socket.params.pathname;
      if (pathname.length == 0) return;
      let itemList = document.getElementsByClassName("link-item")
      let currentURL = window.location.href
      let item, text, relativeLink, newLink, newHTML = ""
      for (var i = 0; i < itemList.length; i++) {
        item = itemList[i]
        text = item.innerHTML.trim()
        relativeLink = "/" + text

        relativeLink = CommonFunctions.replaceAll(relativeLink, " ", "-")

        if (!pathname.includes("new-convo"))
          newLink = currentURL + relativeLink
        else
          newLink = relativeLink

        if ((item.className.includes("topic")) == (socket.params.category == null)) continue;

        newHTML += `
          <li><a href="${newLink}">${text}</a></li>
        `
      }

      itemList = document.getElementById("link-list")
      if (itemList != null)
        itemList.innerHTML = newHTML
  },
}

export default ConvoSetup
