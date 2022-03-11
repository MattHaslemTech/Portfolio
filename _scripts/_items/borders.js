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
    if(sectionTop - $(window).scrollTop() > screen.height || ( sectionTop + parentSection.outerHeight() ) < 0  )
      {return;}

    // The max height for the border
    let maxBorderHeight = $(this).attr('data-max-height');

    /// Get the percentage of the position of the section compared to the top of the window
    // (eg. When the top of the section is in the middle of the browser, the percentage will be 0.5)
    var percentageToTop = (sectionTop - windowTop) / screen.height;

    // Calculate the height of the border at this particular position
    var borderHeight = (1 - percentageToTop) * maxBorderHeight;

    if (borderHeight < maxBorderHeight)
    {
      // Set the height of each border
      $(this).css('height', borderHeight + 'px');
    }

  });
});
