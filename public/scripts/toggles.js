$(() => {
  //helper function to check if textarea is visible on screen
  const isTextareaVis = function() {
    const offset = $('textarea')[0].getBoundingClientRect();
    if (offset.top > 0) return true;
    return false;
  };
 
  // scroll textarea into view when button in nav bar is clicked
  $('nav button').click(() => {
    $('textarea')[0].scrollIntoView(false);
    $('textarea').focus();
  });

  // keep the up button hidden
  $('#upButton').hide();

  // as soon as there is scroll event, get the two toggles to react according to whether textarea is in view
  $(window).scroll(() => {
    if (isTextareaVis()) {
      $('nav div').fadeIn('slow');
      $('#upButton').fadeOut('slow');
    } else {
      $('nav div').fadeOut('slow');
      $('#upButton').fadeIn('slow');
    }
  });
  
  //scroll textarea into view when button in nav bar is clicked
  $('#upButton').click(() => {
    $('textarea')[0].scrollIntoView(false);
    $('textarea').focus();
  });

  // add hover event for the two toggles to bounce
  $('nav div, #upButton').hover(() => {
    $('nav div i').addClass('fa-bounce');
    $('#upButton i').addClass('fa-bounce');
  }, () => {
    $('nav div i').removeClass('fa-bounce');
    $('#upButton i').removeClass('fa-bounce'); 
  })
});