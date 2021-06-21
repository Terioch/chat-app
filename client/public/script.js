const socket = io("http://localhost:5500");

const form = document.getElementById("form");
const input = document.getElementById("input");
const chatBox = document.getElementById("chat-box");

// Retrieve data from server via a socket connection
socket.on("chat-message", message => {
	addNewMessage(message);
});

socket.on("user-connected", name => {
	addNewMessage(`${name} successfully connected`);
});

// Prompt user for name and make a server request
function getName() {
	const name = prompt("What is your name?");
	addNewMessage("You Joined");
	socket.emit("new-user", name);
}
getName();

// Handle form submit
form.addEventListener("submit", e => {
	e.preventDefault();
	const message = input.value;
	socket.emit("send-message", message); // Send message to web socket on server
	input.value = "";
});

// Append the new message to the chat box
function addNewMessage(message) {
	const element = `<li>${message}</li>`;
	chatBox.insertAdjacentHTML("beforeend", element);
}
