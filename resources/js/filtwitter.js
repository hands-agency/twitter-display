$(document).ready(function()
{
	var socket = io.connect('http://127.0.0.1:8081');

	$('.slickyy').slick(
	{
		dots: false,
		arrows:false,
		infinite: false,
		speed: 30,
		slidesToShow: 1,
		adaptiveHeight: true,
		accessibility:false,
		autoplay: true,
		autoplaySpeed: 3000
	});

	if($('.slickyy .slick-active').find('video').length > 0)
	{
		var video = $('.slickyy .slick-active').find('video').get(0).play();
	}
	$('.slickyy').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		if($('.slickyy .slick-active').find('video').length > 0)
		{
			$('.slickyy .slick-active').find('video').get(0).pause();
		}
	});
	$('.slickyy').on('afterChange', function(event, slick, currentSlide, nextSlide){
		if($('.slickyy .slick-active').find('video').length > 0)
		{
	    	$('.slickyy .slick-active').find('video').get(0).play();
	    }
	});

	socket.on('newtweet', function(data){
		$('.slickyy').slick('slickAdd', 
			'<div style="background-color: #fff">'
			+	'<p> '
			+		'"' + data.text + '" By ' + data.user.name
			+		'<img src="' + data.entities.media[0].media_url + '" />'
			+	'</p>'
			+'</div>');
	});

	$('.text-twitter .text').each(function(){
		$(this).html(twttr.txt.autoLink($(this).html()));
	})
	

})