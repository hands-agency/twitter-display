function User(object)
{
	this.id = object['id'];
	this.id_str = object['id_str'];
	this.name = object['name'];
	this.screen_name = object['screen_name'];
	this.location = object['location'];
	this.description = object['description'];
	this.url = object['url'];
	this.entities = object['entities'];

	this.protected = object['protected'];
	this.followers_count = object['followers_count'];
	this.friends_count = object['friends_count'];
	this.listed_count = object['listed_count'];
	this.created_at = object['created_at'];
	this.favourites_count = object['favourites_count'];
	this.utc_offset = object['utc_offset'];
	this.time_zone = object['time_zone'];
	this.geo_enabled = object['geo_enabled'];
	this.verified = object['verified'];
	this.statuses_count = object['statuses_count'];
	this.lang = object['lang'];
	this.contributors_enabled = object['contributors_enabled'];
	this.is_translator = object['is_translator'];
	this.is_translation_enabled = object['is_translation_enabled'];
	this.profile_background_color = object['profile_background_color'];
	this.profile_background_image_url = object['profile_background_image_url'];
	this.profile_background_image_url_https = object['profile_background_image_url_https'];
	this.profile_background_tile = object['profile_background_tile'];
	this.profile_image_url = object['profile_image_url'];
	this.profile_image_url_https = object['profile_image_url_https'];
	this.profile_banner_url = object['profile_banner_url'];
	this.profile_link_color = object['profile_link_color'];
	this.profile_sidebar_border_color = object['profile_sidebar_border_color'];
	this.profile_sidebar_fill_color = object['profile_sidebar_fill_color'];
	this.profile_text_color = object['profile_text_color'];
	this.profile_use_background_image = object['profile_use_background_image'];
	this.has_extended_profile = object['has_extended_profile'];
	this.default_profile = object['default_profile'];
	this.default_profile_image = object['default_profile_image'];
	this.following = object['following'];
	this.follow_request_sent = object['follow_request_sent'];
	this.notifications = object['notifications'];
}

module.exports = User;