// admin.js
const ADMIN_PASSWORD = "Password123";

async function loginAdmin() {
    const password = document.getElementById("adminPassword").value;
    const loginMessage = document.getElementById("loginMessage");
    const loginSection = document.getElementById("loginSection");
    const adminSection = document.getElementById("adminSection");

    if (password === ADMIN_PASSWORD) {
        loginMessage.textContent = "Login successful!";
        loginMessage.style.color = "green";
        
        setTimeout(() => {
            loginSection.style.display = "none";
            adminSection.style.display = "block";
            loadMessages();
        }, 500);
        
    } else {
        loginMessage.textContent = "Incorrect password!";
        loginMessage.style.color = "red";
    }
}

async function loadMessages() {
    try {
        console.log("Loading messages...");
        const response = await fetch("/api/contact");
        
        if (!response.ok) {
            throw new Error("HTTP error! status: " + response.status);
        }
        
        const messages = await response.json();
        console.log("Messages loaded:", messages);
        
        const messagesList = document.getElementById("messagesList");
        messagesList.innerHTML = "";

        if (messages.length === 0) {
            messagesList.innerHTML = "<p>No messages found.</p>";
            return;
        }

        messages.forEach(msg => {
            const messageDiv = document.createElement("div");
            messageDiv.className = "message-item";
            
            // Use string concatenation instead of template literals to avoid syntax issues
            messageDiv.innerHTML = 
                '<div class="message-header">' +
                '<strong>' + msg.name + '</strong> (' + msg.email + ')' +
                '<span class="message-date">' + new Date(msg.date).toLocaleString() + '</span>' +
                '</div>' +
                '<div class="message-content">' + msg.message + '</div>' +
                '<button onclick="deleteMessage(\'' + msg._id + '\')" class="delete-btn">Delete</button>' +
                '<hr>';
                
            messagesList.appendChild(messageDiv);
        });
    } catch (error) {
        console.error("Error loading messages:", error);
        document.getElementById("messagesList").innerHTML = "<p>Error loading messages: " + error.message + "</p>";
    }
}

async function deleteMessage(messageId) {
    if (!confirm("Are you sure you want to delete this message?")) {
        return;
    }

    try {
        console.log("Deleting message:", messageId);
        const response = await fetch("/api/contact/" + messageId, {
            method: "DELETE",
            headers: {
                "x-admin-password": ADMIN_PASSWORD
            }
        });

        const result = await response.json();
        console.log("Delete response:", result);

        if (response.ok) {
            alert("Message deleted successfully!");
            await loadMessages();
        } else {
            alert("Failed to delete message: " + result.error);
        }
    } catch (error) {
        console.error("Error deleting message:", error);
        alert("Error deleting message: " + error.message);
    }
}

// Allow pressing Enter in password field
document.getElementById("adminPassword").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        loginAdmin();
    }
});

console.log("✅ admin.js loaded successfully");



/*
// admin.js
const ADMIN_PASSWORD = "Password123"; // Make sure this matches your .env

async function loginAdmin() {
    const password = document.getElementById("adminPassword").value;
    const loginMessage = document.getElementById("loginMessage");
    const loginSection = document.getElementById("loginSection");
    const adminSection = document.getElementById("adminSection");

    if (password === ADMIN_PASSWORD) {
        loginMessage.textContent = "Login successful!";
        loginMessage.style.color = "green";
        
        // Hide login, show admin panel after a brief delay
        setTimeout(() => {
            loginSection.style.display = "none";
            adminSection.style.display = "block";
            loadMessages();
        }, 500);
        
    } else {
        loginMessage.textContent = "Incorrect password!";
        loginMessage.style.color = "red";
    }
}

async function loadMessages() {
    try {
        console.log("Loading messages...");
        const response = await fetch("/api/contact");
        
        if (!response.ok) {
            throw new Error(HTTP error! status: ${response.status}); // ← FIXED LINE
        }
        
        const messages = await response.json();
        console.log("Messages loaded:", messages);
        
        const messagesList = document.getElementById("messagesList");
        messagesList.innerHTML = "";

        if (messages.length === 0) {
            messagesList.innerHTML = "<p>No messages found.</p>";
            return;
        }

        messages.forEach(msg => {
            const messageDiv = document.createElement("div");
            messageDiv.className = "message-item";
            messageDiv.innerHTML = `
                <div class="message-header">
                    <strong>${msg.name}</strong> (${msg.email})
                    <span class="message-date">${new Date(msg.date).toLocaleString()}</span>
                </div>
                <div class="message-content">${msg.message}</div>
                <button onclick="deleteMessage('${msg._id}')" class="delete-btn">Delete</button>
                <hr>
            `;
            messagesList.appendChild(messageDiv);
        });
    } catch (error) {
        console.error("Error loading messages:", error);
        document.getElementById("messagesList").innerHTML = "<p>Error loading messages: " + error.message + "</p>";
    }
}

async function deleteMessage(messageId) {
    if (!confirm("Are you sure you want to delete this message?")) {
        return;
    }

    try {
        console.log("Deleting message:", messageId);
        const response = await fetch(/api/contact/${messageId}, {
            method: "DELETE",
            headers: {
                "x-admin-password": ADMIN_PASSWORD
            }
        });

        const result = await response.json();
        console.log("Delete response:", result);

        if (response.ok) {
            alert("Message deleted successfully!");
            await loadMessages(); // Reload messages
        } else {
            alert("Failed to delete message: " + result.error);
        }
    } catch (error) {
        console.error("Error deleting message:", error);
        alert("Error deleting message: " + error.message);
    }
}

// Allow pressing Enter in password field
document.getElementById("adminPassword")?.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        loginAdmin();
    }
});

console.log("✅ admin.js loaded successfully");
*/



