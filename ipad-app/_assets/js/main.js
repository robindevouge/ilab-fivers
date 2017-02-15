// 1366 * 1024

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
	paf = document.querySelector('.paf'),
	ovoTexMove = document.querySelector('.texture__ovo--moveable'),
	ovoTexStatic = document.querySelector('.texture__ovo--static')
	ovo = {
		texture : {
			move : document.querySelector('.texture__ovo--moveable'),
			static : document.querySelector('.texture__ovo--static')
		},
		touch : {
			left : document.querySelector('.touch__ovo--left'),
			right : document.querySelector('.touch__ovo--right')
		},
		warming : {
			left : document.querySelector('.warming__ovo--left'),
			right : document.querySelector('.warming__ovo--right'),
			heatLeft : document.querySelector('.warming__heat--left'),
			heatRight : document.querySelector('.warming__heat--right')
		}
	};

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


// REMOVE LATER
setSliderOffset('set',3);



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


var draggable = new Draggabilly(ovoTexMove,{

});

draggable.on('pointerDown', function(){
	// ovoTexMove.style.transform = 'scale(1.5)';
	ovoTexMove.classList.add('scaleUp');
});
// draggable.on('dragMove', function(){
// 	ovoTexMove.style.transform = 'scale(1.5)';
// });

draggable.on('dragEnd', function(){
	var endPointX = draggable.position.x + ovoTexMove.clientWidth/2,
		endPointY = draggable.position.y + ovoTexMove.clientHeight/2;
	// console.log(endPointY);
	console.log(window.innerHeight - window.innerWidth/4);
	if (endPointY > window.innerHeight - window.innerWidth/4) {
		if(endPointX > window.innerWidth*0.75){
			ovoTexStatic.style.background = 'green';
		}else{
			if(endPointX > window.innerWidth/2){
				ovoTexStatic.style.background = 'blue';
			}else{
				if(endPointX > window.innerWidth*0.25){
					ovoTexStatic.style.background = 'red';
				}else{
					ovoTexStatic.style.background = 'bisque';
				}
			}
		}
	}else{
		ovoTexStatic.style.background = 'bisque';
	}
})

// touch

ovo.touch.left.addEventListener('touchstart', function(){
	ovo.touch.right.classList.add('wiggle');
})
ovo.touch.left.addEventListener('touchend', function(){
	ovo.touch.right.classList.remove('wiggle');
})
ovo.touch.right.addEventListener('touchstart', function(){
	ovo.touch.left.classList.add('wiggle');
})
ovo.touch.right.addEventListener('touchend', function(){
	ovo.touch.left.classList.remove('wiggle');
})

// warming

var warmLeftInteraction = new Hammer.Manager(ovo.warming.left);
warmLeftInteraction.add(new Hammer.Pan({
	direction: Hammer.DIRECTION_ALL,
	threshold: 1,
	pointers: 1
}))
var warmRightInteraction = new Hammer.Manager(ovo.warming.right);
warmRightInteraction.add(new Hammer.Pan({
	direction: Hammer.DIRECTION_ALL,
	threshold: 1,
	pointers: 1
}))
var heat = {
	left : 0,
	right : 0
}
warmRightInteraction.on('pan', function(){
	if(heat.left < 1){
		heat.left += 0.008;
		ovo.warming.heatRight.style.opacity = heat.left;
	}
})
warmLeftInteraction.on('pan', function(){
	if(heat.right < 1){
		heat.right += 0.008;
		ovo.warming.heatLeft.style.opacity = heat.right;
	}
})

function colden(){
	heat.left -= 0.003
	heat.right -= 0.003
	ovo.warming.heatRight.style.opacity = heat.right;
	ovo.warming.heatLeft.style.opacity = heat.left;
}

var timer = 0;
var currentTime,
	last = 0,
	elapsed = 0;

function clock() {
	currentTime = new Date().getTime();
	// do things
	collisionTimer(1.5);
	colden();
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
