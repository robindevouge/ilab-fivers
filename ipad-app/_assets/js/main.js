// 1366 * 1024
// REMOVE LATER : this is to open directly a panel on load
// setSliderOffset('set',3);

var clock = {
	currentTime: 0,
	lastTime: 0,
	elapsedTime: 0,
	run: function() {
		this.currentTime = new Date().getTime();
		this.elapsedTime = (this.currentTime - this.lastTime) / 1000; //unit in secs

		bump.collisionTimer(1.5, this.elapsedTime);
		warm.coolDown();

		this.lastTime = this.currentTime;
		requestAnimationFrame(clock.run)
	}
}

var interactions = {
		bump: {
			ovo: {
				left: document.querySelector('.bump__ovo--left'),
				right: document.querySelector('.bump__ovo--right')
			},
			flashScreen: document.querySelector('.bump__flashScreen'),
			timer: 0,
			finished: false,
			collisionTimer: function(t, elapsed) {
				var leftHandPos = this.ovo.left.getBoundingClientRect().right;
				var rightHandPos = this.ovo.right.getBoundingClientRect().left;

				if(hasClass(slider.panelsCnt[0], "appear") && leftHandPos >= rightHandPos) { // means the 2 blocks are overlaping
					this.ovo.left.classList.add('bumped');
					this.ovo.right.classList.add('bumped');
					if(!this.finished) {

						this.timer += elapsed;

						var progress = this.timer / t;

						console.log(progress);

						this.flashScreen.style.opacity = progress;

						if(this.timer >= t) {
							this.finished = true;
							this.timer = 0;
							this.flashScreen.style.background = "#81c784"
						}
					}
				} else {
					this.timer = 0;
					this.finished = false;
					this.flashScreen.style.opacity = 0;
					this.flashScreen.style.background = "#e0f2f1";
					this.ovo.left.classList.remove('bumped');
					this.ovo.right.classList.remove('bumped');
				}
			}
		},
		texture: {
			ovo: {
				move: document.querySelector('.texture__ovo--moveable'),
				static: document.querySelector('.texture__ovo--static')
			}
		},
		touch: {
			ovo: {
				left: document.querySelector('.touch__ovo--left'),
				right: document.querySelector('.touch__ovo--right')
			}
		},
		warm: {
			ovo: {
				left: document.querySelector('.warming__ovo--left'),
				right: document.querySelector('.warming__ovo--right')
			},
			heat: {
				left: document.querySelector('.warming__heat--left'),
				right: document.querySelector('.warming__heat--right')
			},
			temp: {
				left: 0,
				right: 0
			},
			coolDown: function() {
				if(this.temp.left >= 0) {
					this.temp.left -= 0.003;
					this.heat.left.style.opacity = this.temp.left;
				}
				if(this.temp.right >= 0) {
					this.temp.right -= 0.003;
					this.heat.right.style.opacity = this.temp.right;
				}



			}
		}
	},
	bump = interactions.bump,
	texture = interactions.texture,
	touch = interactions.touch,
	warm = interactions.warm,
	features = document.querySelectorAll('.feature'),
	slider = {
		offset: 0,
		section: document.querySelector('.section--details'),
		container: document.querySelector('.details__container'),
		closeBtn: document.querySelector('.details__close'),
		panels: document.querySelectorAll('.details__panel'),
		panelsBg: document.querySelectorAll('.panel__background'),
		panelsCnt: document.querySelectorAll('.panel__content'),
		spread: function() {
			for(var i = 0; i < this.panels.length; i++) {
				this.panelsBg[i].classList.add('spread');
				this.panelsCnt[i].classList.add('appear');
			}
		},
		shrink: function() {
			for(var i = 0; i < this.panels.length; i++) {
				this.panelsBg[i].classList.remove('spread')
				this.panelsCnt[i].classList.remove('appear')
			}
		},
		setOffset: function(action, offset) {
			switch(action) {
				case 'set':
					slider.offset = offset;
					slider.container.style.transition = "none";
					break;
				case 'increment':
					slider.offset += offset;
					switch(slider.offset) {
						case -1:
							slider.offset = 0;
							break;
						case 4:
							slider.offset = 3;
							break;
					}
					slider.container.style.transition = 'left .3s';
					break;
			}
			slider.container.style.left = -100 * slider.offset + 'vw';
		}
	}

function hasClass(elem, klass) {
	return(" " + elem.className + " ").indexOf(" " + klass + " ") > -1;
}

// FEATURES OPENING/CLOSING

for(var i = 0; i < features.length; i++) {
	features[i].addEventListener('click', function(e) {
		var offset = e.target.classList[1].slice(-1) - 1;
		slider.setOffset('set', offset);
		slider.section.classList.remove('inexistent', 'transparent');
		setTimeout(function() {
			slider.spread();
			window.scrollTo(0, document.body.scrollHeight);
			document.body.style.overflow = "hidden";

		}, 1);
	});
}

