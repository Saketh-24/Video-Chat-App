// Connect to the Socket.IO server running on localhost:4000
const socket = io("http://localhost:4000");
const videoGrid = document.getElementById("video-grid");
var myPeer = new Peer(undefined, {
  host: "/",
  port: "3001",
});

const myVideo = document.createElement("video");
myVideo.muted = true;

navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
    addVideoStream(myVideo, stream);

    // Listen for the 'user-connected' event from the server
    socket.on("user-connected", (userId) => {
      // console.log("User connected:", userId);
      connectToNewUser(userId, stream);
    });
  });

myPeer.on("open", (id) => {
  // Emit the 'join-room' event with room ID and user ID
  socket.emit("join-room", ROOM_ID, id);
});

function addVideoStream(video, stream) {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  videoGrid.append(video);
}
