/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/
$(() => {

  // helper function to escape html syntax from user input
  const escape = function(str) {
    let div = document.createElement('div');
    div.append(document.createTextNode(str));
    return div.innerHTML;
  };
  
  // function to create a single tweet element
  const createTweetElement = function(tweetData) {
    const $tweet = $(`<article class='tweets'></article>`);
    const markup = `
    <header>
    <div>
    <img src=${tweetData.user.avatars}> 
    <span>${tweetData.user.name}</span>
    </div>
    <p>${tweetData.user.handle}</p>
    </header>
    <p class="tweet">${escape(tweetData.content.text)}</p>
    <footer>
    <div>
    <p>${timeago.format(tweetData.created_at)}</p>
    </div>
    <div>
    <i class="fa-solid fa-flag"></i>
    <i class="fa-solid fa-retweet"></i>
    <i class="fa-solid fa-heart"></i>
    </div>
    </footer>
    `;
    $tweet.html(markup);
    return $tweet;
  };
  
  // function that take in an array of tweet data, create and append the tweet element to html
  const renderTweets = function(tweets) {
    const $tweetContainer = $('#tweets-container');
    let $tweetElement;
    for (const tweet of tweets) {
      $tweetElement = createTweetElement(tweet);
      $tweetContainer.prepend($tweetElement);
      // animate the rendering of the tweets
      $tweetElement.hide();
      $tweetElement.slideDown();
    }
  };

  // function to get data from server using jQuery ajax shorthand get function and render them
  const loadedTweets = function(initialLoad) {
    $.get('/tweets', data => {
      if (initialLoad) { // if its the first time, load everything
        renderTweets(data);
      } else {
        renderTweets([data.pop()]); // if not, only render the latest one
      }
    });
  };
  
  // load tweets from server the first time user open up the page
  loadedTweets(true);

  // helper function to create element containning validation error and append to the top of main section
  const addValidationError = function(str) {
    // remove previous added error message
    $('.new-tweet').find('b').remove();

    // generate new error message
    const errorMsg = $('<b>').text(str);
    $('.new-tweet').prepend(errorMsg);

    // animate the error message
    errorMsg.hide();
    errorMsg.slideDown();
  };

  // function to submit new tweets
  $("form").submit(event => {
    // prevent default action from form element
    event.preventDefault();
    
    // get the submitted value from input textarea
    const $textAreaEle = $('#tweet-text');
    const inputText = $textAreaEle.val();

    // exit the submit process if nothing is in input or text exceeds 140 characters
    if (!inputText.length) {
      addValidationError('⛔️  You didnt type anything ⛔️');
      return;
    }
    if (inputText.length > 140) {
      addValidationError('⛔️  Your tweet exceeds 140 characters ⛔️');
      return;
    }
    
    // remove any exist error message
    $('.new-tweet').find('b').remove();

    // serialize submit data and update tweets displayed
    const serializedData = $(event.target).serialize();
    $.post('/tweets', serializedData, () => {

      loadedTweets();
    });
    
    // clear input area after submitting
    $textAreaEle.val('');
  });
});