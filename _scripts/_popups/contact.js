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
