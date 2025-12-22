import { validateForm } from "./validation.js";
import { saveData } from "./storage.js";
import { showMenu, handleMenu } from "./menu.js";

const form = document.getElementById("registrationForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
  };

  const validation = validateForm(formData);

  if (!validation.valid) {
    alert(validation.message);
    return;
  }

  const confirmation = saveData(formData);
  alert(confirmation);

  showMenu();
});

// Start menu
setTimeout(() => {
  showMenu();
}, 500);
