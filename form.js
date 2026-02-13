$(document).ready(function(){

  $('#submit-form').on('submit', function(e){
    e.preventDefault();   // always prevent normal HTTP submission

    // --- Validation ---
    let name = $('#name-field').val().trim();
    let email = $('#email-field').val().trim();
    let subject = $('#subject-field').val().trim();
    let message = $('#message-field').val().trim();

    let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    let errors = [];

    if(name === ''){
      errors.push('Please enter your name');
    }
    if(!email.match(emailPattern)){
      errors.push('Please enter a valid email');
    }
    if(subject === ''){
      errors.push('Please enter subject');
    }
    if(message === ''){
      errors.push('Please enter message');
    }

    // UI elements
    let $loading = $('.loading');
    let $sentMsg = $('.sent-message');
    let $errorBox = $('#form-error');

    // Hide any previous messages
    $errorBox.hide();
    $sentMsg.hide();

    if(errors.length > 0){
      $errorBox.html(errors.join('<br>')).show();
      return;   // stop AJAX
    }

    // --- Start AJAX submission ---

    $.ajax({
      url: 'https://script.google.com/macros/s/AKfycbzHE6yMDcRFVCjwF2cUmpHzw5M75TaNOdCQ98LnUzE6zPTZTacCMmWss5qw53kEUR9CAQ/exec',
      data: $(this).serialize(),
      method: 'POST',
      success: function(response){
        $loading.hide();
        $sentMsg.show();          
        $('#submit-form')[0].reset();
      },
      error: function(err){
        $loading.hide();
        $errorBox.html('Something went wrong. Please try again.').show();
        console.error(err);
      }
    });

  });

});