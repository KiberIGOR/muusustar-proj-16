initMenu();
headerScroll();
function initMenu() {
	$('.header__menu').on('click', function () {
		$('.header__nav').toggleClass('active')

	});
	$('.header__nav-link').on('click', function () {
		$('.ham, .header__nav').removeClass('active');
	});
}


function headerScroll() {
	const headerMenu = document.querySelector(".header");
	window.addEventListener("scroll", () => {
		if ($(window).width() > 767) {
			let scrollTop = $(window).scrollTop();
			if (scrollTop >= 1) {
				headerMenu.style.background = "rgba(255, 255, 255, 1)";
				// document.querySelector(".header__info").setAttribute('style', 'padding-top: 1rem');
			}
			if (scrollTop <= 1) {
				headerMenu.style.background = "rgba(255, 255, 255, 0)";
				if ($(window).width() > 1199) {
					// document.querySelector(".header__info").setAttribute('style', 'padding-top: 3rem');
				} else {
					// document.querySelector(".header__info").setAttribute('style', 'padding-top: 2rem');
				}
			}
		}
		if ($(window).width() <= 767) {
			headerMenu.style.background = "rgba(255, 255, 255, 0)";
			// document.querySelector(".header__info").setAttribute('style', 'padding-top: 1.3rem')
		}
	});
}
$(function () {

	let
	// lazyArr = [].slice.call(document.querySelectorAll('.lazy')),
	// lazyArr = [].slice.call(querySelectorAllLive(document, '.lazy')),
	active = false,
	threshold = 200
	;

	const lazyLoad = function(e) {
		if (active === false) {
			active = true;
			let lazyArr = [].slice.call(document.querySelectorAll('.lazy'));

			setTimeout(function() {
				lazyArr.forEach(function(lazyObj) {
					if ((lazyObj.getBoundingClientRect().top <= window.innerHeight + threshold && lazyObj.getBoundingClientRect().bottom >= -threshold) && getComputedStyle(lazyObj).display !== 'none') {

						if ( lazyObj.dataset.src ) {
							let
							img = new Image(),
							src = lazyObj.dataset.src
							;
							img.src = src;
							img.onload = function() {
								if (!! lazyObj.parent) {
									lazyObj.parent.replaceChild(img, lazyObj);
								} else {
									lazyObj.src = src;
								}
							}
							lazyObj.removeAttribute('data-src');
						}

						if ( lazyObj.dataset.srcset ) {
							lazyObj.srcset = lazyObj.dataset.srcset;
							lazyObj.removeAttribute('data-srcset');
						}

						lazyObj.classList.remove('lazy');
						lazyObj.classList.add('lazy-loaded');

						lazyArr = lazyArr.filter(function(obj) {
							return obj !== lazyObj;
						});

						if (lazyArr.length === 0) {
							document.removeEventListener('scroll', lazyLoad);
							window.removeEventListener('resize', lazyLoad);
							window.removeEventListener('orientationchange', lazyLoad);
						}
					}
				});

				active = false;
			}, 1);
		}
	};

	function querySelectorAllLive(element, selector) {
		var result = Array.prototype.slice.call(element.querySelectorAll(selector));

		var observer = new MutationObserver(function(mutations) {
			mutations.forEach(function(mutation) {
				[].forEach.call(mutation.addedNodes, function(node) {
					if (node.nodeType === Node.ELEMENT_NODE && node.matches(selector)) {
						result.push(node);
					}
				});
			});
		});

		observer.observe(element, { childList: true, subtree: true });

		return result;
	}

	lazyLoad();

	document.addEventListener('scroll', lazyLoad);
	window.addEventListener('resize', lazyLoad);
	window.addEventListener('orientationchange', lazyLoad);

});

/*Marquee skroling bar*/
innitMarquee();
function innitMarquee() {
	let a;

	if (document.body.clientWidth > 767) { a = 25 }
	else if (document.body.clientWidth > 320) { a = 15 };

	$('.marquee').marquee({
		duration: 20000,
		gap: 0,
		delayBeforeStart: 0,
		direction: 'left',
		duplicated: true,
		startVisible: true,
		speed: a
	});
}

(function () {
	const breakpoint = window.matchMedia('(min-width:768px)');
	let mySwiper;
	const breakpointChecker = function () {

		// if larger viewport and multi-row layout needed
		if (breakpoint.matches === true) {

			// clean up old instances and inline styles when available
			if (mySwiper !== undefined) mySwiper.destroy(true, true);

			// or/and do nothing
			return enableSwiper();

			// else if a small viewport and single column layout needed
		} else if (breakpoint.matches === false) {

			// fire small viewport version of swiper
			return enableSwiper();

		}

	};
	const enableSwiper = function () {
		mySwiper = new Swiper('.words__slider', {
			direction: 'horizontal',
			loop: false,
			slidesPerView: 1,
			slideToClickedSlide: true,
			pagination: false,
			updateOnWindowResize: true,

			breakpoints: {
				// when window width is >= 320px
				320: {
					slidesPerView: 'auto',
					spaceBetween: 20
				},
				768: {
					slidesPerView: 1,
					navigation: {
						nextEl: '.words__next',
						prevEl: '.words__prev',
					}


				}
			}

		});
	}
	breakpoint.addListener(breakpointChecker);


	breakpointChecker();
}
	());

