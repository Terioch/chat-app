const socketio = require("socket.io");

// Create a socket server and allow cross origin support
const PORT = 5500 || process.env.PORT;
const io = socketio(PORT, {
	cors: {
		origin: "*",
		methods: ["PUT", "GET", "POST", "DELETE", "OPTIONS"],
		allowedHeaders: ["secretHeader"],
		credentials: true,
	},
});

// Initialize and emit a socket connection each time a user enters our website
io.on("connection", socket => {
	console.log("new user");
	socket.emit("chat-message", "Hello, World");
});
