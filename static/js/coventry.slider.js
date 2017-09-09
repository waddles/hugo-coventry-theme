var AT_Slider ={
  
    owlSlider : function(){
      
      	jQuery(".post-list-slider").length && jQuery('.post-list-slider').owlCarousel({
          	loop 		: true
          	,nav		: true
          	,dots 		: false
      		,items		: 3
          	,margin		: 30
			,responsive : {
              	0:{
                	items: 1
                }
              	,480:{
                	items: 2
                }
            	,992:{
              		items: 3
            	}
          	}
          	,navText	: ['<span class="button-prev"></span>', '<span class="button-next"></span>']
        });
      
      
      	jQuery("#widget-partner").length && jQuery('#widget-partner').owlCarousel({
          	autoplay	: true
          	,dots 		: false
      		,items		: 5
          	,margin		: 30
			,responsive : {
              	0:{
                	items: 1
                }
            	,480:{
              		items: 2
            	}
            	,991:{
              		items: 3
            	}
              	,1024:{
              		items: 4
            	}
              	,1200:{
              		items: 5
            	}
          	}
        });
      
      	jQuery(".related-items").length && jQuery('.related-items').owlCarousel({
          	nav			: true
          	,dots 		: false
      		,items		: 4
          	,margin		: 30
			,responsive : {
                0:{
                  items: 1
                }
                ,480:{
                  items: 2
                }
                ,768:{
                  items: 3
                }
                ,1024:{
                  items: 4
                }
          	}
          	,navText	: ['<span class="button-prev"></span>', '<span class="button-next"></span>']
        });
      
      	jQuery(".product-image-gallery").length && jQuery('.product-image-gallery').owlCarousel({
          	loop			: true
            ,margin			: 0
            ,responsiveClass: true
            ,nav			: true
            ,dots			: false
            ,center			: true
            ,items			: 1
            ,mouseDrag		: false
          	,navText		: ['<span class="button-prev"></span>', '<span class="button-next"></span>']
        });

        jQuery("#gallery-image").length && jQuery('#gallery-image').owlCarousel({
            nav			: false
          	,dots 		: false
          	,margin		: 10
          	,mouseDrag	: true
			,responsive : {
                0:{
                	items: 3
                }
              	,480:{
                	items: 4
                }
                ,768:{
                      items: 3
                }
            	,1199:{
              		items: 4
            	}
          	}
			
        });
      	
      	jQuery(".au-slider").length && jQuery('.au-slider').owlCarousel({
          	autoplay	: true
          	,nav		: true
          	,dots 		: false
      		,items		: 3
          	,margin		: 30
			,responsive : {
              	0:{
                	items: 1
                }
            	,480:{
              		items: 2
            	}
              	,980:{
              		items: 3
            	}
          	}
          	,navText	: ['<span class="button-prev"></span>', '<span class="button-next"></span>']
        });

	}
  
  	,init : function(){
      this.owlSlider();
    }
  
}

/* Check IE */
var bcMsieVersion = {

  MsieVersion: function() {

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer, return version number
      return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)));
    else                 // If another browser, return 0
      {
      return 0;
    }
  }

  ,init : function(){
    this.MsieVersion();
  }
}

jQuery.fn.extend({
  scrollToMe: function() {
    if (jQuery(this).length) {
      var top = jQuery(this).offset().top - 250;
      jQuery('html,body').animate({
        scrollTop: top
      }, 500);
    }
  },
});;

jQuery(document).ready(function($) {
	
	AT_Slider.init();
  
    $('.rating-links a').click(function() {
      $('.product-simple-tab ul li').removeClass('active');
      $('#tab_review_tabbed').addClass('active');
      $('.product-simple-tab .tab-content .tab-pane').removeClass('active');
      $('#tab_review').show();
      $('#tab_review_tabbed').scrollToMe();
      return false;
    });
      
});