/*Спикеры убирание data-more-hidden*/
$('[data-more-button]').on('init.more click', function (event) {
	var
		$container = $('[data-more-options]', $(this).parent()),
		options = {},
		visible = 0,
		window_width = $(window).width(),
		$items
		;

	options = $container.data('more-options');

	if (event.type == 'init') {
		visible = window_width > 767 ? options.init_desktop : options.init_mobile;

		/*if ( window_width > 767 && window_width < 1200 && visible % 2 == 0 ) {
		visible--;
		}*/
	}
	else {
		visible = window_width > 767 ? options.show_desktop : options.show_mobile;
	}

	$items = $('[data-more-hidden]');
	$items.slice(0, visible).removeAttr('data-more-hidden');

	$('html, body')
		.animate({ scrollTop: '+=1' }, 0)
		.animate({ scrollTop: '-=1' }, 0)
		;

	if ($items.length - visible <= 0) {
		$(this).addClass('d-none');
	}

})
	.trigger('init.more');

initTabs();
function initTabs() {
	let tabs = document.querySelectorAll('.form-section-tab');

	for (let currenTab of tabs) {
		currenTab.addEventListener('click', function () {
			let clearAllLinks = this.closest('.form-section-tabs');

			/* убираю active у всех кнопок */
			for (let i = 0; i < clearAllLinks.children.length; i++) {
				clearAllLinks.children[i].classList.remove('active');
			}

			/* добавляю active текущей кнопке + смотрю значение атрибута f*/
			this.classList.add('active');
			let currentSelect = this.getAttribute('data-tab');

			/* проверяю значения атрибута -> если совпадает -> показываюа */
			let sublinkAll = document.querySelectorAll('.form-section-current');

			for (let sublinkCurrent of sublinkAll) {
				let sublinkCurrentValue = sublinkCurrent.getAttribute('data-current')
				sublinkCurrent.classList.remove('active')

				if (sublinkCurrentValue == currentSelect) {
					sublinkCurrent.classList.add('active')
				}

			}

		})
	}
}

(function () {
	const breakpoint = window.matchMedia('(min-width:768px)');
	let mySwiper;
	const breakpointChecker = function () {

		// if larger viewport and multi-row layout needed
		if (breakpoint.matches === true) {

			// clean up old instances and inline styles when available
			if (mySwiper !== undefined) mySwiper.destroy(true, true);

			// or/and do nothing
			return;

			// else if a small viewport and single column layout needed
		} else if (breakpoint.matches === false) {

			// fire small viewport version of swiper
			return enableSwiper();

		}

	};
	const enableSwiper = function () {
		mySwiper = new Swiper('.speakers__slider', {
			direction: 'horizontal',
			loop: false,
			slidesPerView: 1,
			slideToClickedSlide: true,
			pagination: false,
			updateOnWindowResize: true,

			breakpoints: {
				// when window width is >= 320px
				320: {
					slidesPerView: 'auto',
					spaceBetween: 20
				}
			}

		});
	}
	breakpoint.addListener(breakpointChecker);


	breakpointChecker();
}
	());

$(function () {
    /* Inits */
    //initlazy();
    //backgraundmenu
    function initBodyScroll() {
        $(document)
            .on('scroll init.scroll', function () {
                var
                    scroll_top = $(this).scrollTop(),
                    /*window_height = $(window).height(),*/
                    header_height = $('#header').height()
                    ;

                $('body').toggleClass('page-scrolled', scroll_top > header_height);

            })
            .trigger('init.scroll');
    }


    /* Слайдеры */

    // let $advantage_slider = $('.organizator__block'),
    //     settingsAdvantage = {
    //         mobileFirst: true,
    //         dots: false,
    //         arrows: false,
    //         infinite: false,
    //         centerMode: true,
    //         slidesToShow: 1.545,
    //         slidesToScroll: 1,
    //         rows: 2,
    //         centerPadding: '10px',
    //         responsive: [
    //             {
    //                 breakpoint: 767,
    //                 settings: "unslick"
    //             }
    //         ]

    //     }


    // $advantage_slider.slick(settingsAdvantage);

    // $(window).on('resize', function () {
    //     if (!$advantage_slider.hasClass('slick-initialized')) {
    //         return $advantage_slider.slick(settingsAdvantage);
    //     }
    // });

});



