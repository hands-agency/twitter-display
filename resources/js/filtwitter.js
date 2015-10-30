$(document).ready(function()
{
	var socket = io.connect('http://127.0.0.1:8081');
	// Init slick

	// Le slick de gauche qui contiendra le media (image ou gif)
	$('.slicky-media').slick(
	{
		dots: false,
		arrows:false,
		infinite: true,
		speed: 300,
		slidesToShow: 1,
		adaptiveHeight: true,
		autoplay: true,
		autoplaySpeed: 5000,
		vertical: true,
		verticalSwiping: true,
		accessibility:true,
        cssEase: 'cubic-bezier(0.950, 0.050, 0.795, 0.035)',
		asNavFor: '.slicky-text'
	});
	// Le slick de droite qui contiendra le tweet
	$('.slicky-text').slick(
	{
		dots: false,
		arrows:false,
		infinite: true,
		speed: 300,
		slidesToShow: 1,
		adaptiveHeight: true,
		autoplay: true,
		autoplaySpeed: 5000,
		vertical: true,
		verticalSwiping: true,
		accessibility:true,
        cssEase: 'cubic-bezier(0.950, 0.050, 0.795, 0.035)',
		asNavFor: '.slicky-media'
	});


	// Pause ou Play sur une vidéo lors d'un changement de slide
	if($('.slicky-media .slick-active').find('video').length > 0)
		var video = $('.slicky-media .slick-active').find('video').get(0).play();
	$('.slicky-media').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		if($(this).find('.slick-active video').length > 0)
			$(this).find('.slick-active video').get(0).pause();
	});
	$('.slicky-media').on('afterChange', function(event, slick, currentSlide, nextSlide){
		if($(this).find('.slick-active video').length > 0)
	    	$(this).find('.slick-active video').get(0).play();
	});

	// A chaque nouveau tweet
	socket.on('newtweet', function(tweet){
		if(tweet.extended_entities || tweet.entities.media)
		{
			// Add in bloc media
			if(tweet.extended_entities)
			{
				if((tweet.extended_entities.media[0].sizes.medium.w / tweet.extended_entities.media[0].sizes.medium.h) < 1)
				{
					var sizeX = '60';var sizeY = '80';
				}
				else
				{
					var sizeX = '80';var sizeY = '60';
				}
				if(tweet.extended_entities.media[0].type == "animated_gif")
				{
					$('.slicky-media').slick('slickAdd', 
						'<div class="media-twitter">'
					+		'<video width="' + sizeX + '%" height="' + sizeY + '%" loop style="margin-left: -' + (sizeX / 2) + '%; margin-top: -' + ((sizeY / 2) + 5) + '%;" poster="' + tweet.extended_entities.media[0].media_url + '">'
					+			  '<source src="' + tweet.extended_entities.media[0].video_info.variants[0].url + '" type="video/mp4">'
					+		'</video>'
					+	'</div>');
				}
				else
				{
					$('.slicky-media').slick('slickAdd', 
						'<div class="media-twitter">'
					+		'<img src="' + tweet.extended_entities.media[0].media_url  + '" width="' + sizeX + '%" height="' + sizeY + '%" style="margin-left: -' + (sizeX / 2) + '%; margin-top: -' + ((sizeY / 2) + 5) + '%";" />'
					+	'</div>');
				}
			}
			else if(tweet.entities.media)
			{
				if((tweet.entities.media[0].sizes.medium.w / tweet.entities.media[0].sizes.medium.h) < 1)
				{
					var sizeX = '60';var sizeY = '80';
				}
				else
				{
					var sizeX = '80';var sizeY = '60';
				}
			 	$('.slicky-media').slick('slickAdd', 
					'<div class="media-twitter">'
				+		'<img src="' + tweet.entities.media[0].media_url + '" width="' + sizeX  + '%" height="' + sizeY + '%" style="margin-left: -' + (sizeX / 2) + '%; margin-top: -' + ((sizeY / 2) + 5) + '%";"' 
				+		'/>'
				+	'</div>');
			}
			// Add in bloc text
			$('.slicky-text').slick('slickAdd', 
				'<div class="bloc-tweet newtweet">'
				+		'<div class="text-twitter">'
				+			'<p class="author"><a href="#">@' + tweet.user.screen_name + '</a> </p>'
				+			'<p class="text">'+ tweet.text + '</p>'
				+		'</div>'
				+	'</div>');
			$('.slicky-text .newtweet .text')
			$('.slicky-text .newtweet .text').html(twttr.txt.autoLink($('.slicky-text .newtweet .text').html()));
			$(".slicky-text .newtweet .text a").attr("target","_blank");
			$('.slicky-text .newtweet').removeClass('newtweet');
		}
	});

	$('.text-twitter .text').each(function(){
		$(this).html(twttr.txt.autoLink($(this).html()));
	});
	$("a").attr("target","_blank");
})