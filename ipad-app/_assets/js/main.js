// var hammertime = new Hammer(myElement, myOptions);

var ft1 = document.querySelector('.feature--1'),
	ft2 = document.querySelector('.feature--2'),
	ft3 = document.querySelector('.feature--3'),
	ft4 = document.querySelector('.feature--4'),
	slider = document.querySelector('.section--slider'),
	sliderContainer = document.querySelector('.slider__container');

var sliderOffset = 0;

function setSliderOffset(offset){

	sliderOffset += offset;

	switch (sliderOffset) {
		case -100:
			sliderOffset = 0;
			break;
		case 400:
			sliderOffset = 300;
			break;
		default:
			break
	}
	sliderContainer.style.left = -sliderOffset + "vw";
};

var sliderInteraction = new Hammer(slider),
	si = sliderInteraction;


si.on('swipeleft', function() {
	setSliderOffset(100);
});
si.on('swiperight', function() {
	setSliderOffset(-100);
});
