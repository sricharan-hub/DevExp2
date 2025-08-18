
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('regForm');
  const result = document.getElementById('result');
  const dobInput = document.getElementById('dob');

  
  const today = new Date().toISOString().split('T')[0];
  dobInput.max = today;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearErrors();


    if (!form.checkValidity()) {
      form.reportValidity();
0      return;
    }

    // Now custom file validation: check file count, type and size (max 2 MB)
    const photo = document.getElementById('photo');
    const sign = document.getElementById('sign');
    const maxSize = 2 * 1024 * 1024; // 2 MB

    if (!validateFile(photo, 'Photo', maxSize) || !validateFile(sign, 'Signature', maxSize)) {
      return;
    }

    // All validation passed → display details
    displayResult();
    form.reset();
  });

  form.addEventListener('reset', () => {
    clearErrors();
    result.innerHTML = '';
  });

  function validateFile(inputEl, label, sizeLimit) {
    if (inputEl.files.length === 0) {
      showError(inputEl, `${label} is required.`);
      inputEl.focus();
      return false;
    }
    const file = inputEl.files[0];
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      showError(inputEl, `${label} must be JPEG or PNG.`);
      return false;
    }
    if (file.size > sizeLimit) {
      showError(inputEl, `${label} must be under 2 MB.`);
      return false;
    }
    return true;
  }

  function showError(inputEl, message) {
    let error = inputEl.nextElementSibling;
    if (!error || !error.classList.contains('error')) {
      error = document.createElement('div');
      error.className = 'error';
      inputEl.parentNode.insertBefore(error, inputEl.nextSibling);
    }
    error.textContent = message;
  }

  function clearErrors() {
    document.querySelectorAll('.error').forEach(el => el.remove());
  }

  function displayResult() {
    const formData = new FormData(form);
    const entries = Object.fromEntries(formData.entries());

    result.innerHTML = `<h2>Submitted Details</h2>
      <p><strong>Name:</strong> ${escapeHTML(entries.fname)} ${escapeHTML(entries.lname)}</p>
      <p><strong>Email:</strong> ${escapeHTML(entries.email)}</p>
      <p><strong>Phone:</strong> ${escapeHTML(entries.phone)}</p>
      <p><strong>Date of Birth:</strong> ${escapeHTML(entries.dob)}</p>
      <p><strong>Gender:</strong> ${escapeHTML(entries.gender)}</p>
      <p><strong>Qualification:</strong> ${escapeHTML(entries.qualification)}</p>
      <div><strong>Photo & Signature:</strong><br/></div>
      <div id="info-images"></div>`;

    const imgContainer = result.querySelector('#info-images');
    ['photo', 'sign'].forEach(id => {
      const file = form[id].files[0];
      const reader = new FileReader();
      reader.onload = e => {
        const img = document.createElement('img');
        img.src = e.target.result;
        img.alt = id === 'photo' ? 'Passport photo' : 'Signature';
        imgContainer.appendChild(img);
      };
      reader.readAsDataURL(file);
    });
  }

  function escapeHTML(s) {
    const div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }
});

