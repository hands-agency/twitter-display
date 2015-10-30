var express = require('express');
var Tweet = require('./Tweet.js');


function TwitterDisplay (client, app){
	this.params = ['text','user','entities', 'extended_entities'];
	this.client = client;
	this.app = app;
	this.listeTweets = [];

	app.use("/twitter-display", express.static(__dirname + '/dist'));

	var self = this;
	client.get('/search/tweets', {q: 'handsagency'}, function(error, tweets, response){
	  for(var i = 0; i < tweets.statuses.length; i++)
	  {
	    var thetweet = tweets.statuses[i];
	    if(thetweet.entities)
	    {
	      client.get('statuses/show', {id: thetweet.id_str}, function(error, tweets, response){
	        var tweet = new Tweet(tweets);
	        var toSend = tweet.toSend(self.params);
	      	self.listeTweets.push(toSend);
	      });
	    }
	    else
	    {
	      var tweet = new Tweet(thetweet);
	      var toSend = tweet.toSend(self.params);
	      self.listeTweets.push(toSend);
	    }
	  }
	});

	var io = require('socket.io').listen(server);

	client.stream('statuses/filter', {track: 'handsagency'}, function(stream) {
	  stream.on('data', function(tweet) {
	    if(tweet.entities.media)
	    {
	      client.get('statuses/show', {id: tweet.id_str}, function(error, tweets, response){
	        var tweet = new Tweet(tweets);
	        var toSend = tweet.toSend(self.params);
	        self.listeTweets.push(toSend);
	        io.sockets.emit('newtweet', toSend);
	      });
	    }
	    else
	    {
	      var aTweet = new Tweet(tweet);
	      var toSend = aTweet.toSend(self.params);
	      self.listeTweets.push(toSend);
	      io.sockets.emit('newtweet', toSend);
	    }
	  });
	  stream.on('error', function(error) {
	    throw error;
	  });
	});

	app.get('/tweetsdisplay',function(req,res){
	  res.send({tweets: self.listeTweets});
	})
}

module.exports = TwitterDisplay;