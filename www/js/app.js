// Ionic bero App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'bero' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'bero.controllers' is found in controllers.js
angular.module('bero', [
    'ionic',
    'ion-google-place',
    'bero.controllers',
    'bero.factories',
    'bero.services',
    'firebase',
    'ngCordova'
])

.constant("FIREBASE_CONST",{
    "URL": "https://bero.firebaseio.com"
})

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
            console.log("$onAuth:", authData);
            if (authData === null) {
                console.log("rootScope. Not logged in yet: authData = ", authData);
                // if we're not logged in, go to the login page
                $state.go('app.login');
                // and empty the user scope.
                $rootScope.userData = {};
            } else {
                console.log("rootScope. Logged in as:", authData.google.cachedUserProfile.name);
                // if we are logged in, call the createUser function,
                loginService.createUser(authData);
                // reset the history stack (this causes the redirect to be the first page in the history
                // so we don't get a back button in the menu)
                $ionicHistory.nextViewOptions({historyRoot: true});
                // set the user scope
                $rootScope.userData = {
                    firstName: authData.google.cachedUserProfile.given_name,
                    profileImg: authData.google.profileImageURL,
                    uid: authData.uid
                };
                // redirect to the home page.
                $state.go('app.home');
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
    .state('app.add-locations', {
        url: '/add-locations',
        views: {
            'menuContent': {
                templateUrl: 'templates/add-locations.html',
                controller: 'locationsCtrl'
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
