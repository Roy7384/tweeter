/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/
$(() => {
  
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
    <p class="tweet">${tweetData.content.text}</p>
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
    }
  };

  // function to get data from server using jQuery ajax shorthand get function and render them
  const loadedTweets = function() {
    $.get('/tweets', data => {
      renderTweets(data);
    });
  };
  
  // load tweets from server the first time user open up the page
  loadedTweets();

  // function to submit new tweets
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

    // update the tweets displaying on the page
    loadedTweets();
  });
});