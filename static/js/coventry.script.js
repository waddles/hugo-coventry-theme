var AT_Main = {
	
	getWidthBrowser : function() { // Get width browser
		var myWidth;

		if( typeof( window.innerWidth ) == 'number' ) {
			//Non-IE 
			myWidth = window.innerWidth;
		} 
		else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) { 
			//IE 6+ in 'standards compliant mode' 
			myWidth = document.documentElement.clientWidth; 
		} 
		else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) { 
			//IE 4 compatible 
			myWidth = document.body.clientWidth;  
		}

		return myWidth;
	}
	
	,checkLayout : function() { // Function to check level of layout
		if(jQuery("#checkLayout .visible-xs-block").css("display") == "block")
			return 1; //mobile layout
		else if(jQuery("#checkLayout .visible-sm-block").css("display") == "block")
			return 2; //tablet portrait layout
		else if(jQuery("#checkLayout .visible-md-block").css("display") == "block")
			return 3; //tablet landscape/medium desktop layout
		else if(jQuery("#checkLayout .visible-lg-block").css("display") == "block")
			return 4; //desktop layout
	}
  
	,homeSlideshow : function(){
        if(jQuery('.home-slideshow-wrapper').length){
            jQuery('.home-slideshow-wrapper').each(function(index,value){
              
                var _delay_time = '';
                if( parseInt(_coventry_config.home_slideshow_auto_delay) > 0 ){
                	_delay_time = parseInt(_coventry_config.home_slideshow_auto_delay);
                }
              
                var swiper = new Swiper('.swiper-container', {
                  	autoplay: _delay_time
                    ,pagination: '.swiper-pagination'
                    ,paginationClickable: '.swiper-pagination'
                    ,nextButton: '.swiper-button-next'
                    ,prevButton: '.swiper-button-prev'
                    ,spaceBetween: 30
                    ,scrollbarDraggable: true
                    ,effect: jQuery(value).data('animation')
                  	,setWrapperSize: false
                    ,onImagesReady: function(swiper){
                    	var slideH = $(swiper.container[0]).find('.swiper-slide > img').height(),
                      		slideW = $(swiper.container[0]).find('.swiper-slide > img').width();
                      	$(swiper.container[0]).find('.swiper-slide > img').css('visibility','hidden');
                      	$(swiper.container[0]).find('.swiper-slide').each(function(){
                          var _this = $(this);
                          _this.find('.video-slide').show();
                          _this.find('.video-slide video').css({
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%,-50%)'
                          });	
                          
                        });
                    }
                });
            });
        }
    }
  
  	,homeIE : function(){
        if(jQuery('.home-slideshow-wrapper').length){
            jQuery('.home-slideshow-wrapper').each(function(index,value){
                var _delay_time = '';
                if( parseInt(_coventry_config.home_slideshow_auto_delay) > 0 ){
                  _delay_time = parseInt(_coventry_config.home_slideshow_auto_delay);
                }
              
                var swiper = new Swiper('.swiper-container', {
                    autoplay: _delay_time
                  	,pagination: '.swiper-pagination'
                    ,paginationClickable: '.swiper-pagination'
                    ,nextButton: '.swiper-button-next'
                    ,prevButton: '.swiper-button-prev'
                    ,spaceBetween: 30
                    ,scrollbarDraggable: true
                    ,effect: 'fade'
                  	,setWrapperSize: true
                    ,onImagesReady: function(swiper){
                    	var slideH = $(swiper.container[0]).find('.swiper-slide > img').height(),
                      		slideW = $(swiper.container[0]).find('.swiper-slide > img').width();
                      	$(swiper.container[0]).find('.swiper-slide > img').css('visibility','hidden');
                      	$(swiper.container[0]).find('.swiper-slide').each(function(){
                          var _this = $(this);
                          _this.find('.video-slide').show();
                          _this.find('.video-slide video').css({
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%,-50%)'
                          });	
                          
                        });
                    }
                });
            });
        }
    }
	
	,stickMenu : function() {
        var $ = jQuery;
        var container = $('<div id="sticky_menu"></div>'),
            //tool_bar_clone = $('#header .top-block').clone(true);
            header_clone = $('.header-content').clone(true);

        container
            //.append(tool_bar_clone)
            .append(header_clone);
        container.css({
            position: 'absolute',
            left: 0,
            top: '250px',
            width: '100%',
            zIndex: 100,
            opacity: 0,
            boxShadow: '0 0 8px #000',
        });
        container.find('.top-bar').remove();
        container.find('.header-main').hide();
        container.find('.header-logo').css({
            'margin-bottom': 0,
            padding: '15px 0',
        });
        container.find('.logo').css({
            height: '60px',
        });
        $('body').append(container);

		var lastScroll = 0;
        jQuery(window).scroll(function() {
            var st = jQuery(this).scrollTop();
            var open_sub = false;
            container.find('.dropdown.hover').each(function () {
                if (jQuery(this).css('opacity') > 0) {
                    open_sub = true;
                }
            });
            if (st > lastScroll) { // downward-scrolling
                // only display sticky_menu when scrolling if there are no submenus open
                if (st > 250 && !open_sub) {
                    container.css({'z-index': 100});
                    container.animate({
                        opacity: 1,
                    }, 800);
                    container.css({top: st});
                }
            } else { // upward-scrolling
                if (!open_sub) container.css({top: st});
                if (st < 250) {
                    container.css({
                        'z-index': -100,
                        opacity: 0,
                        top: -10000,
                    });
                }
            }
            lastScroll = st;
        });
	}
	
	,toTopButton : function(){
		var to_top_btn = $("#scroll-to-top");
      
		if( 1 > to_top_btn.length ){
			return;
		}
		$(window).on( 'scroll' , function() {
			var b = jQuery(this).scrollTop();
			var c = jQuery(this).height();
			if (b > 100) { 
				var d = b + c / 2;
			}
			else { 
				var d = 1 ;
			}

			if (d < 1000 && d < c) { 
				jQuery("#scroll-to-top").removeClass('on off').addClass('off'); 
			} else {
				jQuery("#scroll-to-top").removeClass('on off').addClass('on'); 
			}
		});

		to_top_btn.on( 'click',function (e) {
			e.preventDefault();
			jQuery('body,html').animate({scrollTop:0},800,'swing');
		});
	}
  
  	,footerScrollTop : function(){
		var scroll_top = $(".a-scroll-up");
      
		if( 1 > scroll_top.length ){
			return;
		}

		scroll_top.on( 'click',function (e) {
			e.preventDefault();
			jQuery('body,html').animate({scrollTop:0},800,'swing');
		});
	}

	,mailchimpPopup : function(){
		var expire = jQuery("#mailchimp-popup").data('expires');
		if (jQuery.cookie('mycookie')) {
			//it hasn't been one days yet
		}
		else {
			jQuery.fancybox(
				jQuery('#mailchimp-popup'),
				{
					'autoDimensions': false
					,'width'		: 760
					,'height'		: 450
					,'autoSize' 	: false
					,'transitionIn'	: 'none'
					,'transitionOut': 'none'

				}
			);
		}
		jQuery.cookie('mycookie', 'true', { expires: expire });
	}
  
  	,effectNavigation : function(){ // Make hover effect of navigation
		jQuery(".horizontal-menu .navigation .navbar-collapse .main-nav>li").hover(function(e){
			jQuery(this).find('>.dropdown-menu, >.dropdown-menu li >.dropdown-menu').addClass("fadeInUp animated");
		},function(e){
			jQuery(this).find('>.dropdown-menu, >.dropdown-menu li >.dropdown-menu').removeClass("fadeInUp animated");
		});
      
      	jQuery(".top-account-holder").hover(function(e){
			jQuery(this).find('>.dropdown-menu').addClass("fadeInUp animated");
		},function(e){
			jQuery(this).find('>.dropdown-menu').removeClass("fadeInUp animated");
		});
      
      	jQuery(".currency-block").hover(function(e){
			jQuery(this).find('>.dropdown-menu').addClass("fadeInUp animated");
		},function(e){
			jQuery(this).find('>.dropdown-menu').removeClass("fadeInUp animated");
		});
      
	}

	,fixNoScroll : function() { // Fixed persistent position of page when scroll disappear
		var windowW = jQuery(window).width();
		jQuery('#page-body, .header-content, #page-body .mobile-version').css("width", windowW + 'px');
	}

	,fixReturnScroll : function() {
		jQuery('#page-body, .header-content,#page-body .mobile-version').attr('style', ''); 
	}

  	,fixButton : function(){
      	jQuery(".product-wrapper .product-head").each(function(e){
            if($(this).children().hasClass('wrapper-countdown')){
              	$(this).find('.product-button').addClass('fix');
            }
  		});
      
      	jQuery(".a-map").on("click", function(){
          jQuery(".handmade-google-map").slideToggle();
        });
    }
  
  	,handleReviews: function() {
        SPR.registerCallbacks(), SPR.initRatingHandler(), SPR.initDomEls(), SPR.loadProducts(), SPR.loadBadges();
    }
    
	,menuOnMobile : function(){
		jQuery('#page-body').on('click',function () {
			jQuery(".menu-mobile").removeClass("opened");
			jQuery("html,body").removeClass("menu-opened");
			AT_Main.fixReturnScroll();
		});

		jQuery(document).on('click','[data-toggle=offcanvas]',function(e){
			e.stopPropagation();
			AT_Main.fixNoScroll();
			jQuery(".menu-mobile").toggleClass("opened");
			jQuery("html,body").toggleClass("menu-opened")
		});

		jQuery(".navbar .main-nav li").hover(function(){jQuery(this).addClass("hover")},function(){jQuery(this).removeClass("hover")});

		jQuery(document).on('click','.mobile-version .menu-mobile .main-nav .expand',function(){
			var e=jQuery(this).parents(".dropdown").first();
            if (e.hasClass("menu-mobile-open")) {
                e.removeClass("menu-mobile-open");
                $(this).find('.visible-xs').removeClass('fa-minus');
                $(this).find('.visible-xs').addClass('fa-plus');
            } else {
                e.addClass("menu-mobile-open");
              	$(this).find('.visible-xs').removeClass('fa-plus');
                $(this).find('.visible-xs').addClass('fa-minus');
            }
		})
	}
	
	,handleMenuMultiLine : function() {
		var outItem = "";
		var down = false;

		var top = 0;

		jQuery(".navbar-collapse .main-nav > li").on("mousemove", function(e){
			var target = jQuery(e.currentTarget);

			if( down && outItem != "") {
				outItem.addClass("hold");
				setTimeout(function(){
					if(outItem != "")
					outItem.removeClass("hold");
					down = false;
					outItem = "";
				},500);

				if( (outItem[0] == target[0]) || (outItem.offset().top == target.offset().top) )
				{       
					outItem.removeClass("hold");
					down = false;
					outItem = "";
				}
			}
			else {
				outItem = "";
			}

		});

		jQuery(".navbar-collapse .main-nav >li").on("mouseout", function(e){

			var target = jQuery(e.currentTarget);

			if( e.pageY >= target.offset().top + 50 ) { //move down
				down = true;
			}

			if( target.hasClass("dropdown") ) { //target has child

				if(outItem == "")
					outItem = target;
			}

		});
	}
  
  	,parallaxIt : function() {
		if($(".templateIndex").length == 0) 
			return;
		$.fn.parallaxScroll = function(xpos, speedFactor, outerHeight) {
			var elem = $(this);
			var getHeight;
			var firstTop;
			var paddingTop = 0;

			//get the starting position of each element to have parallax applied to it      
			$(this).each(function(){
				firstTop = $(this).offset().top;
			});

			getHeight = function(jqo) {
				return jqo.outerHeight(true);
			};

			var j$element, top, height, pos;

			function update(){

				pos = $(window).scrollTop();             
				firstTop = elem.offset().top;
				height = getHeight(elem);
				
				if (pos + $(window).height() < firstTop || pos > firstTop + height) {
				  return;
				}
				//j$this.find('.parallax_bg').transition({ 'y':  Math.round((firstTop - pos) * speedFactor) + "px"},0);

				if(AT_Main.checkLayout()!=1)
				  elem.css('backgroundPosition', xpos + " " + Math.round((firstTop - pos) * speedFactor) + "px",0);   
				else         
				  elem.css('backgroundPosition', xpos + " " + -Math.round((firstTop - pos) * speedFactor) + "px",0);  
			}       

			window.addEventListener('scroll', function(){ 
				update(); 
			}, false)

			update();
		}; 

		$(".parallax-section").parallaxScroll("50%",0.1);
	}

	,fixTitle : function(){ // fix title a in filter
		jQuery(".rt a").attr("data-title", function() { return jQuery(this).attr("title"); });
		jQuery(".rt a").removeAttr("title");
	}

	,refreshZoom : function(){ // Update Zoom in detail page
		var enable_zoom = jQuery('.featured-image').data('zoom');
		if((jQuery('.elevatezoom').length)){

			var zoomImage = jQuery('.elevatezoom .zoom-image');

			zoomImage.elevateZoom({
				gallery				:'gallery-image' 
				,galleryActiveClass	: 'active'
				,zoomType			: 'inner'
				,cursor				: 'pointer'
			});

			//pass the images to Fancybox
			jQuery(".elevatezoom .zoom-image").bind("click", function(e) {  
				var ez =   jQuery('.elevatezoom .zoom-image').data('elevateZoom'); 
				jQuery.fancybox(ez.getGalleryList(),{
					closeBtn  : false,
					helpers : {
						buttons : {}
					}
				});
				return false;
			});
		}

	}
  	
  	,mobileDetect : function(){
		var md = new MobileDetect(window.navigator.userAgent);
		var enable_parallax = $('.parallax-section').data('parallax');

		if(enable_parallax){
			if(md.mobile() == null) {//not on phone and tablet
				AT_Main.parallaxIt();//make page parallax
				new WOW().init();   
			}

			if(md.mobile() != null){
				$("parallax-section").addClass("mobile");
				AT_Main.parallaxIt();
			}
		}

	}
  
	,init : function(){
      
      	if( typeof _coventry_config == 'undefined' ){
           	 console.log( " _coventry_config is undefined " );
           	 return ;
        }
      
        this.stickMenu();
		this.toTopButton();
      	this.footerScrollTop();
		this.mailchimpPopup();
      	this.effectNavigation();
        this.fixButton();
		this.menuOnMobile();
		this.handleMenuMultiLine();
		this.fixTitle();
		this.refreshZoom();
        this.mobileDetect();
	}
}

                            
$(window).load(function() {
    jQuery('.handmade-google-map').css("display", "none")
});

