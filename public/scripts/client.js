/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(() => {
  // Fake data taken from initial-tweets.json
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];
  
  // function to create a single tweet element
  const createTweetElement = function(tweetData) {
    const $tweet = $(`<article class='tweets'></article>`);
    const $header = $('<header>');
    const $footer = $('<footer>');

    const $profilePic = $(`<img src=${tweetData.user.avatars}>`);
    const $userName = $('<span>').text(tweetData.user.name);
    const $userHandle = $('<p>').text(tweetData.user.handle);
    const $tweetText = $("<p class='tweet'>").text(tweetData.content.text);
    const $createDate = $('<p>').text(timeago.format(tweetData.created_at));
    const $socialIcons = $('<div>').html("<i class='fa-solid fa-flag'></i><i class='fa-solid fa-retweet'></i><i class='fa-solid fa-heart'></i>");

    const $headerDiv = $('<div>').append($profilePic, $userName);
    $header.append($headerDiv, $userHandle);
    $tweet.append($header, $tweetText);

    const $footerDiv1 = $('<div>').append($createDate);
    const $footerDiv2 = $('<div>').append($socialIcons);
    $footer.append($footerDiv1, $footerDiv2);

    $tweet.append($footer);
    return $tweet;
  };

  // function that take in an array of tweet data, create and append the tweet element to html
  const renderTweets = function(tweets) {
    const $tweetContainer = $('#tweets-container');
    let $tweetElement;
    for (const tweet of tweets) {
      $tweetElement = createTweetElement(tweet);
      $tweetContainer.append($tweetElement);
    }
  };

  renderTweets(data);

});