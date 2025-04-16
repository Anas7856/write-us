// Navbar toggler
document
  .querySelector(".navbar-toggler")
  .addEventListener("click", function () {
    this.classList.toggle("active");
  });

// Theme toggler

// Assuming you have a button with an icon
function toggleDarkMode() {
  document.documentElement.classList.toggle("dark-mode");

  const isDarkMode = document.documentElement.classList.contains("dark-mode");
  localStorage.setItem("darkMode", isDarkMode);

  // Update button icon or text if you have one
  const toggleButton = document.getElementById("darkModeToggle");

  if (isDarkMode) {
    toggleButton.className = "bi bi-sun-fill light-mode-icon"; // Sun icon for "switch to light mode"
  } else {
    toggleButton.className = "bi bi-moon-stars-fill dark-mode-icon"; // Moon icon for "switch to dark mode"
  }
}

// Function to initialize dark mode based on saved preference
function initDarkMode() {
  // Check if user previously enabled dark mode
  const savedDarkMode = localStorage.getItem("darkMode");
  console.log("savedDarkMode", savedDarkMode);
  const toggleButton = document.getElementById("darkModeToggle");
  if (savedDarkMode === "true") {
    document.documentElement.classList.add("dark-mode");
    toggleButton.className = "bi bi-sun-fill light-mode-icon";
  } else {
    toggleButton.className = "bi bi-moon-stars-fill dark-mode-icon";
  }
}

// Call this function when the page loads
document.addEventListener("DOMContentLoaded", initDarkMode);

// Clock handler
function updateClock() {
  const now = new Date();

  // Convert time to GMT
  const hours = now.getUTCHours();
  const minutes = now.getUTCMinutes();
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} GMT`;

  document.getElementById("timeDisplay").innerText = formattedTime;

  const icon = document.getElementById("darkModeToggle");

  // Morning: 6 AM to 6 PM UTC
  //   if (hours >= 6 && hours < 18) {
  //     icon.className = "bi bi-sun-fill"; // Bright sun icon
  //   } else {
  //     icon.className = "bi bi-moon-stars-fill"; // Moon icon
  //   }
}

// Update every second
setInterval(updateClock, 1000);
updateClock(); // Initial call

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

//   Chatbox
document.addEventListener("DOMContentLoaded", function () {
  const chatButton = document.getElementById("chatButton");
  const chatWindow = document.getElementById("chatWindow");
  const closeChat = document.getElementById("closeChat");
  const messageInput = document.getElementById("messageInput");
  const sendButton = document.getElementById("sendButton");
  const chatBody = document.getElementById("chatBody");

  // Toggle chat window
  chatButton.addEventListener("click", function () {
    chatWindow.style.display =
      chatWindow.style.display === "flex" ? "none" : "flex";
  });

  // Close chat window
  closeChat.addEventListener("click", function () {
    chatWindow.style.display = "none";
  });

  // Send message function
  function sendMessage() {
    const message = messageInput.value.trim();
    if (message === "") return;

    const now = new Date();
    const hours = now.getHours() % 12 || 12;
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const ampm = now.getHours() >= 12 ? "PM" : "AM";
    const timeString = `${hours}:${minutes} ${ampm}`;

    // Create user message element
    const userMessage = document.createElement("div");
    userMessage.className = "message-container user";
    userMessage.innerHTML = `
        <div class="message">${message}</div>
        <div class="message-time">${timeString}</div>
      `;

    chatBody.appendChild(userMessage);
    messageInput.value = "";
    chatBody.scrollTop = chatBody.scrollHeight;

    // Auto-reply after a delay
    setTimeout(function () {
      const responses = [
        "Thank you for your message. How can I help you?",
        "Our team will get back to you shortly.",
        "Is there anything specific you'd like to know about our services?",
        "I appreciate your interest in our writing services!",
      ];

      const randomResponse =
        responses[Math.floor(Math.random() * responses.length)];

      const supportMessage = document.createElement("div");
      supportMessage.className = "message-container support";
      supportMessage.innerHTML = `
          <div class="message">${randomResponse}</div>
          <div class="message-time">${timeString}</div>
        `;

      chatBody.appendChild(supportMessage);
      chatBody.scrollTop = chatBody.scrollHeight;
    }, 1000);
  }

  // Send on button click
  sendButton.addEventListener("click", sendMessage);

  // Send on Enter key
  messageInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  });
});
