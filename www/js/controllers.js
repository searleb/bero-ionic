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

    // $scope.$on('$ionicView.enter', function(e) {
    //     Auth.$onAuth(function(authData) {
    //         if (authData === null) {
    //             console.log("Not logged in yet");
    //             $scope.userData = {};
    //         } else {
    //             loginService.createUser(authData);
    //             console.log("Logged in as", authData.google.cachedUserProfile.name);
    //             $scope.userData = {
    //                 firstName: authData.google.cachedUserProfile.given_name,
    //                 profileImg: authData.google.profileImageURL
    //             };
    //         }
    //     });
    // });

    $scope.userLoginDeets = Auth;

    $scope.logOut = function(){
        loginService.logOut();
    };
    $scope.logMeIn = function(){
        loginService.login();
    };

})

.controller('homeCtrl', function($scope) {

})

.controller('friendsCtrl', function($scope, $firebaseObject, Auth) {
    // var usersObj = firebaseObject("users");
    // usersObj.
    // TODO find out how to loop through all users.
    // console.log( $firebaseObject( ref.child(0) ) );
})

.controller('locationsCtrl', function($scope, $firebaseObject, $rootScope, locationsService) {
    console.log('locationsCtrl');
    var ref = new Firebase("https://bero.firebaseio.com/users/" + $rootScope.userData.uid);
    var user = ref;
    console.log("user:", user);
    // console.log('Auth in locationsCtrl', Auth);
    // console.log('rootScope in locationsCtrl', $rootScope);
    // console.log('rootScope in locationsCtrl', $rootScope.userData.uid);
    // console.log("wut", user);
    $scope.saveLocation = function (location) {
        locationsService.saveLocation(
            location.formatted_address,
            location.geometry.location
        );
    };
});
