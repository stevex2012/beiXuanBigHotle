/**
 * Created by 火星时代 on 2016/12/13.
 */
/*创建主要模块*/
var app=angular.module("app",["ngRoute"]);
/*创建主要控制器*/
app.controller("mainCtrl",function ($scope,$window) {
    $scope.showRight=false;
    //点击显示右侧菜单
    $scope.showRightMenu=function () {
        $scope.showRight=true;
    };
    //点击隐藏右侧菜单
    $scope.hideRightMenu=function () {
           $scope.showRight=false;
    };
    //轮播函数
    $scope.lunbo=function () {

            var lunbo_box=$('.lunbo_box');
            var dot=lunbo_box.find('.dot_box i');
            var img_box=lunbo_box.find('.img_box');
            var aLi=img_box.find('li');
            aLi.each(function (index,element) {
                $(element).css({"left":index*100+'%'});
            });
            var m=0;//记录滑动次数
            img_box.swipeLeft(function () {
                if(m>=aLi.length-1){
                    return;
                }
                m++;
                $(this).css({"left":-100*m+"%"});
                dot.removeClass('ac');
                dot.eq(m).addClass('ac');
            });
            img_box.swipeRight(function () {
                if(m<=0){
                    return;
                }
                m--;
                $(this).css({"left":-100*m+"%"});
                dot.removeClass('ac');
                dot.eq(m).addClass('ac');
            })

    }
    //会议室划过
    $scope.meeting_slider=function () {
        var room_list = $('.room_list');
        var room_wrap = room_list.find('.room_wrap');
        var room = room_wrap.find('.room');
        //给每一个类名是 room 的div 定位
        var W = parseInt(room_list.css("width"));
        var w = parseInt(room.css("width"));
        var l = parseInt(room.css("left"));
        var n = 0;
        console.log(l, w, W);
        room.each(function (index, element) {
            $(element).css({"left": (30 + w) * index / w * 100 + '%'});
            room.eq(0).css({"z-index":"2"});
        });
        room_wrap.swipeLeft(function () {
            n++;
            if(n>=room.length){
                n=room.length-1;
                return;
            }

            console.log(n);
            for (var i = n; i >= 0; i--) {
                room.eq(i).css({"left": -(30 + w) * (n-i) / w * 100 + '%'});
            }
            for (var j = 0; j < room.length-n; j++) {
                room.eq(j+n+1).css({"left": (30 + w) * (j+1) / w * 100 + '%'});
            }
            for(var k=0;k<room.length;k++){
                if(room.eq(k).css("left")=="0%"){
                    room.eq(k).css({"z-index":"2"});
                }else{
                    room.eq(k).css({"z-index":"0"});
                }
            }

        });
        room_wrap.swipeRight(function () {
            n--;
            if(n<0){
                n=0;
                return;
            }
            console.log(n);
            for (var i = n; i >= 0; i--) {
                room.eq(i).css({"left": -(30 + w) * (n-i) / w * 100 + '%'});
            }
            for (var j = 0; j < room.length-n; j++) {
                room.eq(j+n+1).css({"left": (30 + w) * (j+1) / w * 100 + '%'});
            }
            for(var k=0;k<room.length;k++){
                if(room.eq(k).css("left")=="0%"){
                    room.eq(k).css({"z-index":"2"});
                }else{
                    room.eq(k).css({"z-index":"0"});
                }
            }

        });
    }
    //婚宴婚庆 
    $scope.weedings_slider=function () {
        var weedings_img_box=$('.weedings_img_box');
        var item_list=weedings_img_box.find('.item_list');
        var item=item_list.find('.item');
        var mid=parseInt(item.length/2);
        var n=mid;
        var weedings_txt_box=$('.weedings_txt_box');
        var aP=weedings_txt_box.find('p');
        aP.css({'opacity':"0"});
        aP.eq(mid).css({'opacity':"1"});
        item.each(function (index,element) {
            if(index<mid){
                $(element).css({"transform":"rotateY(-50deg) translateZ(125px) translateX(-125px) scale(0.8)"});
            } else if(index>mid){
                $(element).css({"transform":"rotateY(50deg) translateZ(125px) translateX(125px) scale(0.8)"});
            }
        });
        item_list.swipeLeft(function () {
            n++;
            if(n>=item.length){
                n=item.length-1;
                return;
            }
            item.eq(n-1).css({"transform":"rotateY(-50deg) translateZ(125px) translateX(-125px) scale(0.8)"});
            item.eq(n).css({"transform":""});
            aP.css({'opacity':"0"});
            aP.eq(n).css({'opacity':"1"});
        });
        item_list.swipeRight(function () {
            console.log(234);
            n--;
            if(n<0){
                n=0;
                return;
            }
            item.eq(n+1).css({"transform":"rotateY(50deg) translateZ(125px) translateX(125px) scale(0.8)"});
            item.eq(n).css({"transform":""});
            aP.css({'opacity':"0"});
            aP.eq(n).css({'opacity':"1"});

        });
    }
});

