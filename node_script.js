const path = require('path');
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);


io.on("connection", (socket) => {
    console.log(`Client with ID ${socket.id} connected`);

    socket.on('disconnect', () => {
        console.log(`Client with ID: ${socket.id} disconnected`);
    });

});


/* ===========which directories client requires ========================*/
const dirNeededByUser = [
    'src',
    'libs',
    'assets'
];

dirNeededByUser.forEach((dir) => {
    const fullPath = path.join(__dirname, dir);
    app.use("/"+dir, express.static(fullPath));
});
/* ===========END which directories client requires ====================*/


// Route for the homepage
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});




// Start the server
const port = 1234;
httpServer.listen(port, () => {
        console.log(`Server started on port ${port}`);
});