/*let ADMIN_PASS = "Password123";

// Login function
async function loginAdmin() {
  const password = document.getElementById("adminPassword").value;
  const res = await fetch("/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });
  const data = await res.json();

  if (data.success) {
    ADMIN_PASS = password; // save password in memory for later deletes
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("adminSection").style.display = "block";
    loadMessages();
  } else {
    document.getElementById("loginMessage").textContent = "Incorrect password!";
  }
}

// Load all messages
async function loadMessages() {
  const res = await fetch("/api/contact");
  const messages = await res.json();
  const container = document.getElementById("messagesList");

  if (messages.length === 0) {
    container.innerHTML = "<p>No messages yet.</p>";
    return;
  }

  container.innerHTML = messages.map(msg => `
    <div class="message-card" id="${msg._id}">
      <div class="message-header">
        <p><strong>${msg.name}</strong> (${msg.email})</p>
        <span>${new Date(msg.date).toLocaleString()}</span>
      </div>
      <p class="message-body">${msg.message}</p>
      <button class="delete-btn" onclick="deleteMessage('${msg._id}')">Delete</button>
    </div>
  `).join('');
}

// Delete message (with password header)
async function deleteMessage(id) {
  if (confirm("Are you sure you want to delete this message?")) {
    const res = await fetch(`/api/contact/${id}`, {
      method: 'DELETE',
      headers: { "x-admin-password": ADMIN_PASS },
    });

    if (res.status === 200) {
      document.getElementById(id).remove();
    } else {
      alert("Failed to delete message (unauthorized).");
    }
  }
}
*/



/*
// public/js/admin.js
const ADMIN_PASSWORD = "Password123"; // Hardcoded for now - match your .env

async function loginAdmin() {
    const password = document.getElementById("adminPassword").value;
    const loginMessage = document.getElementById("loginMessage");
    const loginSection = document.getElementById("loginSection");
    const adminSection = document.getElementById("adminSection");

    console.log("Entered password:", password); // Debug log
    console.log("Expected password:", ADMIN_PASSWORD); // Debug log

    if (password === ADMIN_PASSWORD) {
        loginMessage.textContent = "Login successful!";
        loginMessage.style.color = "green";
        loginSection.style.display = "none";
        adminSection.style.display = "block";
        await loadMessages();
    } else {
        loginMessage.textContent = "Incorrect password!";
        loginMessage.style.color = "red";
    }
}

async function loadMessages() {
    try {
        console.log("Loading messages...");
        const response = await fetch("/api/contact");
        
        if (!response.ok) {
            throw new Error(HTTP error! status: ${response.status});
        }
        
        const messages = await response.json();
        console.log("Messages loaded:", messages);
        
        const messagesList = document.getElementById("messagesList");
        messagesList.innerHTML = "";

        if (messages.length === 0) {
            messagesList.innerHTML = "<p>No messages found.</p>";
            return;
        }

        messages.forEach(msg => {
            const messageDiv = document.createElement("div");
            messageDiv.className = "message-item";
            messageDiv.innerHTML = `
                <div class="message-header">
                    <strong>${msg.name}</strong> (${msg.email})
                    <span class="message-date">${new Date(msg.date).toLocaleString()}</span>
                </div>
                <div class="message-content">${msg.message}</div>
                <button onclick="deleteMessage('${msg._id}')" class="delete-btn">Delete</button>
                <hr>
            `;
            messagesList.appendChild(messageDiv);
        });
    } catch (error) {
        console.error("Error loading messages:", error);
        document.getElementById("messagesList").innerHTML = "<p>Error loading messages: " + error.message + "</p>";
    }
}

async function deleteMessage(messageId) {
    if (!confirm("Are you sure you want to delete this message?")) {
        return;
    }

    try {
        const response = await fetch(/api/contact/${messageId}, {
            method: "DELETE",
            headers: {
                "x-admin-password": ADMIN_PASSWORD
            }
        });

        if (response.ok) {
            await loadMessages(); // Reload messages
        } else {
            const error = await response.json();
            alert("Failed to delete message: " + error.error);
        }
    } catch (error) {
        console.error("Error deleting message:", error);
        alert("Error deleting message: " + error.message);
    }
}*/




