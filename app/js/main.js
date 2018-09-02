//= ../../bower_components/jquery/dist/jquery.min.js
//= ../../bower_components/svg4everybody/dist/svg4everybody.min.js

//= partials/jquery.inview.min.js
//= partials/modernizr.js

//allow svg icons in IE
svg4everybody({
    polyfill: true
});

$(function(){

    //Moderniz fix for img object-fill: cover
    var modernizImgContainer = $('.bio-photo, .portfolio-grid__item');

    if (! Modernizr.objectfit){
        $(modernizImgContainer).each(function (){
            var $container = $(this),
                imgUrl = $container.find('img').prop('src');
            if (imgUrl){
                $container
                    .css('backgroundImage', 'url(' + imgUrl + ')')
                    .addClass('compat-object-fit');
            }
        });
    }

    var section = $('section').css('display', 'block'), //First loaded with display:none and translated, then added display:block to keep transitions on animation
        homeShadow = $('.home-shadow').css('display', 'block'),
        homeNavLink = $('.home-nav__item-link'),
        closeBtn = $('.close-btn');

    //Slide animation for site sections
    $(homeNavLink).on('click', function(e){
        e.preventDefault();

        var homeNavLinkHref = $(this).attr('href');
        $('#' + homeNavLinkHref ).add(homeShadow).addClass('active');

        if(homeNavLinkHref == 'portfolio'){
            $(homeShadow).removeClass('active');
        }

        var sectionActive = $('section.active');
        $(closeBtn).on('click', function(){
            $(sectionActive).add(homeShadow).removeClass('active');
        });

        $(document).keydown(function(e){
            if(e.keyCode == 27 || e.keyCode == 8){
                $(sectionActive).add(homeShadow).removeClass('active');
            }
        });
    });

    //Starting animation when element is in view
    var skills = $('.skills.technical').on('inview', function(event, isInView){
        if (isInView) {
            $('.skills__line').addClass('animated');
        }
    });

    var tools = $('.tools').on('inview', function(event, isInView){
        if (isInView){
            $('.tools__list-item').each(function(i){
                    $(this).delay(i * 400).fadeIn(1200);
                }
            );
        }
    });

    var work = $('.work__position-items').on('inview', function(event, isInView){
        if (isInView){
            $(this).addClass('animated');
            $('.work__position-duty:first-of-type').each(function(i){
                    $(this).delay(i * 750).fadeIn(500);
                }
            );
        }
    });

    var hobbies = $('.hobbies').on('inview', function(event, isInView){
        if (isInView){
            $('.hobbies__item').each(function(i){
                    $(this).delay(i * 500).fadeIn(500);
                }
            );
        }
    });
});