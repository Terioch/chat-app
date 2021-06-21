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

// Stores all users by name
const users = {};

// Initialize and emit a socket connection each time a user enters our website
io.on("connection", socket => {
	// Connects a new user by name and stores that user within our users object
	socket.on("new-user", name => {
		users[socket.id] = name;
		socket.broadcast.emit("user-connected", name);
	});

	// Send message to all clients excluding the initial sender client
	socket.on("send-message", message => {
		socket.broadcast.emit("chat-message", {
			name: users[socket.id],
			message,
		});
	});
});
