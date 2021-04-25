(function ($) {
    "use strict";
    // Document ready function 

    /*-------------------------------------
    Section background image 
    -------------------------------------*/
    imageFunction();

    function imageFunction() {

        // Section static background image
        $('[data-bg-image]').each(function () {
            var img = $(this).data('bg-image');
            $(this).css({
                backgroundImage: 'url(' + img + ')',
            });
        });
    }

    $(window).on('scroll', function () {
        imageFunction();
    });

    /*-------------------------------------
    Header area apace 
    -------------------------------------*/
    headerNsliderResize();

    function headerNsliderResize() {
        var Hhw = $('.header-height-wrap'),
            wWidth = $(window).width(),
            Hhwslider = Hhw.parents('#wrapper').find("#header-area-space"),
            mHeight = Hhw.outerHeight();
        if (wWidth < 992) {
            mHeight = $('body > .mean-bar').outerHeight();
            // $("#downFromTop").css("margin-top", mHeight + 'px');
        }
        Hhwslider.css("margin-top", mHeight + 'px');
    }

    // Price range filter
    var priceSlider = document.getElementById('price-range-filter');
    if (priceSlider) {
        noUiSlider.create(priceSlider, {
            start: [10000, 35000],
            connect: true,
            range: {
                'min': 0,
                'max': 100000
            },
            format: wNumb({
                decimals: 0
            }),
        });
        var marginMin = document.getElementById('price-range-min'),
            marginMax = document.getElementById('price-range-max');
        priceSlider.noUiSlider.on('update', function (values, handle) {
            if (handle) {
                marginMax.innerHTML = "$" + values[handle];
            } else {
                marginMin.innerHTML = "$" + values[handle];
            }
        });
    }

    /*---------------------------------------
    Hoverdir Initialization
    --------------------------------------- */
    $('.multi-side-hover').each(function () {
        $(this).hoverdir({
            hoverDelay: 5,
        });
    });

    /*-------------------------------------
    MeanMenu activation code
    --------------------------------------*/
    $('nav#dropdown').meanmenu({
        siteLogo: "<div class='mobile-menu-nav-back'><a class='logo-mobile' href='index.html'><img src='img/logo-mobile.png' alt='logo' class='img-fluid'/></a></div>"
    });

    /*-------------------------------------
    Jquery Scollup
     -------------------------------------*/
    $.scrollUp({
        scrollText: '<i class="fa fa-angle-double-up"></i>',
        easingType: 'linear',
        scrollSpeed: 900,
        animation: 'fade'
    });

    /*-------------------------------------
    Circle Bars - Knob
    -------------------------------------*/
    if (typeof ($.fn.knob) != 'undefined') {
        $('.knob.knob-nopercent').each(function () {
            var $this = $(this),
                knobVal = $this.attr('data-rel');
            $this.knob({
                'draw': function () {}
            });
            $this.appear(function () {
                $({
                    value: 0
                }).animate({
                    value: knobVal
                }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function () {
                        $this.val(Math.ceil(this.value)).trigger('change');
                    }
                });
            }, {
                accX: 0,
                accY: -150
            });
        });
    }

    /*-------------------------------------
    Counter
    -------------------------------------*/
    var counterContainer = $('.counter');
    if (counterContainer.length) {
        counterContainer.counterUp({
            delay: 50,
            time: 5000
        });
    }

    /*-------------------------------------
     Accordion
     -------------------------------------*/
    var accordion = $('#accordion');
    accordion.children('.panel').children('.panel-collapse').each(function () {
        if ($(this).hasClass('in')) {
            $(this).parent('.panel').children('.panel-heading').addClass('active');
        }
    });
    accordion.on('show.bs.collapse', function (e) {
        $(e.target).prev('.panel-heading').addClass('active');
    }).on('hide.bs.collapse', function (e) {
        $(e.target).prev('.panel-heading').removeClass('active');
    });

    /*-------------------------------------
    Contact Form initiating
    -------------------------------------*/
    var contactForm = $('#contact-form');
    if (contactForm.length) {
        contactForm.validator().on('submit', function (e) {
            var $this = $(this),
                $target = contactForm.find('.form-response');
            if (e.isDefaultPrevented()) {
                $target.html("<div class='alert alert-success'><p>Please select all required field.</p></div>");
            } else {
                $.ajax({
                    url: "vendor/php/form-process.php",
                    type: "POST",
                    data: contactForm.serialize(),
                    beforeSend: function () {
                        $target.html("<div class='alert alert-info'><p>Loading ...</p></div>");
                    },
                    success: function (text) {
                        if (text == "success") {
                            $this[0].reset();
                            $target.html("<div class='alert alert-success'><p>Message has been sent successfully.</p></div>");
                        } else {
                            $target.html("<div class='alert alert-success'><p>" + text + "</p></div>");
                        }
                    }
                });
                return false;
            }
        });
    }


    /*-------------------------------------
    Select2 activation code
    -------------------------------------*/
    if ($('#installment-month, #request-call, #select-topic').length) {
        $('#installment-month, #request-call, #select-topic').select2({
            theme: 'classic',
            dropdownAutoWidth: true,
            width: '100%'
        });
    }

    /* ---------------------------------------
    Parallax
    --------------------------------------- */
    if ($('.parallaxie').length) {
        $(".parallaxie").parallaxie({
            speed: 0.5,
            offset: 0,
        });
    }

    /*-------------------------------------
     Google Map
    -------------------------------------*/
    if ($('#googleMap').length) {
        var initialize = function() {
            var mapOptions = {
                zoom: 15,
                scrollwheel: false,
                center: new google.maps.LatLng(-37.81618, 144.95692),
                styles: [{
                    stylers: [{
                        saturation: -100
                    }]
                }]
            };
            var map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);
            var marker = new google.maps.Marker({
                position: map.getCenter(),
                animation: google.maps.Animation.BOUNCE,
                icon: 'img/map-marker.png',
                map: map
            });
        }
        // Add the map initialize function to the window load function
    google.maps.event.addDomListener(window, "load", initialize);
    }

    /*-------------------------------------
    Carousel slider initiation
    -------------------------------------*/
    $('.rc-carousel').each(function () {
        var carousel = $(this),
            loop = carousel.data('loop'),
            items = carousel.data('items'),
            margin = carousel.data('margin'),
            stagePadding = carousel.data('stage-padding'),
            autoplay = carousel.data('autoplay'),
            autoplayTimeout = carousel.data('autoplay-timeout'),
            smartSpeed = carousel.data('smart-speed'),
            dots = carousel.data('dots'),
            nav = carousel.data('nav'),
            navSpeed = carousel.data('nav-speed'),
            rXsmall = carousel.data('r-x-small'),
            rXsmallNav = carousel.data('r-x-small-nav'),
            rXsmallDots = carousel.data('r-x-small-dots'),
            rXmedium = carousel.data('r-x-medium'),
            rXmediumNav = carousel.data('r-x-medium-nav'),
            rXmediumDots = carousel.data('r-x-medium-dots'),
            rSmall = carousel.data('r-small'),
            rSmallNav = carousel.data('r-small-nav'),
            rSmallDots = carousel.data('r-small-dots'),
            rMedium = carousel.data('r-medium'),
            rMediumNav = carousel.data('r-medium-nav'),
            rMediumDots = carousel.data('r-medium-dots'),
            center = carousel.data('center');
        carousel.owlCarousel({
            loop: (loop ? true : false),
            items: (items ? items : 4),
            lazyLoad: true,
            margin: (margin ? margin : 0),
            autoplay: (autoplay ? true : false),
            autoplayTimeout: (autoplayTimeout ? autoplayTimeout : 1000),
            smartSpeed: (smartSpeed ? smartSpeed : 250),
            dots: (dots ? true : false),
            nav: (nav ? true : false),
            navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
            navSpeed: (navSpeed ? true : false),
            center: (center ? true : false),
            responsiveClass: true,
            responsive: {
                0: {
                    items: (rXsmall ? rXsmall : 1),
                    nav: (rXsmallNav ? true : false),
                    dots: (rXsmallDots ? true : false)
                },
                480: {
                    items: (rXmedium ? rXmedium : 2),
                    nav: (rXmediumNav ? true : false),
                    dots: (rXmediumDots ? true : false)
                },
                768: {
                    items: (rSmall ? rSmall : 3),
                    nav: (rSmallNav ? true : false),
                    dots: (rSmallDots ? true : false)
                },
                992: {
                    items: (rMedium ? rMedium : 5),
                    nav: (rMediumNav ? true : false),
                    dots: (rMediumDots ? true : false)
                }
            }
        });
    });

    /*-------------------------------------
    Window load function
    -------------------------------------*/
    $(window).on('load', function () {

        // Onepage Nav on meanmenu
        var onePageNav = $('#navOnePage');
        if (onePageNav.length) {
            $('#navOnePage').onePageNav({
                scrollOffset: 80,
                end: function () {
                    $('.meanclose').trigger('click');
                }
            });
        }

        // Countdown activation code
        var eventCounter = $('#countdown');
        if (eventCounter.length) {
            eventCounter.countdown('2018/05/03', function (e) {
                $(this).html(e.strftime("<div class='countdown-section'><h2>%D</h2> <h3>day%!D</h3> </div><div class='countdown-section'><h2>%H</h2> <h3>Hour%!H</h3> </div><div class='countdown-section'><h2>%M</h2> <h3>Minutes</h3> </div><div class='countdown-section'><h2>%S</h2> <h3>Second</h3> </div>"))

            });
        }

        // Popup
        var yPopup = $(".popup-youtube");
        if (yPopup.length) {
            yPopup.magnificPopup({
                disableOn: 700,
                type: 'iframe',
                mainClass: 'mfp-fade',
                removalDelay: 160,
                preloader: false,
                fixedContentPos: false
            });
        }

        // Single Popup
        if ($('.popup-zoom-single').length) {
            $('.popup-zoom-single').magnificPopup({
                type: 'image'
            });
        }

        // Gallery Popup
        if ($('.zoom-gallery').length) {
            $('.zoom-gallery').each(function () {
                $(this).magnificPopup({
                    delegate: 'a.popup-zoom',
                    type: 'image',
                    gallery: {
                        enabled: true
                    }
                });
            });
        }

        // Masonry
        var galleryIsoContainer = $('#no-equal-gallery');
        if (galleryIsoContainer.length) {
            var blogGallerIso = galleryIsoContainer.imagesLoaded(function () {
                blogGallerIso.isotope({
                    itemSelector: '.no-equal-item',
                    masonry: {
                        columnWidth: '.no-equal-item'
                    }
                });
            });
        }

        // Page Preloader
        $('#preloader').fadeOut('slow', function () {
            $(this).remove();
        });

        // Isotope initialization
        var $container = $('.isotope-wrap');
        if ($container.length > 0) {
            var $isotope = $container.find('.featuredContainer').isotope({
                filter: '*',
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });
            $container.find('.isotope-classes-tab').on('click', 'a', function () {
                var $this = $(this);
                $this.parent('.isotope-classes-tab').find('a').removeClass('current');
                $this.addClass('current');
                var selector = $this.attr('data-filter');
                $isotope.isotope({
                    filter: selector,
                    animationOptions: {
                        duration: 750,
                        easing: 'linear',
                        queue: false
                    }
                });
                return false;
            });
        }

        // Bar Chart 
        if (typeof Chart !== 'undefined') {

            var $cart = ['bar-chart-1', 'bar-chart-2'];
            $cart.map(function (chart_id) {
                var item = $("#" + chart_id);
                if (item.length) {

                    new Chart(document.getElementById(chart_id), {
                        type: 'bar',
                        data: {
                            labels: item.data('labels').split(','),
                            datasets: [{
                                label: "Total value",
                                backgroundColor: item.data('colors').split(','),
                                data: item.data('data').split(',')
                            }]
                        },
                        options: {
                            legend: {
                                display: false
                            },
                            title: {
                                display: true
                            }
                        }
                    });
                }
            });
        }
    });

    /*-------------------------------------
    Jquery Serch Box
    -------------------------------------*/
    $(document).on('click', '#top-search-form .search-button', function (e) {
        e.preventDefault();
        var targrt = $(this).prev('input.search-input');
        targrt.animate({
            width: ["toggle", "swing"],
            height: ["toggle", "swing"],
            opacity: "toggle"
        }, 500, "linear");
        return false;
    });

    /*-------------------------------------
     Window onLoad and onResize event trigger
     -------------------------------------*/
    $(window).on('load resize', function () {
        var wHeight = $(window).height(),
            mLogoH = $('a.logo-mobile-menu').outerHeight();
        wHeight = wHeight - 50;
        $('.mean-nav > ul').css('height', wHeight + 'px');
        headerNsliderResize();

        //Auto equal height
        equalHeight();
    });

    /*-------------------------------------
     Jquery Stiky Menu at window Load
     -------------------------------------*/
    $(window).on('scroll', function () {
        var s = $('#sticker'),
            w = $('body'),
            h = s.outerHeight(),
            windowpos = $(window).scrollTop(),
            windowWidth = $(window).width(),
            h2 = s.parent('#header-two'),
            h1 = s.parent('#header-one'),
            h1H = h1.find('.header-top-bar').outerHeight(),
            topBar = s.prev('.header-top-bar'),
            tempMenu;
        if (windowWidth > 991) {
            w.css('padding-top', '');
            var topBarH, mBottom = 0;
            if (h2.length) {
                topBarH = h = 1;
                mBottom = 0;
            } else if (h1.length) {
                topBarH = topBar.outerHeight();
                if (windowpos <= topBarH) {
                    if (h1.hasClass('header-fixed')) {
                        h1.css('top', '-' + windowpos + 'px');
                    }
                }
            }
            if (windowpos >= topBarH) {
                if (h1.length || h2.length) {
                    s.addClass('stick');
                }
                if (h1.length) {
                    if (h1.hasClass('header-fixed')) {
                        h1.css('top', '-' + topBarH + 'px');
                    } else {
                        w.css('padding-top', h + 'px');
                    }
                }
            } else {
                s.removeClass('stick');
                if (h1.length) {
                    w.css('padding-top', 0);
                }
            }
        }
    });

    /*-------------------------------------
    Auto equal height for product listing
    -------------------------------------*/
    function equalHeight() {
        var imgH = 0,
            boxH = 0,
            wWidth = $(window).width(),
            allH;
        $('.equal-height-wrap .item-img,.equal-height-wrap .item-content').height('auto');
        if (wWidth > 991) {
            $('.equal-height-wrap').each(function () {
                var self = $(this);
                var TempImgH = self.find('.item-img').height();
                imgH = TempImgH > imgH ? TempImgH : imgH;
                var TempBoxH = self.find('.item-content').outerHeight();
                boxH = TempBoxH > boxH ? TempBoxH : boxH;
            });
            allH = imgH;
            allH = boxH > imgH ? boxH : imgH;
            $('.equal-height-wrap .item-img,.equal-height-wrap .item-content').height(allH + "px");
        }
    }

})(jQuery);