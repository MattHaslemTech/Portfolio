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
