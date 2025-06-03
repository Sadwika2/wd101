document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const entriesTable = document.getElementById('entriesTable').getElementsByTagName('tbody')[0];
    const dobInput = document.getElementById('dob');
    const dobError = document.getElementById('dobError');

    // Load saved data from localStorage
    loadEntries();

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate age (18-55 years)
        if (!validateAge()) {
            return;
        }

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const dob = document.getElementById('dob').value;
        const acceptedTerms = document.getElementById('terms').checked;

        // Create entry object
        const entry = {
            name,
            email,
            password,
            dob,
            acceptedTerms
        };

        // Save to localStorage
        saveEntry(entry);

        // Add to table
        addEntryToTable(entry);

        // Reset form
        form.reset();
    });

    function validateAge() {
        const dob = new Date(dobInput.value);
        const today = new Date();
        const age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
            age--;
        }

        if (age < 18) {
            dobError.textContent = 'You must be at least 18 years old.';
            return false;
        } else if (age > 55) {
            dobError.textContent = 'You must be younger than 55 years.';
            return false;
        } else {
            dobError.textContent = '';
            return true;
        }
    }

    function saveEntry(entry) {
        let entries = JSON.parse(localStorage.getItem('entries')) || [];
        entries.push(entry);
        localStorage.setItem('entries', JSON.stringify(entries));
    }

    function loadEntries() {
        const entries = JSON.parse(localStorage.getItem('entries')) || [];
        entries.forEach(entry => addEntryToTable(entry));
    }

    function addEntryToTable(entry) {
        const row = entriesTable.insertRow();
        
        const nameCell = row.insertCell(0);
        const emailCell = row.insertCell(1);
        const passwordCell = row.insertCell(2);
        const dobCell = row.insertCell(3);
        const termsCell = row.insertCell(4);

        nameCell.textContent = entry.name;
        emailCell.textContent = entry.email;
        passwordCell.textContent = entry.password;
        dobCell.textContent = entry.dob;
        termsCell.textContent = entry.acceptedTerms ? 'true' : 'false';
    }
});
