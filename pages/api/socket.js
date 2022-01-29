import { Server } from "socket.io";

let messagesStore = [];

const ioHandler = (req, res) => {
    if (!res.socket.server.io) {
        const io = new Server(res.socket.server);

        io.on("connection", socket => {
            console.log(`  -> ${socket.id} connected`);
        
            socket.emit('updateMessages', messagesStore);

            socket.on('newMsg', msg => {
                messagesStore.push(msg);
                io.emit('updateMessages', messagesStore);
            });

            socket.on('disconnect', () => {
                console.log(`  <- ${socket.id} disconnected`);
            });
        });

        res.socket.server["io"] = io;
    }

    res.end();
};

export const config = {
    api: {
        bodyParser: false,
    },
};

export default ioHandler;
