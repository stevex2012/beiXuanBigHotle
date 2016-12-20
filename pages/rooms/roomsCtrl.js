/**
 * Created by 火星时代 on 2016/12/15.
 */
app.controller("roomsCtrl",function ($scope,$window) {

    $scope.lunbo();
    //预定交互
    $scope.bookRoomNum=1;
    //价格数组
    $scope.prices=["899","999","799"];
    //增加
    $scope.add_btn=function () {
        $scope.bookRoomNum++;
    };
    //减少
    $scope.reduce_btn=function () {
        if($scope.bookRoomNum==0){return}
        $scope.bookRoomNum--;
    };
    $scope.show_p1=true;
    $scope.show_p2=false;
    //选项卡
    $scope.show_1=function () {
        $scope.show_p1=true;
        $scope.show_p2=false;

};
    $scope.show_2=function () {
        $scope.show_p1=false;
        $scope.show_p2=true;
    };

});