angular.module('bero.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, Auth) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  var userData =  Auth.$getAuth();
  $scope.userData = {
    'profileImg': userData.google.profileImageURL,
    'firstName': userData.google.cachedUserProfile.given_name
};
  console.log(userData);

  // // Create the login modal that we will use later
  // $ionicModal.fromTemplateUrl('templates/login.html', {
  //   scope: $scope
  // }).then(function(modal) {
  //   $scope.modal = modal;
  // });
  //
  // // Triggered in the login modal to close it
  // $scope.closeLogin = function() {
  //   $scope.modal.hide();
  // };
  //
  // // Open the login modal
  // $scope.login = function() {
  //   $scope.modal.show();
  // };

})

.controller('loginCtrl', function ($scope, Auth, $state) {
    var authData = Auth.$getAuth();
    console.log(authData);

    if (authData) {
        $state.go('app.home');
    }

    $scope.userLoginDeets = "I'm not logged in :(";
    $scope.logMeIn = function() {
        Auth.$authWithOAuthPopup("google", function(error, authData) {
          if (error) {
            console.log("Login Failed!", error);
          } else {
            console.log("Authenticated successfully with payload:", authData);
            $scope.userLoginDeets = authData;
            $scope.$apply();
          }
        });
    };

    // Create a callback which logs the current auth state
    function authDataCallback(authData) {
        console.log("hi");
        if (authData) {
            console.log("User " + authData.uid + " is logged in with " + authData.provider);
        } else {
            console.log("User is logged out");
        }
    }
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