/* Handle when window resize */
jQuery(window).resize(function() {
	
	/* reset menu with condition */
	if(AT_Main.getWidthBrowser() < 1024){
		if(jQuery('#top').hasClass('on')){
			jQuery('#top').prev().remove();
			jQuery('#top').removeClass('on').removeClass('animated');
		}
	}

	/*Reset Page when fixNoScroll had called before*/
	AT_Main.fixReturnScroll();
	if(AT_Main.checkLayout() != 1 && jQuery('.menu-mobile').hasClass('opened'))
		jQuery("#page-body").trigger('click');
          
});
      
jQuery(document).ready(function($) {
	
	AT_Main.init();
      
});

/*--------------------------------------*/
/*  Sticky Menu
/*--------------------------------------*/

function handleSWAppear() {
    truethemes_undoStickyMenu();
    jQuery('#menu-main-nav').one('scrollWatch.disappear', handleSWDisappear);
}

function handleSWDisappear() {
    var subs = jQuery(this).find('.drop'),
        open_sub = false;

    subs.each(function () {
        // Open submenus have opacity of 1
        if (jQuery(this).css('opacity') > 0) {
            open_sub = true;
        }
    });

    // Do the sticky menu only if there is no open submenu. In small screens
    // users may scroll down to see the entire submenu. If so, then a submenu
    // will be open, but the menu may not be in the viewport anymore. We don't
    // want to do the sticky menu in those cases.
    if (!open_sub) {
        truethemes_doStickyMenu();
        jQuery('#menu-main-nav').one('scrollWatch.appear', handleSWAppear);
    } else {
        // register the handler again, in case the menu closes down. When the
        // user scroll downs again, the menu will show up.
        jQuery('#menu-main-nav').one('scrollWatch.disappear', handleSWDisappear);
    }
}

