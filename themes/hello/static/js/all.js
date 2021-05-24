jQuery(document).ready(function($) {
	$("photos img").each(function() {
		var _a = $("<a></a>").attr("href", this.src);
		$(this).wrap("<div class='photo'></div>").wrap(_a);
	})
	isImgLoad(function() {
		var photos = document.querySelector('photos');
		if (photos) {
			waterfall(photos);
		}
		$(window).resize(function() {
			if (photos) {
				waterfall(photos);
			}
		});
	});
	var t_img;
	var isLoad = true;

	function isImgLoad(callback) {
		$('photos img').each(function() {
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
			t_img = setTimeout(function() {
				isImgLoad(callback);
			}, 500);
		}
	}
});


jQuery(document).ready(function($) {
	//灯箱
	$(".post-content img:not(.avatar)").each(function() {
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
	if (nav.length > 0) {
		nav.removeClass("hide");
		var navTop = $(".post-toc").offset().top;
		var w = $(".post-sidebar").width();
		$(window).scroll(function() {
			var scrolls = $(this).scrollTop();
			if (scrolls > navTop) {
				nav.css({
					"top": 24,
					"width": w,
					"position": "fixed"
				});
			} else {
				nav.css({
					"top": 0,
					"position": "relative"
				});
			};
		});
	};
	
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

	//外链新窗口
	var parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
	var location_href = window.location.href.replace(parse_url, '$3');
	$('.post-content a:not(:has(img),a.read-more),.author-name a,.links-item a').hover(function() {
	var this_href = $(this).attr('href');
	var replace_href = this_href.replace(parse_url, '$3');
	if (this_href != replace_href && location_href != replace_href) {
		$(this).attr('target', '_blank');
	}
	});
});
