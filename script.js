
const validateForm = (data, callback) => {
  let errors = [];

  if (data.name.length < 2) errors.push("Name too short.");
  if (!data.email.includes("@")) errors.push("Invalid email.");
  if (data.password.length < 6) errors.push("Password must be 6+ chars.");

  // Callback returns (error, isValid)
  if (errors.length > 0) {
    callback(errors.join(" "), false);
  } else {
    callback(null, true);
  }
};

// API SIMULATION (Promise)
function fakeApiCall(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const isSuccess = Math.random() > 0.5;

      if (isSuccess) {
        resolve("Signup successful!");
      } else {
        reject("Server error. Please try again.");
      }
    }, 2000);
  });
}

// MAIN APP (Async/Await)
const form = document.getElementById("signupForm");
const statusText = document.getElementById("status");
const submitBtn = document.getElementById("submitBtn");

async function handleSubmit(event) {
  event.preventDefault();

  const data = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    password: document.getElementById("password").value.trim()
  };

  // UI feedback
  submitBtn.disabled = true;
  statusText.textContent = "Submitting...";
  statusText.className = "";

  try {
    // Convert callback → Promise
    await new Promise((resolve, reject) => {
      validateForm(data, (error) => {
        if (error) reject(error);
        else resolve();
      });
    });

    // API call
    const result = await fakeApiCall(data);

    statusText.textContent = result;
    statusText.className = "success";

  } catch (error) {
    statusText.textContent = error;
    statusText.className = "error";
  } finally {
    submitBtn.disabled = false;
  }
}

// EVENT LISTENER

form.addEventListener("submit", handleSubmit);