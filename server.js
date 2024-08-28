const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const { v4: uuidV4 } = require("uuid");

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect(`/${uuidV4()}`);
  // uuidV4 generates a dynamic url
});

app.get("/:room", (req, res) => {
  res.render("room", { roomId: req.params.room });
});

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => {
    console.log("roomId:", roomId, "userId:", userId);
    if (roomId && userId) {
      socket.join(roomId);
      socket.to(roomId).emit("user-connected", userId);
    } else {
      console.error("roomId or userId is undefined");
    }
  });
});

server.listen(4000);
