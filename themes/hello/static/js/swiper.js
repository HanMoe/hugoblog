(function ($) {

$(document).ready(function () {
        
		var swiper = new Swiper('.swiper-container', {
			direction: 'horizontal',
			loop: true, //让Swiper看起来是循环的
			loopAdditionalSlides: 3,
			autoplay: true, //自动切换的时间间隔
			speed: 600,
			autoplay: {
				delay: 5000
			},
			pagination: {
				el: '.swiper-pagination',
				clickable: true
			},
			paginationType: 'bullets', //圆点
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			autoplayDisableOnInteraction: false,
			effect: 'slide',
			slidesPerView: 'auto',
			spaceBetween: 16,
			observer: true,
			centeredSlides: true,
			observeParents: true,
			on: {
				transitionEnd: function () {
					this.autoplay.start();
				}
			}

		});

		jQuery('.swiper-button-prev').css('left', '24px');
		jQuery('.swiper-button-next').css('right', '24px');
	});

})(jQuery);