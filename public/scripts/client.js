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

  //renderTweets(data);
  // function to get data from server using jQuery ajax shorthand get function and render them
  const loadedTweets = function() {
    $.get('/tweets', data => {
      renderTweets(data);
    });
  };
  
  loadedTweets();
});