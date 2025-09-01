function validateForm() {
  const form = document.getElementById('registrationForm');
  let valid = true;

  // Clear previous errors
  document.querySelectorAll(".error").forEach(e => e.textContent = "");

  const fields = [
    "firstName", "lastName", "fatherName", "motherName",
    "dob", "gender", "address", "qualification",
    "education", "photo", "signature", "email", "phone"
  ];

  fields.forEach(field => {
    if (field === "photo" || field === "signature") {
      if (form[field].files.length === 0) {
        document.getElementById(field + "Error").textContent = "This field is required.";
        valid = false;
      }
    } else {
      const value = form[field].value.trim();
      if (value === "") {
        document.getElementById(field + "Error").textContent = "This field is required.";
        valid = false;
      }
    }
  });

  // Email validation
  const email = form.email.value.trim();
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;
  if (email && !emailPattern.test(email)) {
    document.getElementById("emailError").textContent = "Invalid email format.";
    valid = false;
  }

  // Phone validation
  const phone = form.phone.value.trim();
  if (phone && (phone.length !== 10 || isNaN(phone))) {
    document.getElementById("phoneError").textContent = "Phone must be 10 digits.";
    valid = false;
  }

  // DOB validation
  if (form.dob.value) {
    const dob = new Date(form.dob.value);
    const today = new Date();
    if (dob >= today) {
      document.getElementById("dobError").textContent = "Invalid Date of Birth.";
      valid = false;
    }
  }

  if (!valid) return false;

  // Show submitted details (excluding file uploads)
  let resultHTML = "<h3>Submitted Details:</h3><ul>";
  fields.forEach(field => {
    if (field !== "photo" && field !== "signature") {
      resultHTML += `<li><strong>${field}:</strong> ${form[field].value}</li>`;
    }
  });
  resultHTML += "</ul>";
  document.getElementById("result").innerHTML = resultHTML;

  return false; // prevent actual form submission
}
