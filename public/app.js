const socket = io();

const loginPage = document.getElementById("loginPage");
const chatPage = document.getElementById("chatPage");
const input = document.getElementById("msg");
const chat = document.getElementById("chat");
const usernameInput = document.getElementById("usernameInput");

let username = null;
let replyingTo = null;

// Login
function login() {
    const name = usernameInput.value.trim();
    if (!name) {
        alert("Enter a username!");
        return;
    }
    username = name;
    loginPage.style.display = "none";
    chatPage.style.display = "block";
    addMessage( + username + " joined the chat");
}

// Send message on Enter (Shift+Enter for newline)
input.addEventListener("keydown", function(event) {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        send();
    }
});

// Click message to reply
chat.addEventListener("click", function(e) {
    if (e.target.classList.contains("message")) {
        replyingTo = e.target.textContent;
        input.placeholder = "Replying to: " + replyingTo;
        input.focus();
    }
});

// Send function
function send() {
    let msg = input.value.trim();
    if (!msg) return;

    let finalMsg = replyingTo ? `↪ ${replyingTo}\n${msg}` : msg;

    socket.emit("chat", { username, msg: finalMsg });

    replyingTo = null;
    input.value = "";
    input.placeholder = "Type message";
}

// Receive message
socket.on("chat", (data) => {
    const div = document.createElement("div");
    div.className = data.username === username ? "message me" : "message other";
    div.textContent = `${data.username}: ${data.msg}`;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
});

// Helper for system messages
function addMessage(text) {
    const div = document.createElement("div");
    div.className = "message";
    div.textContent = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}