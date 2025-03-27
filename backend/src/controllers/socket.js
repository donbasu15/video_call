import { Server } from "socket.io";

let connections = {};
let messages = {};
let timeOnline = {};

const connectToSocket = (server) => {
  const io = new Server(server);
  io.on("connection", (socket) => {
    socket.on("join-call", (path) => {
      if (connections[path] === undefined) {
        connectinos[path] = [];
      }
      connections[path].push(socket.id);

      timeOnline[socket.id] = new Date();

      connections[path].forEach((element) => {
        io.to(element).emit("user-joined", socket.id);
      });

      if (messages[path] !== undefined) {
        for (let index = 0; index < messages[path].length; index++) {
          io.to(socket.id).emit(
            "chat-messages",
            messages[path][index]["data"],
            messages[path][index]["sender"],
            messages[path][index]["socket-id-server"]
          );
        }
      }
    });
    socket.on("signal", (toId, message) => {
      io.to(toId).emit("signal", socket.id, message);
    });
    socket.on("chat-message", (data, sender) => {
      const [matchingRoom, found] = Object.entries(connections).reduce(
        ([matchingRoom, isFound], [roomKey, roomValue]) => {
          if (!isFound && roomValue.includes(socket.id)) {
            return [roomKey, true];
          }
          return [roomKey, isFound];
        },
        ["", false]
      );
      if (found === true) {
        if (messages[matchingRoom] === undefined) {
          messages[matchingRoom] = [];
        }
        messages[matchingRoom].push({
          "sender": sender,
          "data": data,
          "socket-id-sender": socket.id,
        });
      }
    });

    socket.on("disconnect", () => {});
  });
  return io;
};

export default connectToSocket;
