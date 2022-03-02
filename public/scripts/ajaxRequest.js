$(() => {

  $("form").submit(event => {
    // prevent default action from form element
    event.preventDefault();

    // serialize submit data
    const serializedData = $(event.target).serialize();

    $.post('/tweets', serializedData, (a1, a2, response) => {
      console.log(response.status);
    });
  });
});