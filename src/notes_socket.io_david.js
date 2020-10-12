//// SOCKET.IO ///

// for real-time communication
// based on WebSockets supported by browsers

// solves issue that usually the client requests stuff
// server only responding

// socket.io enables the server to send data unprompted by user

// server announcements possilbe!

// cilent request initiates WebSockets - handshake request

// server converts http conncetion to WebSockets connenction

// messages have no head, and are very quick as connection
// already established - feels fast - real time communication
// not peer2peer goes to server first

// done via "events" client can emit event - server is listening for events
// and vice versa

// socket.io:
const server = require("http").Server(app); // socket.io needs unmodified server obj - but we're handing it the express app (for anything that is not socket.io related)
const io = require("socket.io")(server, {
    origins: "localhost:8080 mysocialnetwork.herkouapp.com:*",
}); // for heroku the port is unknown so use *
// server has to be handed to socket.io, give it a list of origins
// after established handshake the browser creates a header with the protocol the hostname and the port
// server can reject connection due to origins - reject other ppl from other sites

// see server

// same user can have multiple sockets in different windows
// upon unintended disconnection it reconnects

// socket.emit // sends to that one connection

// io.emit // sends to all sockets

// socket.broadcast.emit("event-for-everybody-but-me") // emits to all but yourself (socket)

// onClick={
//     e => socket.emit(("yo", {data: "content"}))
// }

// cookies are headers! socket.io does not have headers - so no cookies

// socket connection needs to have cookieSession middleware! so we have the cookie

// io.sockets == all the connected sockets!

// io.sockets.emit == io.emit - same
// io.sockets.sockets // list of all sockets with ids
// io.sockets.sockets[socketId].emit("privateMessage");
