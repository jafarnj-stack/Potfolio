
document.getElementById('submit-form').addEventListener('submit', function (e) {
  e.preventDefault();


  const name = document.getElementById('name-field').value.trim();
  const email = document.getElementById('email-field').value.trim();
  const subject = document.getElementById('subject-field').value.trim();
  const message = document.getElementById('message-field').value.trim();
  const namePattern = /^[A-Za-z]+( [A-Za-z]+)*$/;

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  const errorName = document.getElementById('error-name');
  const errorEmail = document.getElementById('error-email');
  const errorSubject = document.getElementById('error-subject');
  const errorMessage = document.getElementById('error-message');

  errorName.style.display = 'none';
  errorEmail.style.display = 'none';
  errorSubject.style.display = 'none';
  errorMessage.style.display = 'none';

  errorName.style.color = "red";
  errorEmail.style.color = "red";
  errorSubject.style.color = "red";
  errorMessage.style.color = "red";

  errorName.innerHTML = '';
  errorEmail.innerHTML = '';
  errorSubject.innerHTML = '';
  errorMessage.innerHTML = '';


  let hasError = false;

  if (name === '') {
    errorName.innerHTML = 'Please enter your name';
    errorName.style.display = 'block';
    hasError = true;
  }
  if (/\d/.test(name)) {
    console.log("number validation")
    errorName.innerHTML = 'Please enter a valid name'
    errorName.style.display = 'block';
    hasError = true;

  }
  if (!namePattern.test(name)) {
    errorName.innerHTML = 'Name must contain only letters and single spaces'
    errorName.style.display = 'block';
    hasError = true;
  }

  if (!email.match(emailPattern)) {
    errorEmail.innerHTML = 'Please enter a valid email';
    errorEmail.style.display = 'block';
    hasError = true;
  }

  if (subject === '') {
    errorSubject.innerHTML = 'Please enter subject';
    errorSubject.style.display = 'block';
    hasError = true;
  }
  if (subject.length > 15) {
    errorSubject.innerHTML = 'subject must not exceed 15 characters.';
    errorSubject.style.display = 'block';
    hasError = true;

  }


  if (message === '') {
    errorMessage.innerHTML = 'Please enter message';
    errorMessage.style.display = 'block';
    hasError = true;
  }
  if (message.length > 200) {
    errorMessage.innerHTML = 'message must not exceed 200 characters.';
    errorMessage.style.display = 'block';
    hasError = true;
  }

  if (hasError) {
    return;
  }

  const loading = document.querySelector('.loading');
  const sentMsg = document.querySelector('.sent-message');
  const errorBox = document.getElementById('form-error');


  errorBox.style.display = 'none';
  sentMsg.style.display = 'none';

  loading.style.display = 'block';
  let hideTimeout;



  const formData = new URLSearchParams(new FormData(this));

  fetch('https://script.google.com/macros/s/AKfycbzHE6yMDcRFVCjwF2cUmpHzw5M75TaNOdCQ98LnUzE6zPTZTacCMmWss5qw53kEUR9CAQ/exec', {
    method: 'POST',
    body: formData
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(data => {
      loading.style.display = 'none';
      sentMsg.style.display = 'block';

      // Hide message after 5 seconds
      if (hideTimeout) clearTimeout(hideTimeout);
      hideTimeout = setTimeout(() => {
        sentMsg.style.display = 'none';
      }, 5000);

      this.reset(); // clear form fields
      // Optionally clear any remaining field errors (though they should be gone)
    })



    .catch(error => {
      loading.style.display = 'none';
      errorBox.innerHTML = 'Something went wrong. Please try again.';
      errorBox.style.display = 'block';
      console.error(error);
    });

});