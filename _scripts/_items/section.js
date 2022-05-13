var sectionNavigator = $('#section-navigator');

function getCurrentSection()
{
    var docScroll = $(document).scrollTop();
    //console.log("body: " + docScroll);
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

  console.log('Current : ' + currentSection.data('section-name'));
  console.log('Target : ' + targetSection.data('section-name'));

  scrollToSection(targetSection);

});
