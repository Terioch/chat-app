const socket = io("http://localhost:5500");

const form = document.getElementById("form");
const input = document.getElementById("input");

// Retrieve message from server via a socket connection
socket.on("chat-message", data => {
	console.log(data);
});

// Handle form submit
form.addEventListener("submit", e => {
	e.preventDefault();
	const message = input.value;
	socket.emit("send-message", message);
	input.value = "";
});
