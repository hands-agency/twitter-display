# twitter-display

`npm install twitter-display`

```javascript
var client = require('twitter-display');

var twitter = {
  consumer_key: '52zAOkgxVja573f2Ru7d2ANVh',
  consumer_secret: 'L76VaUvWC0vBxjt5XHHtTMNBzvtlluh5Gr9rsnPrCKWOa0rd22',
  access_token_key: '3686811135-cG5LYnJ97aLTFhBq9XOjpzH3Em7RxikS1O2EC1q',
  access_token_secret: 'WMn6o6tKbdkITsUjjEtX5qlliltcM5SprPpE7IS8blCFh',
}
```

## Choose your hashtag
```javascript
var hashtag = 'twitterdisplay';
```

## Call Twitter Display
```javascript
var td = new TwitterDisplay(twitter, app, hashtag);
```



## Change your html file

Import css files from twitter-display inside the head
```html
<link rel="stylesheet" type="text/css" href="/twitter-display/css/filtwitter.css">
<link rel="stylesheet" type="text/css" href="/twitter-display/css/slick.css">
```

Import js files from twitter-display at the end of body element
```html
<script src="/socket.io/socket.io.js"></script>
<script type="text/javascript" src="/twitter-display/js/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="/twitter-display/js/slick.min.js"></script>
<script type="text/javascript" src="/twitter-display/js/twitter-text.js"></script>
<script type="text/javascript" src="/twitter-display/js/filtwitter.js"></script>
```
And add this
```html
<div class="twotterdisplay"></div>
```

## Enjoy !!!!
