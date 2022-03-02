/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {
  const createTweetElement = function(tweetData) {
    const $tweet = $(`<article class='tweets'></article>`);
    const $header = $('<header>');
    const $footer = $('<footer>');
  
    const $profilePic = $(`<img src=${tweetData.user.avatars}>`);
    const $userName = $('<span>').text(tweetData.user.name);
    const $userHandle = $('<p>').text(tweetData.user.handle);
    const $tweetText = $("<p class='tweet'>").text(tweetData.content.text);
    const $createDate = $('<p>').text(tweetData.created_at);
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
  
  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  };
  
  const $tweet = createTweetElement(tweetData);
  
  // Test / driver code (temporary)
  console.log($tweet); // to see what it looks like
  $("#tweets-container").append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

})