var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var twitter = require('twitter');

var Tweet = require('./Tweet.js');

var app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true}));

app.use("/resources", express.static(__dirname + '/resources'));

app.use('/views', express.static(__dirname + '/views'));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

var http = require('http');
var host        = process.env.VCAP_APP_HOST || process.env.HOST || '127.0.0.1';
var port        = process.env.VCAP_APP_PORT || process.env.PORT || 8081;

// TWITTER
var client = new twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
});

var params = ['text','user','entities', 'extended_entities'];
var listeTweets = [];

client.get('/search/tweets', {q: 'handsagency'}, function(error, tweets, response){
  for(var i = 0; i < tweets.statuses.length; i++)
  {
    var thetweet = tweets.statuses[i];
    if(thetweet.entities)
    {
      client.get('statuses/show', {id: thetweet.id_str}, function(error, tweets, response){
        var tweet = new Tweet(tweets);
        var toSend = tweet.toSend(params);
        listeTweets.push(toSend);
      });
    }
    else
    {
      var tweet = new Tweet(thetweet);
      var toSend = tweet.toSend(params);
      listeTweets.push(toSend);
    }
  }
});


server = app.listen(port, host);

var io = require('socket.io').listen(server);

client.stream('statuses/filter', {track: 'handsagency'}, function(stream) {
  stream.on('data', function(tweet) {
    if(tweet.entities.media)
    {
      client.get('statuses/show', {id: tweet.id_str}, function(error, tweets, response){
        var tweet = new Tweet(tweets);
        var toSend = tweet.toSend(params);
        listeTweets.push(toSend);
        io.sockets.emit('newtweet', toSend);
      });
    }
    else
    {
      var aTweet = new Tweet(tweet);
      var toSend = aTweet.toSend(params);
      listeTweets.push(toSend);
      io.sockets.emit('newtweet', toSend);
    }
  });
  stream.on('error', function(error) {
    throw error;
  });
});



// Route
app.get('/', function(req, res){
  res.render('index.html', {listeTweets: listeTweets});
});


console.log('Server runniiiiiiiing ... ;)');
