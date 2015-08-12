angular.module('bero.factories', [])

// login factory
.factory("Auth", function($firebaseAuth) {
  var usersRef = new Firebase("https//bero.firebaseio.com/users");
  return $firebaseAuth(usersRef);
})
.factory("loadNgCordova", ['$ionicPlatform', function($ionicPlatform){
    $ionicPlatform.ready(function() {
        console.log('hi, im ready');
        // $cordovaPlugin.someFunction().then(success, error);
    });
}]);
