const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("public"));

io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("chat", (msg) => {
        io.emit("chat", msg);
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

http.listen(3000, () => {
    console.log("AfghanConnect running on http://localhost:3000");
});