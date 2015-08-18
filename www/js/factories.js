angular.module('bero.factories', [])

.factory("Auth", function($firebaseAuth) {
    // returns users auth data
  var usersRef = new Firebase("https://bero.firebaseio.com/users");
  return $firebaseAuth(usersRef);
})
.factory("loadNgCordova", ['$ionicPlatform', function($ionicPlatform){
    $ionicPlatform.ready(function() {
        console.log('hi, im ready');
        // $cordovaPlugin.someFunction().then(success, error);
    });
}]);