slider.closeBtn.addEventListener('click', function() {
	slider.section.classList.add('transparent');
	document.body.style.overflow = 'auto';
	setTimeout(function() {
		slider.shrink();
		slider.section.classList.add('inexistent');
	}, 300);
});

// SWIPE
var sliderInteraction = new Hammer.Manager(slider.section);
sliderInteraction.add(new Hammer.Swipe({
	direction: Hammer.DIRECTION_HORIZONTAL,
	threshold: 200,
	velocity: 1.7
}));

sliderInteraction.on('swipeleft', function() {
	slider.setOffset('increment', 1);
});
sliderInteraction.on('swiperight', function() {
	slider.setOffset('increment', -1);
});

var handLeftInteraction = new Hammer.Manager(bump.ovo.left);
handLeftInteraction.add(new Hammer.Pan({
	direction: Hammer.DIRECTION_HORIZONTAL,
	threshold: 1,
	pointers: 1
}));
handLeftInteraction.on('pan', function(e) {
	bump.ovo.left.style.transform = 'translateX(' + e.deltaX + 'px) translateY(-50%)';
});
handLeftInteraction.on('panend', function() {
	var myAnimation = anime({
		targets: bump.ovo.left,
		translateX: '0',
		translateY: '-50%',
		duration: 300,
		easing: 'easeOutBack',
		loop: false
	});
});
var handRightInteraction = new Hammer.Manager(bump.ovo.right);
handRightInteraction.add(new Hammer.Pan({
	direction: Hammer.DIRECTION_HORIZONTAL,
	threshold: 1,
	pointers: 1
}));
handRightInteraction.on('pan', function(e) {
	bump.ovo.right.style.transform = 'translateX(' + e.deltaX + 'px) translateY(-50%)';
});
handRightInteraction.on('panend', function() {
	var myAnimation = anime({
		targets: bump.ovo.right,
		translateX: '0',
		translateY: '-50%',
		duration: 300,
		easing: 'easeOutBack',
		loop: false
	});
});


var draggable = new Draggabilly(texture.ovo.move, {

});

draggable.on('pointerDown', function() {
	texture.ovo.move.classList.add('scaleUp');
});

draggable.on('dragEnd', function() {
	var endPointX = draggable.position.x + texture.ovo.move.clientWidth / 2,
		endPointY = draggable.position.y + texture.ovo.move.clientHeight / 2;
	if(endPointY > window.innerHeight - window.innerWidth / 4) {
		if(endPointX > window.innerWidth * 0.75) {
			texture.ovo.static.style.background = 'green';
		} else {
			if(endPointX > window.innerWidth / 2) {
				texture.ovo.static.style.background = 'blue';
			} else {
				if(endPointX > window.innerWidth * 0.25) {
					texture.ovo.static.style.background = 'red';
				} else {
					texture.ovo.static.style.background = 'bisque';
				}
			}
		}
	} else {
		texture.ovo.static.style.background = 'bisque';
	}
})

// touch

touch.ovo.left.addEventListener('touchstart', function() {
	touch.ovo.right.classList.add('wiggle');
})
touch.ovo.left.addEventListener('touchend', function() {
	touch.ovo.right.classList.remove('wiggle');
})
touch.ovo.right.addEventListener('touchstart', function() {
	touch.ovo.left.classList.add('wiggle');
})
touch.ovo.right.addEventListener('touchend', function() {
	touch.ovo.left.classList.remove('wiggle');
})

// warming

var warmLeftInteraction = new Hammer.Manager(warm.ovo.left);
warmLeftInteraction.add(new Hammer.Pan({
	direction: Hammer.DIRECTION_ALL,
	threshold: 1,
	pointers: 1
}))
var warmRightInteraction = new Hammer.Manager(warm.ovo.right);
warmRightInteraction.add(new Hammer.Pan({
	direction: Hammer.DIRECTION_ALL,
	threshold: 1,
	pointers: 1
}))
var heat = {
	left: 0,
	right: 0
}
warmRightInteraction.on('pan', function() {
	if(warm.temp.left < 1) {
		warm.temp.left += 0.008;
		warm.heat.left.style.opacity = warm.temp.left;
	}
})
warmLeftInteraction.on('pan', function() {
	if(warm.temp.right < 1) {
		warm.temp.right += 0.008;
		warm.heat.right.style.opacity = warm.temp.right;
	}
})

function colden() {
	if(warm.heat.left >= 0) {
		warm.heat.left -= 0.003
		warm.ovo.right.style.opacity = warm.heat.right;
	}

	warm.heat.right -= 0.003

	warm.ovo.left.style.opacity = warm.heat.left;
}

requestAnimationFrame(clock.run);
