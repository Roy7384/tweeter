$(() => {
  $('nav button').click(() => {
    $('textarea')[0].scrollIntoView(false);
    $('textarea').focus();
  });
});