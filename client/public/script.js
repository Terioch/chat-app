const socket = io("http://localhost:5500");

const form = document.getElementById("form");
const input = document.getElementById("input");
const chatBox = document.getElementById("chat-box");

// Retrieve data from server via a socket connection
socket.on("chat-message", ({ name, message }) => {
	const element = `${name}: ${message}`;
	addNewMessage(element, "gray-500");
});

socket.on("user-connected", name => {
	const element = `${name} successfully connected`;
	addNewMessage(element, "blue-500");
});

socket.on("user-disconnected", name => {
	const remark = name.toLowerCase() === "rio" ? "winner" : "loser";
	addNewMessage(`${name} the ${remark} disconnected`, "red-600");
});

// Prompt user for name and make a server request
function getName() {
	const name = prompt("What is your name?");
	const element = "You Joined";
	addNewMessage(element, "blue-500");
	socket.emit("new-user", name);
}
getName();

// Handle form submit
form.addEventListener("submit", e => {
	e.preventDefault();
	const message = input.value;
	addNewMessage(`You: ${message}`, "green-500");
	socket.emit("send-message", message); // Send message to web socket on server
	input.value = "";
});

// Append the new message to the chat box
function addNewMessage(message, colour) {
	const classes = `bg-${colour} rounded-lg p-3 text-xl text-white`;
	const element = `<li class="${classes}">${message}</li>`;
	chatBox.insertAdjacentHTML("beforeend", element);
}
