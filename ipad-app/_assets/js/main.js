var features = document.querySelectorAll('.feature'),
	ft1 = document.querySelector('.feature--1'),
	ft2 = document.querySelector('.feature--2'),
	ft3 = document.querySelector('.feature--3'),
	ft4 = document.querySelector('.feature--4'),
	slider = document.querySelector('.section--details'),
	sliderClose = document.querySelector('.details__close'),
	sliderContainer = document.querySelector('.details__container'),
	panels = document.querySelectorAll('.details__panel'),
	panelsBackground = document.querySelectorAll('.panel__background');
	panelsContent = document.querySelectorAll('.panel__content');

console.log(panelsContent);

// feature touch

function spread() {
	for(var i = 0; i < panels.length; i++) {
		panelsBackground[i].classList.add('spread');
		panelsContent[i].classList.add('appear');
	}
};
function shrink() {
	for(var i = 0; i < panels.length; i++) {
		panelsBackground[i].classList.remove('spread')
		panelsContent[i].classList.remove('appear')
	}
};

features[0].addEventListener('click', function() {
	setSliderOffset('set', 0);
	slider.classList.remove('inexistent','transparent');
	setTimeout(function() {
		spread();
		window.scrollTo(0,document.body.scrollHeight);
		document.body.style.overflow = "hidden";

	}, 1);
});
features[1].addEventListener('click', function() {
	setSliderOffset('set', 1);
	slider.classList.remove('inexistent','transparent');
	setTimeout(function() {
		spread();
		window.scrollTo(0,document.body.scrollHeight);
		document.body.style.overflow = "hidden";
	}, 1);
});
features[2].addEventListener('click', function() {
	setSliderOffset('set', 2);
	slider.classList.remove('inexistent','transparent');
	setTimeout(function() {
		spread();
		window.scrollTo(0,document.body.scrollHeight);
		document.body.style.overflow = "hidden";
	}, 1);
});
features[3].addEventListener('click', function() {
	setSliderOffset('set', 3);
	slider.classList.remove('inexistent','transparent');
	setTimeout(function() {
		spread();
		window.scrollTo(0,document.body.scrollHeight);
		document.body.style.overflow = "hidden";
	}, 1);
});

sliderClose.addEventListener('click', function(){
	slider.classList.add('transparent');
	document.body.style.overflow = 'auto';
	setTimeout(function() {
		shrink();
		slider.classList.add('inexistent');
	}, 300);
});



var sliderOffset = 0;

function setSliderOffset(action, offset) {

	switch(action) {
		case 'set':
			sliderOffset = offset;
			sliderContainer.style.transition = "none";
			break;
		case 'increment':
			sliderOffset += offset;

			switch(sliderOffset) {
				case -1:
					sliderOffset = 0;
					break;
				case 4:
					sliderOffset = 3;
					break;
			}
			sliderContainer.style.transition = 'left .3s';
			break;
	}

	sliderContainer.style.left = -100 * sliderOffset + 'vw';
};


// SWIPE
var sliderInteraction = new Hammer.Manager(slider),
	si = sliderInteraction;
si.add(new Hammer.Swipe({
	direction: Hammer.DIRECTION_HORIZONTAL,
	threshold: 10
}));


si.on('swipeleft', function() {
	setSliderOffset('increment', 1);
});
si.on('swiperight', function() {
	setSliderOffset('increment', -1);
});
