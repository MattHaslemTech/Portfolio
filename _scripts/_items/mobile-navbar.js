let mobileNav = $('#mobile-nav');
let mobileNavButton = $('.nav-button');
mobileNavButton.on('click', function(){
  mobileNav.toggleClass('open');
  $(this).toggleClass('active');
});
