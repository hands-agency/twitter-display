# twitter-display

npm install twitter-display

```javascript
var client = require('twitter');
var client = require('twitter-display');

var client = new twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
});
```

## Choose your hashtag
```javascript
var hashtag = 'twitterdisplay';
```

## Call Twitter Display
```javascript
var td = new TwitterDisplay(client, app, hashtag);
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
