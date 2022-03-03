$(() => {
  //helper function to check if textarea is visible on screen
  const isTextareaVis = function () {
    const offset = $('textarea')[0].getBoundingClientRect();
    if (offset.top > 0) return true;
    return false;
  };

  $('nav button').click(() => {
    $('textarea')[0].scrollIntoView(false);
    $('textarea').focus();
  });

  $('#upButton').hide();

  $(window).scroll(() => {
    if (isTextareaVis()) {
      $('nav div').fadeIn('slow');
      $('#upButton').fadeOut('slow');
    } else {
      $('nav div').fadeOut('slow');
      $('#upButton').fadeIn('slow');
    }
  });

  $('#upButton').click(() => {
    $('textarea')[0].scrollIntoView(false);
    $('textarea').focus();
  });
});