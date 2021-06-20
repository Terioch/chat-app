const socket = io("http://localhost:5500");

socket.on("chat-message", data => {
	console.log(data);
});
