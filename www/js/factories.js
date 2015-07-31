angular.module('bero.factories', [])

// login factory
.factory("Auth", function($firebaseAuth) {
  var usersRef = new Firebase("https//bero.firebaseio.com/users");
  return $firebaseAuth(usersRef);
});
