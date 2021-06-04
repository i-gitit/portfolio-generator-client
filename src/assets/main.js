$(function() {

  'use strict';

  $('.js-menu-toggle').click(function(e) {

  	var $this = $(this);

  	

  	if ( $('.dashboard').hasClass('show-sidebar') ) {
  		$('.dashboard').removeClass('show-sidebar');
  		$this.removeClass('active');
  	} else {
  		$('.dashboard').addClass('show-sidebar');	
  		$this.addClass('active');
  	}

  	e.preventDefault();

  });

  // click outisde offcanvas
	$(document).mouseup(function(e) {
    var container = $(".sidebar");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      if ( $('.dashboard').hasClass('show-sidebar') ) {
				$('.dashboard').removeClass('show-sidebar');
				$('.dashboard').find('.js-menu-toggle').removeClass('active');
			}
    }
	}); 

    

});