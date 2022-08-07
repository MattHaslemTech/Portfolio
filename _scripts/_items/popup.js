// Open a popup
$('[data-open-popup]').on('click', function(){
    var popupName = $(this).attr('data-open-popup');
    var targetPopup = $('.full-popup-wrap[data-popup-name="' + popupName + '"]');

    console.log("Popup : " + popupName);

    targetPopup.addClass('open');

    console.log("Class : " + targetPopup.attr('class'));
});


// When the 'close popup' button is clicked, close the popup
$('.close-popup').on('click', function(){
  $('.full-popup-wrap.open').removeClass('open');
});
