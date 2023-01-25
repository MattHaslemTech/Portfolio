$(document).ready(function(){  var themeSwitchWrap = $('.theme-switch-wrap');

themeSwitchWrap.on('click', function(){
  var currentTheme = $('body').attr('data-theme');
  var selectedTheme = (currentTheme == 'dark' ? 'light' : 'dark');

  $('body').attr('data-theme', selectedTheme);

  $(this).find('.toggle-switch').toggleClass('dark');
});
let mobileNav = $('#mobile-nav');
let mobileNavButton = $('.nav-button');
mobileNavButton.on('click', function(){
  mobileNav.toggleClass('open');
  $(this).toggleClass('active');
});
/*
 * Have the borders of the 'skills' section expand as the user scrolls
 *
 * The borders should be at full height once the top of the section is 20% below the top of the window
 */
$(window).on('scroll', function(){

  $('.border[data-animate="true"]').each(function(){

    var parentSection = $(this).closest('.section');

    // The percentage of the position of the section in which the border should be at full height
    let positionForMaxHeight = $(this).attr('data-max-scroll');
    var windowTop = $(window).scrollTop() + screen.height * positionForMaxHeight;
    var sectionTop = parentSection.offset().top;


    // If the section isn't even visible on the viewport yet, just forget about it
    if(sectionTop  > ($(window).height() + $(window).scrollTop())  || ( sectionTop + parentSection.outerHeight() ) < 0  )
      {return;}

    // The max height for the border
    //let maxBorderHeight = $(this).attr('data-max-height');

    /// Get the percentage of the position of the section compared to the top of the window
    // (eg. When the top of the section is in the middle of the browser, the percentage will be 0.5)
    var percentageToTop = (sectionTop - windowTop) / $(window).height();

    // Calculate the height of the border at this particular position (the minus 0.3 is because we don't want the animation to start until it's 30% up)
    var borderHeight = 1 - percentageToTop - 0.5;


    if (borderHeight < 1)
    {
      // Set the height of each border
      $(this).css('transform', 'scaleY(' + borderHeight + ')');
    }

  });
});
var sectionNavigator = $('#section-navigator');

function getCurrentSection()
{
    var docScroll = $(document).scrollTop();
    var currentSection = $('.section:first');

    var nextSection;

    $('.top-section').each(function(){
      var sectionTop = $(this).offset().top;

      var windowHeight = $(window).height();

      var difference = (sectionTop - docScroll);

      // If this section is below the top half of the screen, we don't need to keep looking
      if (difference > (windowHeight / 2))
      {
        return false;
      }
      // Change current section when the section is at the middle of the screen
      else
      {
        currentSection = $(this);
      }


    });

    return currentSection;
}

// Change the section on the section navigator as we scroll
$(document).on('scroll', function(){
  var currentSection = getCurrentSection();

  sectionNavigator.find('.text').text(currentSection.data('section-name'));
});


// Function to let us scroll to desired section of a page
function scrollToSection(targetSection)
{
  var scrollPosition = targetSection.offset().top - 100;

  $("html, body").animate({ scrollTop: scrollPosition });
}



// Change section when button is clicked on
sectionNavigator.find('.button').on('click', function(){

  currentSection = getCurrentSection();

  // See if we're looking for the next section or previous section
  var targetSection;
  var direction = $(this).data('direction');
  if(direction == "next")
  {
    targetSection = currentSection.nextAll('.top-section').eq(0);

    // If we're at the "Home" Section, just scroll to home
    if(currentSection.data('section-name') == "Home")
    {
      targetSection = $('.top-section#about-me');
    }

  }
  if(direction == "prev")
  {
    targetSection = currentSection.prevAll('.top-section').eq(0);

    // If we're at the "About Me" Section, just scroll to home
    if(currentSection.data('section-name') == "About Me")
    {
      targetSection = $('.top-section#hero');
    }
  }


  scrollToSection(targetSection);

});
// Open a popup
$('[data-open-popup]').on('click', function(){
    var popupName = $(this).attr('data-open-popup');
    var targetPopup = $('.full-popup-wrap[data-popup-name="' + popupName + '"]');

    targetPopup.addClass('open');
});


// When the 'close popup' button is clicked, close the popup
$('.close-popup').on('click', function(){
  $('.full-popup-wrap.open').removeClass('open');
});
$('[data-scroll-to]').on('click', function(){
  let scrollTarget = $(this).attr('data-scroll-to');
  let scrollTargetElement = $('[data-scroll-name="' + scrollTarget + '"]');
  scrollToSection(scrollTargetElement);
});

/*
 *  Build list of skills
 */

var skillItemWrap = $('.skills-item-wrap');
var wordCloudWrap = $('.word-cloud-wrap');

// Build array of items according to their priority
// Key    => priority of item - 1
// Value  => array of items with that priority
var skillsItems = new Array();


// Build associative array of items according to their type
// Key    => priority type
// Value  => array of items with that priority type
var skillsItemsByType = {};



// Push first priority array
skillsItems.push(new Array());

// Go through each skill and add them to the lists.
skillItemWrap.find('.item').each(function(){

  /// Set priority list
  var priorityInt = parseInt($(this).data('priority'));

  // If the priority already exists, add the item to the array
  if(skillsItems[priorityInt - 1] !== undefined)
  {
    skillsItems[priorityInt - 1].push($(this));
  }
  else
  {
    skillsItems[priorityInt - 1] = new Array();
    skillsItems[priorityInt - 1].push($(this));
  }


  /// Set skill type list

  // Get types from this item
  var types = $(this).data('type');
  types = types.split(" ");

  // Go through each type and add it to skillsItemsByType array
  for(var i = 0; i < types.length; i++)
  {
    var type = types[i];

    // If the type already exists, add the item to the array
    if(skillsItemsByType[type] !== undefined)
    {
      skillsItemsByType[type].push($(this));
    }
    else
    {
      skillsItemsByType[type] = new Array();
      skillsItemsByType[type].push($(this));
    }
  }


});



/*
 * Place skill items in word cloud
 */
generateWordCloud(skillsItems)
function generateWordCloud(items)
{
  var append = true;
  // Go through each priority array in skillsItems
  $.each(items, function(index, value){
    // Go through each item in array

    $.each(value, function(index, value){

      // We want alternate betwen appending and prepening to the word cloud to keep higher priority values in the middle
      if(append)
      {
        wordCloudWrap.append(value);
        append = false;
      }
      else
      {
        wordCloudWrap.prepend(value);
        append = true;
      }

    });

  });

}


/*
 *  Handle filtering check box actions
 */
var checkedTypes = new Array();
var checkedProfessional = "all";

let filtersWrap = $('.filters-wrap');

filtersWrap.find('input').off('click').on('click', function(e){

  e.stopPropagation();

  var type = $(this).val();

  // If we just checked the box, add the value to array of checked types
  if($(this).is(':checked'))
  {

    // If this is one of the radio buttons, we want to uncheck the other radio
    if($(this).hasClass('radio'))
    {
      // Just uncheck all checked ones
      filtersWrap.find('input.radio:checked').trigger('click');
      checkedProfessional = type;
    }

    // Add to list of checked type if it's not a proessional radio
    else
    {
      checkedTypes.push(type);
    }


  }
  else
  {
    // If this is one of the radio buttons, we want to uncheck the other radio
    if($(this).hasClass('radio'))
    {
      // Just uncheck all checked ones
      filtersWrap.find('input.radio:checked').trigger('click');
      checkedProfessional = "all";
    }

    // Remove type from list of checked types
    checkedTypes= $.grep(checkedTypes, function(value) {
      return value != type;
    });
  }

  updateActiveSkills();

});



/*
 * Update the active items in the word cloud based on what types are in checkedTypes
 */

function updateActiveSkills() {
  // Remove all active items
  wordCloudWrap.find('.item.active').removeClass('active');

  // If there are no checked types and professional type isn't set, remove "filter" from the wordCloudWrap
  if(checkedTypes.length == 0)
  {
    // If professional Type isn't set
    if(checkedProfessional == "all")
    {
      wordCloudWrap.attr('filter', 'false');
      return;
    }
    // If professional type is set, but no professional types are
    else
    {
        wordCloudWrap.attr('filter', 'true');

        // Go through each skill item
        $.each(skillsItemsByType, function(key, value){
          $.each(value, function(key, value){

            // Check if this item has that professional Type
            if(~$(this).data('professional').indexOf(checkedProfessional))
            {
              $(this).addClass('active');
            }

          });
        });

    }

  }
  else
  {
    wordCloudWrap.attr('filter', 'true');
  }

  // Go through each item in checkedTypes
  for(var i = 0; i < checkedTypes.length; i++)
  {
    // Go through each item with that type and add 'active' class
    $.each(skillsItemsByType[checkedTypes[i]], function(){

      // If professional type is set
      if(checkedProfessional != "all")
      {
        // Check if this item has that professional Type
        if(~$(this).data('professional').indexOf(checkedProfessional))
        {
          $(this).addClass('active');
        }
      }
      else
      {
        $(this).addClass('active');
      }

    });
  }

}


/*
 * Clear skills filters button
 */
$('.button.clear-skill-filters').on('click', function(){
  filtersWrap.find('input:checked').trigger('click');
});
$('.item.category').on('click', function(){

    // Open/Close the slide full of items
    var slide = $(this).closest('.slide');
    var arrow = $(this).find('.open-arrow');

    if(slide.attr('data-opened') == "false" )
    {
      slide.attr('data-opened', "true");
      arrow.attr('data-opened', "true");
    }
    else
    {
      slide.attr('data-opened', "false");
      arrow.attr('data-opened', "false");
    }

});
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
});
