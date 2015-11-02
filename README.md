# twitter-display

`npm install twitter-display`

```javascript
var express = require('express');
var app = express();
server = app.listen(port, host);
```

```javascript
var TwitterDisplay = require('twitter-display');

var twitter = {
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: '',
}
```

## Choose your hashtag
```javascript
var hashtag = 'twitterdisplay';
```

## Call Twitter Display
```javascript
var td = new TwitterDisplay(twitter, hashtag, app, server);
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
<script type="text/javascript">
		var socket = io.connect('http://host:port');
	</script>
<script type="text/javascript" src="/twitter-display/js/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="/twitter-display/js/slick.min.js"></script>
<script type="text/javascript" src="/twitter-display/js/twitter-text.js"></script>
<script type="text/javascript" src="/twitter-display/js/filtwitter.js"></script>
```
And add this
```html
<div class="twitterdisplay"></div>
```

## Enjoy !!!!
