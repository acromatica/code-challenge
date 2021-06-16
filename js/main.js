const tags = document.querySelectorAll('.tag');
const tooltips = document.querySelectorAll('.tag--tooltip');
let vW2 = window.innerWidth / 2;

window.addEventListener('resize', function () {
	vW2 = window.innerWidth / 2;
});

function isTouchDevice() {
	return (('ontouchstart' in window) ||
		(navigator.maxTouchPoints > 0) ||
		(navigator.msMaxTouchPoints > 0));
}

if(isTouchDevice()) {
	document.body.classList.add('touchscreen');
}
else {
	document.body.classList.add('nontouchscreen');
}

tags.forEach(function(tag) {
	tag.addEventListener('mouseenter', (event) => {
		showTooltip(tag);
	});

	tag.addEventListener('mouseleave', (event) => {
		removeActiveTagState();
	});

	tag.addEventListener('focusin', (event) => {
		showTooltip(tag);
	});

	tag.addEventListener('focusout', (event) => {
		removeActiveTagState();
	});

	tag.addEventListener('keydown', (event) => {
		if(event.key === 'Escape') {
			removeActiveTagState();
		}
		else if (event.key === 'Enter') {
			removeActiveTagState();
			showTooltip(tag);
		}
	});
});

function removeActiveTagState() {
	tags.forEach(function(tag) {
		tag.classList.remove('active');
		tag.setAttribute('aria-expanded', 'false');
	});

	tooltips.forEach(function(tooltip) {
		tooltip.setAttribute('aria-hidden', 'true');
	});
}

function showTooltip(el) {
	let tooltip = el.querySelector('.tag--tooltip');
	removeActiveTagState();
	el.setAttribute('aria-expanded', 'true');
	el.classList.add('active');
	tooltip.setAttribute('aria-hidden', 'false');
	tooltip.style.left = -1 * (el.getBoundingClientRect().left - vW2 + el.clientWidth / 2) + 'px';
}

let heroSwiper = new Swiper('.heroSwiper', {
	slidesPerView: 'auto',
	freeMode: true,
	initialSlide: 1,
	centeredSlides: true,
	centeredSlidesBounds: true,
	freeModeMomentumBounceRatio: .6,
	on: {
		sliderFirstMove: function (swiper, event) {
			swiper.el.classList.add('heroSwiper--move');
		},
		resize: function () {
			removeActiveTagState();
		},
		transitionStart: function () {
			removeActiveTagState();
		},
	}
});