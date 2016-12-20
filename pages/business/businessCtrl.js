/**
 * Created by 火星时代 on 2016/12/16.
 */

app.controller("businessCtrl", function ($scope, $window) {
    var n = 0;
    var business_introduce_box = $('.business_introduce_box');
    var box_box = business_introduce_box.find('.box_box');
    var business_rooms_box = box_box.find('.business_rooms_box');
    function reBuild() {
        business_rooms_box.css({ "top": "0", "left": "0%"});
        business_rooms_box.eq(0).css({"transform": '', "z-index": 1});
        business_rooms_box.eq(1).css({"transform": "scale(0.9)", "top": "8%"});
        for (var i = 2; i < business_rooms_box.length; i++) {
            business_rooms_box.eq(i).css({"transform": "scale(0.8)", "top": "16%"});
        }
    };
    reBuild();
    function slider(top,left) {
        if (n >= business_rooms_box.length) {
            reBuild();
            n = 0;
        }
        business_rooms_box.eq(n - 1).css({"transform": '', "top": top, "left": left, "z-index": 0});
        business_rooms_box.eq(n).css({"transform": '', "top": "0%", "left": "0%", "z-index": 1});
        business_rooms_box.eq(n + 1).css({"transform": "scale(0.9)", "left": "0%", "top": "8%"});
    }
    //up  slider
    box_box.swipeUp(function () {
        n++;
        slider("-200%","0%");
    });
//right slider
    box_box.swipeRight(function () {
        n++;
        slider("0%","300%");
    });
    //left slider
    box_box.swipeLeft(function () {
        n++;
        slider("0%","-300%");
    });
});