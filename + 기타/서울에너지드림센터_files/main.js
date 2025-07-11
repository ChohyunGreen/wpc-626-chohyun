$(document).ready(function() {
    //풀페이지
        function fullSet(){
            var myFullpage = new fullpage('#fullpage', {
                anchors:['MAIN', 'secondPage', '3rdPage', '4thPage'],
                navigation: true,
                navigationPosition: 'left',
                navigationTooltips: ['메인', '소개 및 소식', '행사/프로그램', 'FOOTER'],
                scrollOverflow:false,
                loopBottom: false,
                onLeave : function(origin, destination, direction){
                    if ( destination.index != 0) {
                        $('#header').addClass("on");
                    } else {
                        $('#header').removeClass("on");
                    }
                },
            });
        }
        function fullAct (){
            if($(window).width() < 1024){
                if($(".fp-section").length > 0){
                    fullpage_api.destroy("all");
                }
            }else{
                fullSet();
            }
        }
        fullAct();

        $('.main_visual .scr_dwn').on('click', function(){
            if($(window).width() < 1024){
                $('html, body').stop().animate( { scrollTop : ($('.dwn_sec').offset().top - $('#header').outerHeight())}, 600 );
            } else {
                fullpage_api.moveSectionDown();
            }
        });
        

    //와이드 배너
        var wideSwiper = new Swiper('.wideSwiper', {
            loop : true,
            loopAdditionalSlides : 1, 
            speed : 700,
            autoplay : {
                delay : 5000, 
                disableOnInteraction : false,
            },
            pagination: {
                el: '.wideSwiper .swiper-pagination',
                clickable: true,
            },
            navigation: {
                prevEl: '.wideSwiper .swiper-button-prev',
                nextEl: '.wideSwiper .swiper-button-next',
            },
        });

        $('.wideSwiper .swiper_btn').on('click', function(){
            $(this).toggleClass('on');
            if($(this).hasClass('on')){
                wideSwiper.autoplay.stop(); 
            } else {
                wideSwiper.autoplay.start(); 
            }
            return false;
        });

    //프로그램 리뷰
        var programSwiper = new Swiper('.programSwiper', {
            slidesPerView : 2, 
            spaceBetween : 30, 
            loop : true,
            loopAdditionalSlides : 1, 
            speed : 700,
            autoplay : {
                delay : 5000, 
                disableOnInteraction : false,
            },
            pagination: {
                el: ".program_cont .swiper-pagination",
                type: "progressbar",
            },
            navigation: {
                prevEl: '.program_cont .swiper-button-prev',
                nextEl: '.program_cont .swiper-button-next',
            },
            breakpointsInverse: true,
            breakpoints: {
                1024: {
                    slidesPerView : 2, 
                    spaceBetween : 30, 
                },
                480: {
                    slidesPerView : 2, 
                    spaceBetween : 15, 
                },
                0: {
                    slidesPerView : 1.25, 
                    spaceBetween : 15, 
                },
            },
        });


    //리사이즈
        $(window).on('resize', function(){
            setTimeout(function(){
                fullAct();
                wideSwiper.update();
                programSwiper.update();
            }, 100);
        });
});