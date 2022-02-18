var themeSwitchWrap = $('.theme-switch-wrap');

themeSwitchWrap.on('click', function(){
  var currentTheme = $('body').attr('data-theme');
  var selectedTheme = (currentTheme == 'dark' ? 'light' : 'dark');

  $('body').attr('data-theme', selectedTheme);

  $(this).find('.toggle-switch').toggleClass('dark');
});
