const
    port = 3000,
    dev = process.env.NODE_ENV !== 'production',
    next = require('next'),

    app = require('express')(),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    nextApp = next({ dev }),
    nextHandler = nextApp.getRequestHandler();


io.on("connection", socket => {
    console.log(`  -> ${socket.id} connected`);

    socket.on('disconnect', () => {
		console.log(`  <- ${socket.id} disconnected`);
    });
});


nextApp.prepare().then(() => {
    app.all('*', (req, res) => {
        return nextHandler(req, res);
    });

    server.listen(port, () => {
        console.log("Server started on port 3000")
    });
});