/*配置路由*/
app.config(function ($routeProvider) {
    $routeProvider
        .when("/",{templateUrl:"pages/home/home.html"})
        //康体娱乐
        .when("/funs",{templateUrl:"pages/funs/funs.html",controller:"funsCtrl"})
        .when("/wenquan",{templateUrl:"pages/funs/wenquan.html",controller:"funsCtrl"})
        .when("/jianshen",{templateUrl:"pages/funs/jianshen.html",controller:"funsCtrl"})
        //会议会展
        .when("/meetings",{templateUrl:"pages/meetings/meetings.html",controller:"meetingsCtrl"})
        .when("/room_broadcast",{templateUrl:"pages/meetings/room_broadcast.html",controller:"meetingsCtrl"})
        .when("/room_fairwell",{templateUrl:"pages/meetings/room_fairwell.html",controller:"meetingsCtrl"})
        .when("/room_business",{templateUrl:"pages/meetings/room_business.html",controller:"meetingsCtrl"})
        //婚庆婚宴
        .when("/weedings",{templateUrl:"pages/weedings/weedings.html",controller:"weedingsCtrl"})
        //舒适客房
        .when("/rooms",{templateUrl:"pages/rooms/rooms.html",controller:"roomsCtrl"})
        .when("/luxury_room",{templateUrl:"pages/rooms/luxury_room.html",controller:"roomsCtrl"})
        .when("/administration_room",{templateUrl:"pages/rooms/administration_room.html",controller:"roomsCtrl"})
        .when("/luxury_big_room",{templateUrl:"pages/rooms/luxury_big_room.html",controller:"roomsCtrl"})
        .when("/unic_room",{templateUrl:"pages/rooms/unic_room.html",controller:"roomsCtrl"})
        .when("/normal_big_room",{templateUrl:"pages/rooms/normal_big_room.html",controller:"roomsCtrl"})
        .when("/standard_room",{templateUrl:"pages/rooms/standard_room.html",controller:"roomsCtrl"})
        .when("/standard_room",{templateUrl:"pages/rooms/standard_room.html",controller:"roomsCtrl"})
        .when("/book_rooms",{templateUrl:"pages/rooms/book_rooms.html",controller:"roomsCtrl"})//客房预定
        //餐饮美食
        .when("/foods",{templateUrl:"pages/foods/foods.html",controller:"foodsCtrl"})
        .when("/xiangxi",{templateUrl:"pages/foods/xiangxi.html",controller:"foodsCtrl"})
        .when("/four_seasons",{templateUrl:"pages/foods/four_seasons.html",controller:"foodsCtrl"})
        .when("/self_settings",{templateUrl:"pages/foods/self_settings.html",controller:"foodsCtrl"})
        .when("/cold_foods",{templateUrl:"pages/foods/cold_foods.html",controller:"foodsCtrl"})
        .when("/tea_bar",{templateUrl:"pages/foods/tea_bar.html",controller:"foodsCtrl"})
        .when("/public_bar",{templateUrl:"pages/foods/public_bar.html",controller:"foodsCtrl"})
        //商务办公
        .when("/business",{templateUrl:"pages/business/business.html",controller:"businessCtrl"})

});



