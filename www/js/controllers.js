angular.module('bero.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, Auth, $state, loginService) {

    // // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/modals/login.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.loginModal = modal;
    });
    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $scope.loginModal.hide();
    };
    // Open the login modal
    $scope.showLogin = function() {
        $scope.loginModal.show();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.loginModal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    $scope.$on('$ionicView.enter', function(e) {
        Auth.$onAuth(function(authData) {
            if (authData === null) {
                console.log("Not logged in yet");
                $scope.userData = {};
                $scope.loginModal.show();
            } else {
                $scope.loginModal.hide();
                loginService.createUser(authData);
                console.log("Logged in as", authData);
                $scope.userData = {
                    firstName: authData.google.cachedUserProfile.given_name,
                    profileImg: authData.google.profileImageURL
                };
            }
        });
    });

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
        console.log('click');
        loginService.login();
    };

})

.controller('PlaylistsCtrl', function($scope) {
    $scope.playlists = [
        { title: 'Reggae', id: 1 },
        { title: 'Chill', id: 2 },
        { title: 'Dubstep', id: 3 },
        { title: 'Indie', id: 4 },
        { title: 'Rap', id: 5 },
        { title: 'Cowbell', id: 6 }
    ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
