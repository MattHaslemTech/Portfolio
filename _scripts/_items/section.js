function getCurrentSection()
{
    var docScroll = $(document).scrollTop();
    console.log("body: " + docScroll);
    $('.section').each(function(){
      var sectionTop = $(this).offset().top;
      console.log('section: ' + sectionTop);
    });
}


$(document).on('scroll', function(){
  getCurrentSection();
  console.log('whatttt');
});
