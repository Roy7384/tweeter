$(() => {

  $("form").submit(event => {
    // prevent default action from form element
    event.preventDefault();
    
    // get the submitted value from input textarea
    const $textAreaEle = $('#tweet-text');
    const inputText = $textAreaEle.val();

    // exit the submit process if nothing is in input or text exceeds 140 characters
    if (!inputText.length || inputText.length > 140) {
      alert('Input area is empty or has more than 140 characters!')
      return;
    }
    // serialize submit data
    const serializedData = $(event.target).serialize();
    $.post('/tweets', serializedData, (a1, a2, response) => {
      console.log(response.status);
    });

    // clear input area after submitting
    $textAreaEle.val('');
  });
});