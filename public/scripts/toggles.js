$(() => {
  //helper function to check if textarea is visible on screen
  const isTextareaVis = function() {
    const offset = $('textarea')[0].getBoundingClientRect();
    if (offset.top > 0) return true;
    return false;
  };

  // getting jQuery objects for further manipulation
  const $newTweetForm = $('.new-tweet');
  const $upBotton = $('#upButton');
  const $textArea = $('textarea');
 
  // scroll textarea into view when button in nav bar is clicked
  $('nav button').click(() => {

    if (isTextareaVis()) {
      $newTweetForm.slideUp();
    } else {
      $newTweetForm.slideDown();
      $textArea[0].scrollIntoView(false);
      $textArea.focus();
    }
  });

  // keep the up button hidden
  $upBotton.hide();

  // as soon as there is scroll event, get the up button to react according to whether textarea is in view
  $(window).scroll(() => {
    if (isTextareaVis()) {
      $upBotton.fadeOut('slow');
    } else {
      $upBotton.fadeIn('slow');
    }
  });
  
  //scroll textarea into view when up button is clicked
  $upBotton.click(() => {
    $('body > header')[0].scrollIntoView(false);
    $newTweetForm.slideDown();
    $textArea.focus();
  }
  );

  // add hover event for the two toggles to bounce
  $('nav div, #upButton').hover(() => {
    $('nav div i').addClass('fa-bounce');
    $('#upButton i').addClass('fa-bounce');
  }, () => {
    $('nav div i').removeClass('fa-bounce');
    $('#upButton i').removeClass('fa-bounce');
  });
});