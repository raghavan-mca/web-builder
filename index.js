function anim() {

if($('#abc_hero_image').hasClass('abc-hero-scroll') === true) {
	setTimeout(() => {
		$('#abc_hero_image').removeClass('abc-hero-scroll');
		anim();
	}, 2000)
}
else if($('#abc_hero_image').hasClass('abc-hero-scroll') === false){
	setTimeout(() => {
		$('#abc_hero_image').addClass('abc-hero-scroll');
		anim();
	}, 2000)
}

}

anim();