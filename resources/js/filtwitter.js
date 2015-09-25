$(document).ready(function()
{
	var socket = io.connect('http://127.0.0.1:8081');

	$('.slicky-media').slick(
	{
		dots: false,
		arrows:false,
		infinite: true,
		// centerMode: true,
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

	$('.slicky-text').slick(
	{
		dots: false,
		arrows:false,
		infinite: true,
		// centerMode: true,
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


	if($('.slickyy .slick-active, .slickyy .slick-active').find('video').length > 0)
	{
		var video = $('.slickyy .slick-active').find('video').get(0).play();
	}
	$('.slicky-media').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		console.log('beforeChange');
		if($('.slicky-media .slick-active').find('video').length > 0)
		{
			console.log('video trouvé');
			$('.slicky-media .slick-active').find('video').get(0).pause();
		}
	});
	$('.slicky-media').on('afterChange', function(event, slick, currentSlide, nextSlide){
		console.log('afterChange');
		if($('.slicky-media .slick-active').find('video').length > 0)
		{
			console.log('video trouvé');
	    	$('.slicky-media .slick-active').find('video').get(0).play();
	    }
	});

	socket.on('newtweet', function(tweet){

		console.log(tweet);
		// Rajout dans media
		if(tweet.extended_entities || tweet.entities.media)
		{
			if(tweet.extended_entities)
			{
				if(tweet.extended_entities.media[0].type == "animated_gif")
				{
					$('.slicky-media').slick('slickAdd', 
						'<div class="media-twitter">'
					+		'<video width="' + tweet.extended_entities.media[0].sizes.medium.w + '" height="' + tweet.extended_entities.media[0].sizes.medium.h + '" loop style="margin-left: -' + (tweet.extended_entities.media[0].sizes.medium.w / 2) + 'px; margin-top: -' + (tweet.extended_entities.media[0].sizes.medium.h / 2) + 'px;" poster="' + tweet.extended_entities.media[0].media_url + '">'
					+			  '<source src="' + tweet.extended_entities.media[0].video_info.variants[0].url + '" type="video/mp4">'
					+		'</video>'
					+	'</div>');
				}
				else
				{
					$('.slicky-media').slick('slickAdd', 
						'<div class="media-twitter">'
					+		'<img src="' + tweet.extended_entities.media[0].media_url  + '" width="' + tweet.extended_entities.media[0].sizes.medium.w + 'px" height="' + tweet.extended_entities.media[0].sizes.medium.h + 'px" style="margin-left: -' + (tweet.extended_entities.media[0].sizes.medium.w / 2) + 'px; margin-top: -' + (tweet.extended_entities.media[0].sizes.medium.h / 2) + 'px";" />'
					+	'</div>');
				}
			}
			 else if(tweet.entities.media)
			 {
			 	$('.slicky-media').slick('slickAdd', 
					'<div class="media-twitter">'
				+		'<img src="' + tweet.entities.media[0].media_url + '" width="' + tweet.entities.media[0].sizes.medium.w  + '" height="' + tweet.entities.media[0].sizes.medium.h + '" style="margin-left: -' + (tweet.entities.media[0].sizes.medium.w / 2) + 'px; margin-top: -' + (tweet.entities.media[0].sizes.medium.h / 2) + 'px";"' 
				+		'/>'
				+	'</div>');
			 }
		}

		// Rajout dans text
		if(tweet.extended_entities || tweet.entities.media)
		{
			$('.slicky-text').slick('slickAdd', 
				'<div class="bloc-tweet"><div class="text-twitter"><p class="text">' + tweet.text + '</p></div></div>');
		}
		
	});

	$('.text-twitter .text').each(function(){
		$(this).html(twttr.txt.autoLink($(this).html()));
	})

	$("a").attr("target","_blank");
	

})