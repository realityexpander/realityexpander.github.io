var user1 = {
  userName: '@elonmusk',
  displayName: 'Elon Musk',
  joinedDate: 'June 2009',
  followingCount: 103,
  followerCount: 47900000,
  avatarURL: 'assets/elonmusk.jpg',
  coverPhotoURL: 'assets/elonmusk-cover.jpeg',
  tweets: [
      {
          text: 'How does this thing work?',
          timestamp: '6/10/2015 00:01:20'
      },
      {
          text: 'I admit to judging books by their cover',
          timestamp: '6/10/2019 00:01:20'
      },
      {
          text: 'Starship to the moon',
          timestamp: '7/09/2021 18:37:12'
      },
      {
          text: 'Out on launch pad, engine swap underway',
          timestamp: '8/09/2021 12:11:51'
      },
      {
        text: 'Off to mars!',
        timestamp: '8/19/2021 12:11:51'
      },
      {
        text: 'Entering orbit!',
        timestamp: '8/21/2021 14:11:51'
      },
      {
        text: 'I need a snack!',
        timestamp: '8/21/2021 17:11:51'
      }
  ]
};

var user2 = {
  userName: '@BillGates',
  displayName: 'Bill Gates',
  joinedDate: 'July 2009',
  followingCount: 274,
  followerCount: 53800000,
  avatarURL: 'assets/billgates.jpg',
  coverPhotoURL: 'assets/billgates-cover.jpeg',
  tweets: [
      {
          text: 'Everybody asks, how is the next Windows coming along? But nobody asks how is Bill? :/',
          timestamp: '2/10/2021 00:01:20'
      },
      {
          text: 'Should I start tweeting memes? Let me know in a comment.',
          timestamp: '6/09/2021 18:37:12'
      },
      {
          text: 'In 2020, I read a book every hour.',
          timestamp: '7/09/2021 12:11:51'
      }
  ]
};

let users = {user1, user2}

// parse the URL
let user = user1 // default user if no search params
searchParams = getLocationSearchParams(location.search)
if (searchParams) user = users[searchParams.user]


