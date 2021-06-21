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
		const username = name ? name : "Anonymous";
		users[socket.id] = username;
		socket.broadcast.emit("user-connected", username);
	});

	// Send message to all clients excluding the initial sender client
	socket.on("send-message", message => {
		socket.broadcast.emit("chat-message", {
			name: users[socket.id],
			message,
		});
	});

	// Listen for when a user disconnects from the socket server
	socket.on("disconnect", () => {
		socket.broadcast.emit("user-disconnected", users[socket.id]);
		delete users[socket.id];
	});
});
