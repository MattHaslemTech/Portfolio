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

  // Gather form data
  /*
  var inputData = {
    name: $(this).find('input[name="name"]').val(),
    email: $(this).find('input[name="email"]').val(),
    phone: $(this).find('input[name="phone"]').val(),
    preferred_contact: $(this).find('input[name="contact-method"]').val(),
    message: $(this).find('textarea[name="text"]').val()
  }
  */
  //console.log('Data: ' + inputData);
  console.log('Data: ' + $(this).serialize());

  // Submit form
  $.ajax({
    type: "POST",
    url: "_php/submit-contact.php",
    data: $(this).serialize(),
    success: function(res){
      console.log('res: ' + res);
    }
  })

});