function getLocationSearchParams(locationSearch) {
  let search = locationSearch.substring(1);
  if (!search) return

  // convert searchParams to object
  let searchParams = JSON.parse('{"' + decodeURI(search)
    .replace(/"/g, '\\"')
    .replace(/&/g, '","')
    .replace(/=/g, '":"') + '"}'
  )

  return searchParams
}

// timeline
//  put all tweet objects into a single array
//  sort the array by timestamp
let timeline = []
let i = 0
for(let user in users) {
  users[user].tweets.forEach( tweet => {
    timeline[i++] = {
      user : {
        userName: users[user].userName,
        displayName: users[user].displayName,
        avatarURL: users[user].avatarURL
      },
      tweet: {
        timestamp: new Date(tweet.timestamp),
        text: tweet.text
      }
    }
  })
}
// sort timeline tweets
timeline = timeline.sort( (a,b) => a.tweet.timestamp - b.tweet.timestamp, Array.NUMERIC
)
// render the tweets to the timeline
$('.timeline').html(
  timeline.map( tweet => renderTweet(tweet.user, tweet.tweet))
)


// headerContainer
//   back arrow
//   headerUserInfoContainer
//     displayName + blue-checkmark
//     totalNumTweets
$(`<div>
    <div class="displayNameContainer">
      ${renderDisplayName(user.displayName)}
    </div>
    <p class="header-tweetcount">
      ${numFormatter(13550)} Tweets
    </p>
  </div>`).appendTo('.header-container')

// header coverPhotoURL
$(`<img src="${user.coverPhotoURL}">`)
  .appendTo('.header-cover-photo-url')

// userInfoContainer
//   profileContent
//     displayName + bluecheck
//     @username
//     joinedDate
//     followingCount, FollowerCount
//   Following Button
$('.profileImg').attr("src", user.avatarURL)
$('.userInfo-left .displayNameContainer')
  .html(renderDisplayName(user.displayName))
$('.userInfo-left .displayName-span').text(user.displayName)
$('.userInfo-left .userName').text(user.userName)
$('.userInfo-left .joinedDate').text(user.joinedDate)
$('.userInfo-left .following-count').text(numFormatter(user.followingCount))
$('.userInfo-left .follower-count').text(numFormatter(user.followerCount))

// tabs
//   tweets
//   tweets & Replies
//   media
//   likes

// Tweets
//   ProfilePic
//   TweetContent
//     DisplayName, BlueCheck, userName • timeAgo
//     tweetText
//     speech bubble, retweet, heartCount, shareIcon

// tweets
$(".tweetsContainer").html(
  user.tweets.map( tweet => renderTweet(user, tweet)
))

function renderTweet(user, tweet) {
  return `
  <div class="tweetOuterContainer">

    <div class="tweetContainer">
      <div>
        <img class="tweet-display-avatarURL" width="50px" src="${user.avatarURL}">
      </div>

      <div class="tweetInnerContainer">
        <div>
          ${renderTweetHeader(user.displayName, user.userName, tweet.timestamp)} 
          <p>
            ${tweet.text}
          </p>
        </div>

        <div class="tweetInner-right">
          …
        </div>
      </div>
    </div>

    <div class="tweetContainer-bottom">
        <p><img src="assets/speech.png" width="20px"> ${numFormatter(5200)}</p>
        <p><img src="assets/retweet.png" width="20px"> ${numFormatter(7723)}</p>
        <p><img src="assets/white-heart.png" width="20px"> ${numFormatter(65212)}</p>
        <p><img src="assets/share.png" width="20px"></p>
    </div>

  </div>
  `
}

// Setup Navigation tab component
let tabs = document.body.querySelectorAll(".tab")
for(tab of tabs) {
  tab.addEventListener('click', (e) =>{
    // remove all active tabs
    for(t of tabs) {
      t.classList.remove('tab-active')
    }

    // activate the clicked tab
    e.target.classList.add('tab-active')
    let contentToShow = e.target.dataset.content
    let content = document.body.querySelectorAll(".content")

    // show the content for the clicked tab
    for(c of content) {
      c.classList.add('hidden')
      if(c.dataset.content == contentToShow) {
        c.classList.remove('hidden')
      }
    }
  })
}

function renderDisplayName(displayName) {
  return `
    <p class="displayName">
      <span class="displayName-span">${displayName}</span>
    </p>
    <img src="assets/blue-check.jpg" width=25>
  `
}

function renderTweetHeader(displayName, userName, timestamp) {
  return `
    <p class="tweet-displayName">
      <span class="tweet-displayName-displayName-span">${displayName}</span>
      <img src="assets/blue-check.jpg" width=20>
      <span class="tweet-displayName-userName-span">${userName}
      •
      ${calcTimeAgo(timestamp)}
      </span>
    </p>
  `
}


function numFormatter(num) {
  if(num > 999 && num < 1000000){
      return (num/1000).toFixed(1) + 'k'; // convert to K for number from > 1000 < 1 million 
  }else if(num > 1000000){
      return (num/1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million 
  }else if(num < 900){
      return num; // if value < 1000, nothing to do
  }
}

function calcTimeAgo(date){
  let timeAgo = new Date( new Date() - new Date(date))
  let minutesAgo = timeAgo.getMinutes()
  let hoursAgo = timeAgo.getHours()
  let daysAgo = timeAgo.getDate()
  let monthsAgo = timeAgo.getMonth()
  let yearsAgo = timeAgo.getYear() - 70

  if (yearsAgo >= 3) return `${yearsAgo}y`
  if (yearsAgo >= 1) return `${yearsAgo}y ${monthsAgo}mo`
  if (monthsAgo > 5) return `${monthsAgo}mo`
  if (monthsAgo >= 1) return `${monthsAgo}mo ${daysAgo}d`
  if (daysAgo >=5) return `${daysAgo}d`
  if (hoursAgo >= 24) return `${daysAgo}d ${hoursAgo}h`
  if (hoursAgo > 4) return `${hoursAgo}h`
  if (hoursAgo > 1) return `${hoursAgo}h ${minutesAgo}m`
  return `${minutesAgo}m`
}
