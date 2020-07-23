$(document).ready(function () {

	// nice select
	//$('.select-beauty').niceSelect();
	// nice select === end

	//modals
	var modalState = {
		"isModalShow": false, //state show modal
		"scrollPos": 0
	};
	var scrollWidth= window.innerWidth - $(document).width();
	var openModal = function () {
		if (!$('.modal-layer').hasClass('modal-layer-show')) {
			$('.modal-layer').addClass('modal-layer-show');
			modalState.scrollPos = $(window).scrollTop();
			$('body').css({
				overflowY: 'hidden',
				top: -modalState.scrollPos,
				width: '100%',
				paddingRight:scrollWidth
			});

		}
		modalState.isModalShow = true;
	};

	var closeModal = function () {
		$('.modal-layer').removeClass('modal-layer-show');
		$('body').css({
			overflow: '',
			position: '',
			top: modalState.scrollPos,
			paddingRight:0
		});
		$(window).scrollTop(modalState.scrollPos);
		$('.modal').addClass('modal-hide-animation');
		setTimeout(function(){
			$('.modal').removeClass('modal-hide-animation');
			$('.modal').removeClass('modal__show');
		},600);
		modalState.isModalShow = false;
	};

	var initModal = function (el) {
		openModal();

		$('.modal').each(function () {
			if ($(this).data('modal') === el) {
				$(this).addClass('modal__show')
			} else {
				$(this).removeClass('modal__show')
			}
		});
		var modalHeightCont = $(window).height();
		$('.modal-filter').height(modalHeightCont);

	};

	$('.modal-get').click(function () {
		var currentModal = $(this).data("modal");
		initModal(currentModal);
	});

	$('.modal-close, .modal-hide').click(function () {
		closeModal();
	});
	//modals===end

	// fix top-menu
	var shrinkHeader = 100;
	var head = $('.header-wrap');
	if(head.hasClass('header-wrap--main')){
		var heightHeader = 0;
	}else{
		var heightHeader = head.height();
	}
	$(window).scroll(function() {
		var scroll = $(this).scrollTop();
		if ( scroll >= shrinkHeader ) {
				$('body').css('paddingTop',heightHeader);
				head.addClass('shrink');
			}
			else {
					$('body').css('paddingTop',0);
					head.removeClass('shrink');
			}
	});

	$(window).resize(function(){
		heightHeader=head.height();
	});
	// fix top-menu === end

	// main-slider
	$('.main-slider').slick({
		slidesToShow: 1,
		speed: 500,
		dots:true,
		arrows:false,
		rows:0,
		centerMode: true,
    centerPadding: '8vw',
		//autoplay: true,
		//fade: true
		//autoplaySpeed: 8000, time between
		responsive: [
			{
				breakpoint: 1124,
				settings: {
					slidesToShow:1,
					centerMode: false,
				}
			}
		],
		customPaging : function(slider, i) {
			return '<span class="dot"></span>';
		}
	});
	$('.example').slick({
		slidesToShow: 1,
		speed: 500,
		dots:false,
		arrows:false,
		rows:0,
		//autoplay: true,
		//fade: true
		//autoplaySpeed: 8000, time between
		customPaging : function(slider, i) {
			return '<span class="dot"></span>';
		}
	});
	// main-slider === end

	// === custom arrow el ===
	$('.slider-control--right').click(function(){
		$(this).closest(".slider-wrap").find(".slider-item").slick('slickNext');
	});

	$('.slider-control--left').click(function(){
		$(this).closest(".slider-wrap").find(".slider-item").slick('slickPrev');
	});
	// custom arrow el === end

	// gallery
	$('.gallery-slider').slick({
		slidesToShow: 1,
		speed: 500,
		dots:false,
		arrows:false,
		asNavFor: '.gallery-slider-nav',

	});
	// gallery === end

	// gallery nav
	$('.gallery-slider-nav').slick({
		slidesToShow: 5,
		speed: 500,
		dots:false,
		arrows:false,
		rows:0,
		asNavFor: '.gallery-slider',
		focusOnSelect: true,
		responsive: [
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 4
				}
			}
		],
	});
	// gallery nav === end


	// fancybox
	$('.fancybox').fancybox();
	// fancybox === end

	// scroll to id
	var extendScroll = $(window).width() > 1025 ? 90 : 50
	$("a[rel='m_PageScroll2id']").mPageScroll2id({
		offset: extendScroll,
		highlightClass: "header-nav__el--active",
	});
	// scroll to id === end

	//stick scroll
	if($(window).width() > 1025 ){
		$(".btn--scroll").stick_in_parent({
			'offset_top':120
		});
	}
	//stick scroll

	// gallery
	$('.gallery').mixItUp();
	// gallery === end

	// toggle single
	$('.js-toggle').click(function(){
		$(this).toggleClass("active")
	})
	// toggle single === end

	//toggle class + neighbor
	$('.js-commutator-el').click(function(){
		var thisItem = $(this).data("item");
		var thisGroup = $(this).data("group") || false;
		var isEach = $(this).data("each") || false;
		var selector;
		$(this).toggleClass("active")
		if($('.js-commutator-cont').data('group')) {
			selector = $(".js-commutator-cont[data-group=" + thisGroup + "");
		}else{
			selector = $(".js-commutator-cont");
		}
		selector.each(function(){
			if($(this).data("item")=== thisItem){
				$(this).slideToggle();
			}else{
				isEach ? $(this).slideUp("active") : false
			}
		})
	})
	//toggle class + neighbor === end

	//toggle class + parent
	$('.js-switch').click(function(){
		var thisItem = $(this).data("item");
		var isEach = $(this).data("each") || false;
		var parrent = $(this).closest(".js-switch-parrent");
		$(this).toggleClass("active")
		var selector;
		selector = $(".js-switch[data-item=" + thisItem + "")
		if(isEach){
			selector.not(this).removeClass('active')
			selector.not(this).closest(".js-switch-parrent").find(".js-switch-cont").removeClass('active')
		}
		parrent.find(".js-switch-cont").slideToggle('active')
	})
	//toggle class + parent === end

	// tab
	$('.js-tab-head').click(function(){
		var index = $(this).index();
		var parent = $(this).closest('.js-tab-wrap');
		parent.find('.js-tab-head').removeClass('active');
		$(this).addClass('active');
		parent.find('.js-tab-info').each(function(){
			if($(this).index()===index){
				$(this).addClass('active')
			}else{
				$(this).removeClass('active')
			}
		})
	});
	// tab === end

	// accordion row toggle
	$('.accordion__el-head').click(function () {
		$(this).toggleClass('accordion__el--active');
		$(this).closest('.accordion__el').find('.accordion__el-content').slideToggle();
	});
	// accordion row toggle === end

	// dropdown
	$('.dropdown').click(function () {
		var current = $(this);
		current.attr('tabindex', 1).focus();
		if(!$(this).hasClass("active")){
			current.toggleClass('active');
			current.find('.dropdown-menu').slideToggle(300,function(){});
		}else{
			current.find('.dropdown-menu').slideToggle(300,function(){
				current.toggleClass('active');
			});
		}
	});
	$('.dropdown').focusout(function () {
		var current = $(this);
		current.find('.dropdown-menu').slideUp(300,function(){
			current.removeClass('active');
		});
	});
	$('.dropdown .dropdown-menu__el').click(function () {
		var parent = $(this).parents('.dropdown')
		parent.find('.dropdown-current__val').html($(this).html());
		parent.find('input').attr('value', $(this).data('value'));
	});
	// dropdown === end

	// toggle size items
	$('.size__el').click(function () {
		$(this).closest('.size').find('.size__el').removeClass('size__el--active');
		$(this).addClass('size__el--active');
	});
	// toggle size items === end

	// slide menu
	$('.js-slide-block-toggle').click(function (event) {
		$(".js-slide-block-toggle").not(this).removeClass('slide-block-toggle--open');
		var current = $(this).data("menu");
		$(".slide-block").each(function () {
			if ($(this).data("menu") === current) {
				$(this).toggleClass("slide-block--open")
			} else {
				$(this).removeClass("slide-block--open")
			}
		})
		$(this).toggleClass('slide-block-toggle--open');
	});
	// slide menu === end

	// toggle mobile tabs
	$('.tab-head-mobile').click(function(){
		$(this).toggleClass('active')
		$(this).closest(".tab-cont").find('.tab-cont-content').slideToggle();
	});
	// toggle mobile tabs === end
});
