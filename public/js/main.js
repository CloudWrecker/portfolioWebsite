/*document.getElementById("contactForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = e.target.name.value;
  const email = e.target.email.value;
  const message = e.target.message.value;

  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, message }),
  });

  const data = await res.json();
  document.getElementById("formResponse").textContent = data.message || data.error;
  e.target.reset();
});
*/






/*
document.getElementById("contactForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = e.target.name.value.trim();
  const email = e.target.email.value.trim();
  const message = e.target.message.value.trim();
  const formResponse = document.getElementById("formResponse");

  // --- Real-time validation ---
  if (!name || !email || !message) {
    formResponse.textContent = "Please fill in all fields.";
    formResponse.className = "error";
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    formResponse.textContent = "Please enter a valid email address.";
    formResponse.className = "error";
    return;
  }

  // --- Sending feedback ---
  formResponse.textContent = "Sending...";
  formResponse.className = "";

  try {
    const res = await fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        "Accept": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      formResponse.textContent = data.message || "Message sent successfully!";
      formResponse.className = "success";
      e.target.reset();
    } else {
      formResponse.textContent = data.error || "Failed to send message.";
      formResponse.className = "error";
    }
  } catch (err) {
    formResponse.textContent = "Network error. Please try again later.";
    formResponse.className = "error";
  }
});
*/





document.getElementById("contactForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = e.target.name.value.trim();
  const email = e.target.email.value.trim();
  const message = e.target.message.value.trim();
  const formResponse = document.getElementById("formResponse");

  // Real-time validation
  if (!name || !email || !message) {
    formResponse.textContent = "Please fill in all fields.";
    formResponse.className = "error";
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    formResponse.textContent = "Please enter a valid email address.";
    formResponse.className = "error";
    return;
  }

  // Sending feedback
  formResponse.textContent = "Sending...";
  formResponse.className = "";

  try {
    const res = await fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, message })
    });

    const data = await res.json();

    if (res.ok && data.success) {
      formResponse.textContent = data.message || "Message sent successfully!";
      formResponse.className = "success";
      e.target.reset();
    } else {
      formResponse.textContent = data.error || "Failed to send message.";
      formResponse.className = "error";
    }
  } catch (err) {
    console.error("Fetch error:", err);
    formResponse.textContent = "Network error. Please try again later.";
    formResponse.className = "error";
  }
});