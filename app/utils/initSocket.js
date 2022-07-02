const socketIO = require("socket.io");
function initialSocket(httpServer){
    const io = socketIO(httpServer, {
        cors: {
            origin: "*"
        }
    })
    return io
}
module.exports = {
    initialSocket
}