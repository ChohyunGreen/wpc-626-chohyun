$(document).ready(function(){
    //상단
        function hdOn(){
            if($(window).scrollTop() > 50){
                $('#header').addClass('on');
            } else {
                $('#header').removeClass('on');
            }
        }
        hdOn();
        $(window).on('scroll', hdOn);

    //전체카테고리
        $(document).on("click", "#header .allCate", function(){
            $("#aside").addClass("on");
            return false;
        });
        $("#aside .close_btn").on("click", function(){
            $("#aside").removeClass("on");
            return false;
        });

    //언어선택
        $('#header .rang_desc dt').on('click', function(){
            $(this).toggleClass('on');
        });

        $(document).mouseup(function (e){
            $('#header .rang_desc dt').each(function(){
                if($(this).has(e.target).length === 0){
                    $(this).not().removeClass('on');
                }
            })
        });

    //스크롤 탑
        $('.scr_top').on('click', function(){
            if($(".fp-section").length > 0){
                fullpage_api.moveTo('MAIN', 1);
            } else {
                $('html, body').stop().animate( { scrollTop : '0' }, 600 );
            }
            return false;
        });
		
	//서브 탭
	$(".sub_content .sub_tab li").click(function(){
		 var i = $(this).index();

		  if (!$(this).parents(".sub_tab").hasClass("haslink")) {
			$(this).siblings().removeClass("on");
			$(this).addClass("on");

			// 기존 탭 내용 초기화
			$(".sub_content .tab_cont .cont_box").removeClass("on"); // 초기화

			// 선택된 탭 내용 표시 및 애니메이션 효과 적용
			$(".sub_content .tab_cont .cont_box").eq(i).addClass("on").fadeIn(function () {
				// 탭 전환 후 AOS 초기화
				AOS.refresh();
			  });
		  }
	});	
});