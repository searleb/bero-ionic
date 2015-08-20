angular.module('bero.factories', [])

.factory("Auth", function($firebaseAuth) {
    // returns users auth data
  var usersRef = new Firebase("https://bero.firebaseio.com/users");
  return $firebaseAuth(usersRef);
})

.factory("getCoords", ['$firebaseObject', 'FIREBASE_CONST', 'Auth', function ($firebaseObject, FIREBASE_CONST, Auth) {
    // get auth data
    return function () {
        var authData = Auth.$getAuth(),
            userUID = authData.uid,
            ref = new Firebase(FIREBASE_CONST.URL + "/users/" + userUID);
        ref.child("position");
        return $firebaseObject(ref);
    };
}])

.factory("loadNgCordova", ['$ionicPlatform', function($ionicPlatform){
    $ionicPlatform.ready(function() {
        console.log('hi, im ready');
        // $cordovaPlugin.someFunction().then(success, error);
    });
}]);
