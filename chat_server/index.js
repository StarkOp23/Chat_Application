const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
require("./adapter/connectionDB")


app.use(
  cors({
    origin: "*",
  })
);


app.use(express.json());

const userRoutes = require("./Routes/userRoutes");
const chatRoutes = require("./Routes/chatRoutes");
const messageRoutes = require("./Routes/messageRoutes");

app.use("/user", userRoutes);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log(`Server is Running on Port ${PORT}...`));

// Implementing Socket.io

const io = require('socket.io')(server,
  {
    cors: {
      origin: '*',
    },
    pingTimeout: 60000,
  }
)

io.on('connection', (socket) => {

  // 
  socket.on("setup", (user) => {
    socket.join(user.data._id);
    socket.emit("connected")
  })

  // 
  socket.on("join chat", (room) => {
    socket.join(room);
  })

  socket.on("new message", (newMessageStatus) => {
    var chat = newMessageStatus.chat;
    if (!chat.users) {
      return console.log("chat.users not defined");
    }
    chat.users.forEach((user) => {
      if (user._id == newMessageStatus.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageReceived)
    })
  })


})