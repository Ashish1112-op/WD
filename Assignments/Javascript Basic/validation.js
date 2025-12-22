export function validateForm(data) {
  if (!data.name || data.name.trim().length < 3) {
    return { valid: false, message: "Name must be at least 3 characters long." };
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(data.email)) {
    return { valid: false, message: "Invalid email format." };
  }

  const phonePattern = /^[0-9]{10}$/;
  if (!phonePattern.test(data.phone)) {
    return { valid: false, message: "Phone must be exactly 10 digits." };
  }

  if (!data.subject) {
    return { valid: false, message: "Please select a subject." };
  }

  if (!data.message || data.message.trim().length < 5) {
    return { valid: false, message: "Message must be at least 5 characters long." };
  }

  return { valid: true, message: "Validation successful." };
}
