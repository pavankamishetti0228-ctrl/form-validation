// VALIDATION (Callback)
function validateForm(data, callback) {
  const { name, email, password } = data;

  if (!name || !email || !password) {
    return callback("All fields are required");
  }

  if (!email.includes("@")) {
    return callback("Invalid email format");
  }

  if (password.length < 6) {
    return callback("Password must be at least 6 characters");
  }

  callback(null);
}

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
//we attach the event listener to the form's submit event, which will trigger the handleSubmit function when the form is submitted.

form.addEventListener("submit", handleSubmit);