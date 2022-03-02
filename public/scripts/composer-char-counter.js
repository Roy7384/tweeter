$(document).ready(function() {

  // select the textarea element and add input event listener
  $('#tweet-text').on('input', function() {

    const charRemain = 140 - this.value.length;
    const counter = $(this).siblings('div').children('output');
    counter[0].value = charRemain;

    if (charRemain < 0) {
      counter.addClass('exceed');
    } else {
      counter.removeClass('exceed');
    }
  });
});