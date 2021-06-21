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

// Send message to all clients excluding the initial sender client
function sendMessage(socket) {
	try {
		socket.on("send-message", message => {
			socket.broadcast.emit("chat-message", message);
		});
	} catch (err) {
		console.error(err.message);
	}
}

// Connects a new user by name and stores that user within our users object
function connectNewUser(socket) {
	try {
		socket.on("new-user", name => {
			users[socket.id] = name;
			socket.broadcast.emit("user-connected", name);
		});
	} catch (err) {
		console.error(err.message);
	}
}

// Initialize and emit a socket connection each time a user enters our website
io.on("connection", socket => {
	connectNewUser(socket);
	sendMessage(socket);
});
