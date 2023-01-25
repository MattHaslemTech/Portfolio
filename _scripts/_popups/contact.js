/*
 * While someone is typing their phone number
 *
 * Make sure it's only numbers
 * Add hyphens automatically
 * Have it so they can't type more than 10 digits.
 */
$('input[name="phone"]').on('input', function(){
  var value = $(this).val();

  var pressedKey = value[value.length-1];

  // We only want numbers. If it's not a number, fix the value
  var newValue = value;
  if( !($.isNumeric(pressedKey)) )
  {
    newValue = value.slice(0,-1)
    $('input[name="phone"]').val(newValue);
  }

  // Add the hyphen after the third digit
  if( value.length == 4 )
  {
    // If the last value is a hyphen, remove the hyphen
    if( value[value.length-1] == "-" )
    {
      newValue = value.substring(0, 3);
    }
    else
    {
      newValue = value.substring(0, 3) + "-" + value.substring(3, value.length);
    }

    $('input[name="phone"]').val(newValue);
  }

  // Add the hyphen after the sixth digit
  if( value.length == 8 )
  {
    // If the last value is a hyphen, remove the hyphen
    if( value[value.length-1] == "-" )
    {
      newValue = value.substring(0, 7);
    }
    else
    {
      newValue = value.substring(0, 7) + "-" + value.substring(7, value.length);
    }

    $('input[name="phone"]').val(newValue);
  }

  // Make sure there isn't anymore than 10 digits
  if( value.length == 13 )
  {
    newValue = value.substring(0, 12);
    $('input[name="phone"]').val(newValue);
  }

});


/*
 * Let's do the ajax stuff to send the email
 */
$('#contact-form').on('submit', function(e){

  // Stop the form from changing pages
  e.preventDefault();

  // Save contact form contact-wrap so we can use it in ajax
  let contactWrap = $(this).closest('.content-wrap');

  // Save the alert to show once the contact-wrap is closed
  let alertWrap = $('.message-alert-wrap.message-sent');

  // Show the loader
  let loader = $(this).find('.loader');
  loader.show(200);

  // Submit form
  $.ajax({
    type: "POST",
    url: "_php/submit-contact.php",
    data: $(this).serialize(),
    success: function(res){

      contactWrap.addClass('close');
      alertWrap.addClass('show');

      setTimeout(function(){
        alertWrap.removeClass('show');
        contactWrap.removeClass('close');
        $('.full-popup-wrap.open').removeClass('open');
        loader.hide();

        // Reset the form.. I don't know why they'd send consecutive messages but this seems like something we should do...
        // .... In fact, I feel like the only reason they'd send consecutive messages is because they messed up the first one..
        // ...... In that case, I figure they'd want their info to still be there...
        // .. resetting seems way more standard though. Let's just stick with that.
        document.getElementById('contact-form').reset();
      },1650);
    }
  })

});
