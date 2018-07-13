(function($) {

$(function() {

	    var $window = $(window),
        $windowWidth = $window.width(),
        $body = $('body'),
        $ui = $('#ui'),
        $content = $('#content'),
        $uiNav = $('[ui-nav]'),
        $uiDataNav = $('[data-toggle="ui-nav"]'),
        $uiDataMobileNav = $('[data-toggle="ui-nav--mobile-only"]'),
        $aside = $('#aside'),
        $asideRight = $('.ui-aside-right'),
        $uiDataAsideRight = $('[data-toggle="ui-aside-right"]');
		
	$uiDataNav.on('click', function(e){
        e.preventDefault();
        $ui.toggleClass('ui-aside-compact');
    });
	
	    $uiDataAsideRight.on('click', function(e){
        e.preventDefault();
        $content.toggleClass('ui-content-compact');
    });

    // aside right overlay hide when click outside
    $body.on('click.asideRight', function(event){
        if ($asideRight.has(event.target).length == 0 && !$asideRight.is(event.target) && $uiDataAsideRight.has(event.target).length == 0 && !$uiDataAsideRight.is(event.target)){
            $content.removeClass('ui-content-compact');
        }
    });


    $window.on('resize.windowscreen', function() {
        var width = $(this).width();

        if (width < 768) {
            $body.on('click.aside', function(event) {
                if ($aside.has(event.target).length == 0 && !$aside.is(event.target) && $uiDataNav.has(event.target).length == 0 && !$uiDataNav.is(event.target)){
                    $ui.removeClass('ui-aside-compact');
                }
            });

            $uiDataMobileNav.on('click', function(e){
                e.preventDefault();
                $ui.removeClass('ui-aside-compact');
            });
        } else {
            $body.off('click.aside');
            $uiDataMobileNav.off('click');
        }
    });
    $window.trigger('resize.windowscreen');


    $uiNav.on('click', 'a', function(e) {

        // locate href
        // if there is no submenu
        var href = $(this).attr('href');
        if(href){
            window.location.href = href;
        }

        // Open submenu
        var $this = $(e.target), $active;
        $this.is('a') || ($this = $this.closest('a'));

        $active = $this.parent().siblings( ".active" );
        $active && $active.toggleClass('active').find('> ul:visible').stop().slideUp(200);

        ($this.parent().hasClass('active') && $this.next().stop().slideUp(200)) || $this.next().stop().slideDown(200);
        $this.parent().toggleClass('active');

        $this.next().is('ul') && e.preventDefault();
    });

    if($ui.hasClass('ui-aside-compact')) {
        var uiHasCompact = true;
    }

    if($content.hasClass('ui-content-compact')) {
        var uiContentHasCompact = true;
    }

    function doneResizing() {
        if (Modernizr.mq('screen and (min-width:768px)')) {
            // action for screen widths including and above 768 pixels

            if(uiHasCompact === true) {
                $ui.addClass('ui-aside-compact')
            }
            if(uiContentHasCompact === true) {
                $content.addClass('ui-content-compact')
            }

        } else if (Modernizr.mq('screen and (max-width:767px)')) {
            // action for screen widths below 768 pixels
            // console.log('Moblie');

            if(uiHasCompact === true) {
                $ui.removeClass('ui-aside-compact')
            }
            if(uiContentHasCompact === true) {
                $content.removeClass('ui-content-compact')
            }

            $uiDataNav.on('click', function(e){
                e.preventDefault();

                var hasAsideCompact = $ui.hasClass('ui-aside-compact'),
                    hasContentCompact = $content.hasClass('ui-content-compact');

                if(hasAsideCompact && hasContentCompact) {
                    $content.removeClass('ui-content-compact');
                }

            });

           
        }
    }
});

})(jQuery);