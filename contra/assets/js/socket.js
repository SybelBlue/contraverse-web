// Exports a socket made for convo setup and chat
// The exported socket has category, topic, and chatroomData
// fields that are filled upon entry to the proper pages

import {Socket} from "phoenix"

// Setting up the params fields
// pathname stores everything beyond the first slash in lowercase, ie
// www.contra.com/American-Politics/Gun-Control -> american-poltics/gun-control
let pathname = window.location.pathname.substring(1).toLowerCase()
// category is filled with one of the several major topic categories
// www.contra.com/American-Politics/Gun-Control -> american-poltics
let category = null

// topic is filled with the specific topic
// www.contra.com/American-Politics/Gun-Control/<id> -> gun-control
let topic = null

if (!pathname.includes("/")) {
  if (!pathname.includes("new-convo"))
    category = pathname
} else {
  let split = pathname.split('/')
  category = split[0]
  topic = split[1]
}

// chatroomData is filled with relevant chat data: id, active state, etc
let chatroomData = null

let socket = new Socket("/socket", {
  params: {
    token: window.userToken,
    pathname: pathname,
    category: category,
    topic: topic,
    chatroomData: chatroomData,
    debuggingMode: false //!!! also toggled in ./app.js
  }
})

export default socket
// To use Phoenix channels, the first step is to import Socket
// and connect at the socket path in "lib/web/endpoint.ex":

// When you connect, you'll often need to authenticate the client.
// For example, imagine you have an authentication plug, `MyAuth`,
// which authenticates the session and assigns a `:current_user`.
// If the current user exists you can assign the user's token in
// the connection for use in the layout.
//
// In your "lib/web/router.ex":
//
//     pipeline :browser do
//       ...
//       plug MyAuth
//       plug :put_user_token
//     end
//
//     defp put_user_token(conn, _) do
//       if current_user = conn.assigns[:current_user] do
//         token = Phoenix.Token.sign(conn, "user socket", current_user.id)
//         assign(conn, :user_token, token)
//       else
//         conn
//       end
//     end
//
// Now you need to pass this token to JavaScript. You can do so
// inside a script tag in "lib/web/templates/layout/app.html.eex":
//
//     <script>window.userToken = "<%= assigns[:user_token] %>";</script>
//
// You will need to verify the user token in the "connect/2" function
// in "lib/web/channels/user_socket.ex":
//
//     def connect(%{"token" => token}, socket) do
//       # max_age: 1209600 is equivalent to two weeks in seconds
//       case Phoenix.Token.verify(socket, "user socket", token, max_age: 1209600) do
//         {:ok, user_id} ->
//           {:ok, assign(socket, :user, user_id)}
//         {:error, reason} ->
//           :error
//       end
//     end
//
// Finally, pass the token on connect as below. Or remove it
// from connect if you don't care about authentication.

// socket.connect()

// Now that you are connected, you can join channels with a topic:
// let channel = socket.channel("topic:subtopic", {})
// channel.join()
//   .receive("ok", resp => { console.log("Joined successfully", resp) })
//   .receive("error", resp => { console.log("Unable to join", resp) })
