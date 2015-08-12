// Ionic bero App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'bero' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'bero.controllers' is found in controllers.js
angular.module('bero', [
    'ionic',
    'bero.controllers',
    'bero.factories',
    'bero.services',
    'firebase',
    'ngCordova',
])

.run(function($ionicPlatform, $rootScope, Auth, $state, $ionicHistory, loginService) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    Auth.$onAuth(function(authData) {
            if (authData === null) {
                console.log("Not logged in yet ROOT");
                $state.go('app.login');
                $rootScope.userData = {};
                // $scope.loginModal.show();
            } else {
                // $scope.loginModal.hide();
                loginService.createUser(authData);
                console.log("Logged in as ROOT", authData.google.cachedUserProfile.name);
                $ionicHistory.nextViewOptions({historyRoot: true});
                $state.go('app.home');
                $rootScope.userData = {
                    firstName: authData.google.cachedUserProfile.given_name,
                    profileImg: authData.google.profileImageURL
                };
            }
        });
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })
  //   .state('app.login', {
  //   url: '/login',
  //   views: {
  //       'menuContent': {
  //           templateUrl: 'templates/login.html',
  //           controller: 'loginCtrl'
  //       }
  //   }
  // })
  .state('app.home', {
    url: '/home',
    views: {
        'menuContent' :{
            templateUrl: 'templates/home.html',
            controller: 'homeCtrl'
        }
    }
    // this won't let the route load without auth
    // resolve: {
    //     "currentAuth" : ["Auth", function(Auth){
    //         return Auth.$requireAuth();
    //     }]
    // }
  })
  .state('app.login',{
      url:'/login',
      views:{
          'menuContent' :{
            templateUrl: 'templates/login.html',
            controller: 'loginCtrl'
          }
      }
  })
  .state('app.add-friends', {
      url: '/add-friends',
      views: {
        'menuContent': {
            templateUrl: 'templates/add-friends.html',
            controller: 'friendsCtrl'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});
