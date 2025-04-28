// script.js
document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting normally
  
    // Validate form fields if needed (browser handles 'required' by default)
  
    // Show success message
    document.getElementById('successMessage').classList.remove('hidden');
  
    // Optionally clear the form
    this.reset();
  });
  