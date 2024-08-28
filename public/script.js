// Connect to the Socket.IO server running on localhost:4000
const socket = io("http://localhost:4000");

socket.on("connect", () => {
  console.log("Connected to server");

  // Emit the 'join-room' event with room ID and user ID
  socket.emit("join-room", ROOM_ID, 20);
});

// Listen for the 'user-connected' event from the server
socket.on("user-connected", (userId) => {
  console.log("User connected:", userId);
});
