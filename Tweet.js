var User = require('./User.js');

function Tweet(object)
{
	this.metadata = object['metadata'];
	this.created_at = object['created_at'];
	this.id = object['id'];
	this.id_str = object['id_str'];
	this.text = object['text'];
	this.source = object['source'];
	this.truncated = object['truncated'];
	this.in_reply_to_status_id = object['in_reply_to_status_id'];
	this.in_reply_to_status_id_str = object['in_reply_to_status_id_str'];
	this.in_reply_to_user_id = object['in_reply_to_user_id'];
	this.in_reply_to_user_id_str = object['in_reply_to_user_id_str'];
	this.in_reply_to_screen_name = object['in_reply_to_screen_name'];
	this.user = new User(object['user']);

	this.geo = object['geo'];
	this.coordinates = object['coordinates'];
	this.contributors = object['contributors'];
	this.retweeted_status = object['retweeted_status'];

	this.is_quote_status = object['is_quote_status'];
	this.retweet_count = object['retweet_count'];
	this.favorite_count = object['favorite_count'];
	this.entities = object['entities'];
	this.extended_entities = object['extended_entities'];
	this.favorited = object['favorited'];
	this.retweeted = object['retweeted'];
	this.possibly_sensitive = object['possibly_sensitive'];
	this.lang = object['lang'];
}

Tweet.prototype.toSend = function(params) {
	var data = {};

	for(var i = 0; i < params.length; i++)
	{
		data[params[i]] = this[params[i]];
	}
	return data;
};

module.exports = Tweet;