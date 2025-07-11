$(document).ready(function(){
    //유관기관
        $('#footer .family_site dt').on('click', function(){
            $(this).toggleClass('on');
        });
        $(document).mouseup(function (e){
            $('#footer .family_site dt').each(function(){
                if($(this).has(e.target).length === 0){
                    $(this).not().removeClass('on');
                }
            })
        });
	//애니메이션
	AOS.init({
        offset: 0,
        debounceDelay: 50,
        throttleDelay: 99,
        easing: 'ease-in-quart',
	});
	onElementHeightChange(document.body, function(){
        AOS.refresh();
	});
	function onElementHeightChange(elm, callback) {
        var lastHeight = elm.clientHeight
        var newHeight;

        (function run() {
            newHeight = elm.clientHeight;      
            if (lastHeight !== newHeight) callback();
            lastHeight = newHeight;
            if (elm.onElementHeightChangeTimer) {
                clearTimeout(elm.onElementHeightChangeTimer); 
            }
            elm.onElementHeightChangeTimer = setTimeout(run, 200);
        })();
	}
});
$(window).on('load', function () {
	//애니메이션
	AOS.refresh(true);
});