var features = document.querySelectorAll('.feature'),
	ft1 = document.querySelector('.feature--1'),
	ft2 = document.querySelector('.feature--2'),
	ft3 = document.querySelector('.feature--3'),
	ft4 = document.querySelector('.feature--4'),
	slider = document.querySelector('.section--details'),
	sliderClose = document.querySelector('.details__close'),
	sliderContainer = document.querySelector('.details__container'),
	panels = document.querySelectorAll('.details__panel'),
	panelsBackground = document.querySelectorAll('.panel__background'),
	panelsContent = document.querySelectorAll('.panel__content'),
	hands = document.querySelectorAll('.hand'),
	paf = document.querySelector('.paf');

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
	slider.classList.remove('inexistent', 'transparent');
	setTimeout(function() {
		spread();
		window.scrollTo(0, document.body.scrollHeight);
		document.body.style.overflow = "hidden";

	}, 1);
});
features[1].addEventListener('click', function() {
	setSliderOffset('set', 1);
	slider.classList.remove('inexistent', 'transparent');
	setTimeout(function() {
		spread();
		window.scrollTo(0, document.body.scrollHeight);
		document.body.style.overflow = "hidden";
	}, 1);
});
features[2].addEventListener('click', function() {
	setSliderOffset('set', 2);
	slider.classList.remove('inexistent', 'transparent');
	setTimeout(function() {
		spread();
		window.scrollTo(0, document.body.scrollHeight);
		document.body.style.overflow = "hidden";
	}, 1);
});
features[3].addEventListener('click', function() {
	setSliderOffset('set', 3);
	slider.classList.remove('inexistent', 'transparent');
	setTimeout(function() {
		spread();
		window.scrollTo(0, document.body.scrollHeight);
		document.body.style.overflow = "hidden";
	}, 1);
});

sliderClose.addEventListener('click', function() {
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
	threshold: 200,
	velocity: 1.7
}));


si.on('swipeleft', function() {
	setSliderOffset('increment', 1);
});
si.on('swiperight', function() {
	setSliderOffset('increment', -1);
});

var handLeftInteraction = new Hammer.Manager(hands[0]),
	hli = handLeftInteraction;
hli.add(new Hammer.Pan({
	direction: Hammer.DIRECTION_HORIZONTAL,
	threshold: 1,
	pointers: 1
}));
hli.on('pan', function(e) {
	hands[0].style.transform = 'translateX(' + e.deltaX + 'px) translateY(-50%)';
});
hli.on('panend', function() {
	var myAnimation = anime({
		targets: hands[0],
		translateX: '0',
		translateY: '-50%',
		duration: 300,
		easing: 'easeOutBack',
		loop: false
	});
});
var handRightInteraction = new Hammer.Manager(hands[1]),
	hri = handRightInteraction;
hri.add(new Hammer.Pan({
	direction: Hammer.DIRECTION_HORIZONTAL,
	threshold: 1,
	pointers: 1
}));
hri.on('pan', function(e) {
	hands[1].style.transform = 'translateX(' + e.deltaX + 'px) translateY(-50%)';
});
hri.on('panend', function() {
	var myAnimation = anime({
		targets: hands[1],
		translateX: '0',
		translateY: '-50%',
		duration: 300,
		easing: 'easeOutBack',
		loop: false
	});
});

var timer = 0;
var currentTime,
	last = 0,
	elapsed = 0;

function clock() {
	currentTime = new Date().getTime();
	// do things
	collisionTimer(1.5);
	lastTime = currentTime;

	requestAnimationFrame(clock);
}

var finished = false;

function collisionTimer(t) { // t = collision timeout

	var leftHandPos = hands[0].getBoundingClientRect().right;
	var rightHandPos = hands[1].getBoundingClientRect().left;

	if(leftHandPos >= rightHandPos) { // means the 2 blocks are overlaping
		if(!finished) {
			elapsed = (currentTime - lastTime) / 1000;
			timer += elapsed;

			var progress = timer / t;

			paf.style.opacity = progress;

			// console.log(timer);
			if(timer >= t) {
				console.log('done');
				finished = true;
				timer = 0;
				paf.style.background = "blue"
			}
		}
	} else {
		timer = 0;
		finished = false;
		paf.style.opacity = 0;
		paf.style.background = "lightblue"
	}
}
requestAnimationFrame(clock);
