jQuery(document).ready(function ($) {
	$("photos img").each(function () {
		var _a = $("<a></a>").attr("href", this.src);
		$(this).wrap("<div class='photo'></div>").wrap(_a);
	})
	isImgLoad(function () {
		var photos = document.querySelector('photos');
		if (photos) {
			waterfall(photos);
		}
		$(window).resize(function () {
			if (photos) {
				waterfall(photos);
			}
		});
	});
	var t_img;
	var isLoad = true;

	function isImgLoad(callback) {
		$('photos img').each(function () {
			if (this.height === 0) {
				isLoad = false;
				return false;
			}
		});
		if (isLoad) {
			clearTimeout(t_img);
			callback();
		} else {
			isLoad = true;
			t_img = setTimeout(function () {
				isImgLoad(callback);
			}, 500);
		}
	}

	//灯箱
	$(".post-content img:not(.avatar)").each(function () {
		var _b = $("<a></a>").attr("href", this.src);
		$(this).wrap(_b);
	})
	$(".post-content a[rel!=link]:has(img)").slimbox();


	//相对时间
	$.lately({
		'target': '.article-date'
	});

	//文章toc固定
	var nav = $(".post-toc");
	var backtop = $(".backtop");
	if (nav.length > 0) {
		nav.removeClass("hide");
		var navTop = $(".post-toc").offset().top;
		var w = $(".post-sidebar").width();
		$(window).scroll(function () {
			var scrolls = $(this).scrollTop();
			if (scrolls > navTop) {
				nav.css({
					"top": 24,
					"width": w,
					"position": "fixed"
				});
				backtop.addClass("d-md-block");
			} else {
				nav.css({
					"top": 0,
					"position": "relative"
				});
				backtop.removeClass("d-md-block");
			};
		});
	};

	$('.backtop').bind('click', function () {
		$("html,body").animate({
				scrollTop: 0
			},
			800);
	});

	//toc
	let mainNavLinks = document.querySelectorAll(".post-toc a");

	window.addEventListener("scroll", event => {
		let fromTop = window.scrollY;

		mainNavLinks.forEach((link, index) => {
			let section = document.getElementById(decodeURI(link.hash).substring(1));
			let nextSection = null
			if (mainNavLinks[index + 1]) {
				nextSection = document.getElementById(decodeURI(mainNavLinks[index + 1].hash).substring(1));
			}
			if (section.offsetTop <= fromTop) {
				if (nextSection) {
					if (nextSection.offsetTop > fromTop) {
						link.classList.add("current");
					} else {
						link.classList.remove("current");
					}
				} else {
					link.classList.add("current");
				}
			} else {
				link.classList.remove("current");
			}
		});
	});

	jQuery(document).ready(function ($) {
		var checkComments = setInterval(function () {
			var counts = $('.tk-comments-count').find('span').first().text();
			if (counts) {
				$('#twikoo_count').text(counts);
				clearInterval(checkComments);
			}
		}, 1000);
		if (window.location.hash) {
			var checkExist = setInterval(function () {
				if ($(window.location.hash).length) {
					$('html, body').animate({
						scrollTop: $(window.location.hash).offset().top - 90
					}, 1000);
					clearInterval(checkExist);
				}
			}, 100);
		}
	});

	//外链新窗口
	var parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
	var location_href = window.location.href.replace(parse_url, '$3');
	$('.post-content a:not(:has(img),a.read-more),.author-name a,.links-item a').hover(function () {
		var this_href = $(this).attr('href');
		var replace_href = this_href.replace(parse_url, '$3');
		if (this_href != replace_href && location_href != replace_href) {
			$(this).attr('target', '_blank');
		}
	});

});