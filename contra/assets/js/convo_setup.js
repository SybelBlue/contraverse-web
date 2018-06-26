// import {Presence, Socket} from "phoenix"

let ConvoSetup = {
  init(socket) {
    this.demo(window.location.pathname)
    console.log(socket.topic);
  },

  demo(pathname) {
      if (pathname.length == 0) return;
      let itemList = document.getElementsByClassName("link-item")
      let currentURL = window.location.href
      let item, text, relativeLink, newLink, newHTML = ""
      for (var i = 0; i < itemList.length; i++) {
        item = itemList[i]
        text = item.innerHTML
        relativeLink = "/" + text.trim().replace(" ", "-")

        if (pathname != "/new-convo")
          newLink = currentURL + relativeLink
        else
          newLink = relativeLink

        if ((text == "Gun Control") != (pathname == "/American-Politics")) continue;

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
