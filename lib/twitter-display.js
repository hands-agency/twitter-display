var express = require('express');
var Twitter = require('twitter');
var Tweet = require('./Tweet.js');


function TwitterDisplay (options, hashtag, app, server){
	this.params = ['text','user','entities', 'extended_entities'];
	this.twitter = new Twitter(options);
	this.app = app;
	this.listeTweets = [];
	this.hashtag = hashtag;

	app.use("/twitter-display", express.static(__dirname + '/dist'));

	var self = this;

	this.twitter.get('/search/tweets', {q: this.hashtag}, function(error, tweets, response){
	  for(var i = 0; i < tweets.statuses.length; i++)
	  {
	    var thetweet = tweets.statuses[i];
	    if(thetweet.entities)
	    {
	      self.twitter.get('statuses/show', {id: thetweet.id_str}, function(error, tweets, response){
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

	this.twitter.stream('statuses/filter', {track: this.hashtag}, function(stream) {
	  stream.on('data', function(tweet) {
	    if(tweet.entities.media)
	    {
	      self.twitter.get('statuses/show', {id: tweet.id_str}, function(error, tweets, response){
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