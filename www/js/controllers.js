angular.module('bero.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, Auth, $state, loginService) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:

    $scope.logOut = function(){
        loginService.logOut();
    };


})

.controller('loginCtrl', function ($scope, Auth, $state, loginService) {

    $scope.userLoginDeets = Auth;

    $scope.logOut = function(){
        loginService.logOut();
    };
    $scope.logMeIn = function(){
        loginService.login();
    };

})

.controller('homeCtrl', function($scope, $cordovaGeolocation, $ionicPlatform, getCoords, Auth, $firebaseObject, FIREBASE_CONST) {
    console.log("homeCtrl");

    $ionicPlatform.ready(function() {
        console.log("platform ready");
        $scope.count = 0;
        var posOptions = {timeout: 10000, enableHighAccuracy: false};
        $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function (position) {
                $scope.count++;
                var lat  = position.coords.latitude;
                var long = position.coords.longitude;
                console.log("YOU'RE HERE:", lat, long);
                $scope.setUserPostion(position);
            }, function(err) {
                console.log(err);
                $scope.error = err;
            });

        var watchOptions = {
            frequency : 40000,
            timeout : 30000,
            maximumAge: 0,
            enableHighAccuracy: false // may cause errors if true
        };

        var watch = $cordovaGeolocation.watchPosition(watchOptions);
        watch.then(
            null,
            function(err) {
                console.log("error", err);
                $scope.error = err;
            },
            function(position) {
                $scope.count++;
                var lat  = position.coords.latitude;
                var long = position.coords.longitude;
                console.log("you moved?:", lat, long);
                $scope.setUserPostion(position);
            });
            // watch.clearWatch();
            // // OR
            // $cordovaGeolocation.clearWatch(watch)
            // .then(function(result) {
            //     // success
            // }, function (error) {
            //     // error
            // });

            $scope.setUserPostion = function (position) {
                console.log("setUserPostion");
                // get the position ref from getCoords factory
                var coordsObj = getCoords();
                // bind our ref object to $scope.userPosition then update the scope object with the new position data.
                coordsObj.$bindTo($scope, 'userPosition').then(function () {
                    $scope.userPosition.position = position;
                });
            };
    });
})

.controller('friendsCtrl', function($scope, $firebaseObject, Auth) {
    // var usersObj = firebaseObject("users");
    // usersObj.
    // TODO find out how to loop through all users.
    // console.log( $firebaseObject( ref.child(0) ) );
})

.controller('locationsCtrl', function($scope, locationsService) {
    console.log('locationsCtrl');
    $scope.saveLocation = function (location) {
        locationsService.saveLocation(
            location.formatted_address,
            location.geometry.location
        );
    };

    // Set all saved locations into scope
    $scope.savedLocations = locationsService.getLocations();

});