function truethemes_StickyMenu() {
    jQuery('#menu-main-nav').one('scrollWatch.disappear', handleSWDisappear).scrollWatch();
}

function truethemes_doStickyMenu() {
    var $ = jQuery;
    var container = $('<div id="B_sticky_menu"></div>'),
        tool_bar_clone = $('#header .top-block').clone(true);
        header_clone = $('#header .header-holder').clone(true);

    container.append(tool_bar_clone).append(header_clone);
    container.css({
        position: 'fixed',
        left: 0,
        top: -100,
        width: '100%',
        zIndex: 100,
        opacity: 0,
        boxShadow: '0 0 4px #000',
    });
    container.find('.header-area').css({
        maxWidth: 980,
        padding: '16px 0px',
        margin: 'auto'
    });
    container.find('.logo').css({
        'float': 'left',
    });
    container.find('.header-area').children().each(function() {
        !($(this).hasClass('logo') || $(this).is('nav')) && $(this).remove();
    });
    $('body').append(container);
    /*
    * modification to original codes to prevent error when .top-aside which is top toolbar is deactivated.
    * @since 4.0.5 dev 11 mod by denzel
    */
    if(jQuery('.top-block').length == 0){    
           container.animate({
               top: $('#wpadminbar').length === 0 ? 0 : $('#header').offset().top,
               opacity: 1
           }, 700);
        }else{
            container.animate({
                top: $('#wpadminbar').length === 0 ? 0 : $('#header .top-block').offset().top,
                opacity: 1
            }, 700);       
    }//endif
}

function truethemes_undoStickyMenu() {
    jQuery('#B_sticky_menu').animate({
        top: -300,
        opacity: 0
    }, {
        duration: 400,
        queue: false,
        complete: function() {
            jQuery(this).remove();
        }
    });
}

