document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const today = new Date().toISOString().split('T')[0];

    const dateInput = document.getElementById('date');
    if (dateInput) {
        dateInput.min = today;
    }

    function displayError(inputElement, message) {
        const group = inputElement.closest('.form-group');
        const errorDiv = document.getElementById(inputElement.id + '-error');
        group.classList.add('has-error');
        errorDiv.textContent = message;
    }

    function clearError(inputElement) {
        const group = inputElement.closest('.form-group');
        const errorDiv = document.getElementById(inputElement.id + '-error');
        group.classList.remove('has-error');
        errorDiv.textContent = '';
    }

    function validateInput(inputElement) {
        const value = inputElement.value.trim();
        const fieldName = inputElement.id;
        let isValid = true;
        let errorMessage = '';

        if (inputElement.hasAttribute('required') && value === '') {
            errorMessage = `${inputElement.labels[0].textContent.replace(' *', '')} is required.`;
            isValid = false;
        }

        else {
            switch (fieldName) {
                case 'email':
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) {
                        errorMessage = 'Please enter a valid email address.';
                        isValid = false;
                    }
                    break;
                case 'phone':
                    const phoneRegex = /^\d{10}$/;
                    if (!phoneRegex.test(value)) {
                        errorMessage = 'Phone number must be exactly 10 digits.';
                        isValid = false;
                    }
                    break;
                case 'date':
                    if (value < today && value !== '') {
                        errorMessage = 'Date must be today or a future date.';
                        isValid = false;
                    }
                    break;
            }
        }

        if (!isValid) {
            displayError(inputElement, errorMessage);
            return false;
        } else {
            clearError(inputElement);
            return true;
        }
    }

    if (form) {
        Array.from(form.elements).forEach(element => {
            if (element.tagName !== 'BUTTON') {
                element.addEventListener('input', () => validateInput(element));
                element.addEventListener('blur', () => validateInput(element));
            }
        });
    }

    function getRegistrations() {
        try {
            const registrations = localStorage.getItem('seminarRegistrations');
            return registrations ? JSON.parse(registrations) : [];
        } catch (e) {
            console.error("Error loading data from localStorage:", e);
            return [];
        }
    }

    function saveRegistrations(registrations) {
        try {
            localStorage.setItem('seminarRegistrations', JSON.stringify(registrations));
            console.log("Registration saved successfully to LocalStorage.");
        } catch (e) {
            console.error("Error saving data to localStorage:", e);
            alert("Could not save registration data. Storage limit reached.");
        }
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let formValid = true;
            Array.from(form.elements).forEach(element => {
                if (element.tagName !== 'BUTTON' && element.hasAttribute('required')) {
                    if (!validateInput(element)) {
                        formValid = false;
                    }
                }
            });

            if (formValid) {
                const formData = new FormData(form);
                const newRegistration = {};
                formData.forEach((value, key) => {
                    newRegistration[key] = value;
                });

                newRegistration.id = Date.now();

                const registrations = getRegistrations();
                registrations.push(newRegistration);
                saveRegistrations(registrations);

                alert('Registration Successful! Thank you for signing up.');
                form.reset();
            } else {
                alert('Please correct the errors in the form before submitting.');
            }
        });
    }

    if (window.location.pathname.endsWith('registrations.html')) {
        const tableBody = document.getElementById('registrationsTableBody');
        if (tableBody) {
            renderRegistrationsTable(getRegistrations());
        }
    }

    function renderRegistrationsTable(registrations) {
        const tableBody = document.getElementById('registrationsTableBody');
        if (!tableBody) return;

        tableBody.innerHTML = '';

        if (registrations.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="7" style="text-align:center;">No registrations found.</td></tr>';
            return;
        }

        registrations.forEach(reg => {
            const row = tableBody.insertRow();

            row.insertCell().textContent = reg.name;
            row.insertCell().textContent = reg.email;
            row.insertCell().textContent = reg.phone;
            row.insertCell().textContent = reg.type;
            row.insertCell().textContent = reg.date;
            row.insertCell().textContent = reg.comments;

            const actionsCell = row.insertCell();
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.onclick = () => deleteRegistration(reg.id);
            actionsCell.appendChild(deleteBtn);
        });
    }

    function deleteRegistration(idToDelete) {
        if (!confirm('Are you sure you want to delete this registration?')) return;

        let registrations = getRegistrations();

        const updatedRegistrations = registrations.filter(reg => reg.id !== idToDelete);

        saveRegistrations(updatedRegistrations);
        renderRegistrationsTable(updatedRegistrations);
        console.log(`Registration with ID ${idToDelete} deleted.`);
    }

});