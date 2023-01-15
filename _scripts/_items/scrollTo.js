$('[data-scroll-to]').on('click', function(){
  let scrollTarget = $(this).attr('data-scroll-to');
  let scrollTargetElement = $('[data-scroll-name="' + scrollTarget + '"]');
  scrollToSection(scrollTargetElement);
});
 
