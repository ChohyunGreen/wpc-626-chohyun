$(document).ready(function(){
	//서브 상단
	if ( $(window).width() >= 640 ){
		$('.sub_nav .sub_menu dl dt').removeClass('on');
		$('.sub_nav .sub_menu dl dt').next().removeClass('open');
	} else {

	}
	$(window).resize( function(){
		if ( $(window).width() >= 640 ){
			$('.sub_nav .sub_menu dl dt').removeClass('on');
			$('.sub_nav .sub_menu dl dt').next().removeClass('open');
		} else {
		}
	});
	// 네비 토글
		$('.sub_nav .sub_menu dl dt').each(function(){
			$(this).click(function(){
				if($(this).hasClass('on')) {
					$(this).removeClass('on');
					$(this).next().removeClass('open');	
				} else {
					$(this).addClass('on');
					$(this).next().addClass('open');	
				}
			});
		});
		$(document).click(function(e){
			if (!$(e.target).is('.sub_nav .sub_menu dl dt')){
				$('.sub_nav .sub_menu dl dt').removeClass('on');
				$('.sub_nav .sub_menu dl dt').next().removeClass('open');
			}
		});
		
	//조직도
	$('.sub_work .tab_btn').click(function(){
		var tabData = $(this).attr('work-tab');
		$('.sub_work .tab_btn').removeClass('on');
		$(this).addClass('on');
		
		$('.work_table .work_content').removeClass('on');
		$('#' + tabData).addClass('on');
		
	});
	
	//적용기술
	$('.btn_apply_tech').click(function(){
		$('.tech_pop').addClass('on');
		return false;
	});
	$('.tech_pop .btn_close').click(function(){
		$('.tech_pop').removeClass('on');
		return false;
	});
		
	//층별 안내
	$('.sub_floor_info').each(function (index, element) {
		const swiperContainer = $(element).find('.swiper-container')[0];
		const nextButton = $(element).find('.next')[0];
		const prevButton = $(element).find('.prev')[0];
		const pagination = $(element).find('.swiper-pagination')[0];	
		
		new Swiper(swiperContainer, {
			slidesPerView : 2, 
            spaceBetween : 40, 
			navigation: {
				nextEl: nextButton,
				prevEl: prevButton,
			},
			pagination: {
				el: pagination,
				type: 'progressbar', // Progress bar pagination
			},
			breakpointsInverse: true,
            breakpoints: {
                1024: {
                    slidesPerView : 2, 
                    spaceBetween : 40, 
                },
                640: {
                    slidesPerView : 2, 
                    spaceBetween : 20, 
                },
                0: {
                    slidesPerView : 1.25, 
                    spaceBetween : 15, 
                },
            },
		});
	});
	
	
});