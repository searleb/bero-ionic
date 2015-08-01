angular.module('bero.services', [])

.service('loginService', ['$state', 'Auth', function ($state, Auth, $ionicLoading) {

    this.login = function () {

        Auth.$authWithOAuthRedirect("google").then(function(authData) {
            // User successfully logged in
            $state.go('app.home');
        }).catch(function(error) {
            if (error.code === "TRANSPORT_UNAVAILABLE") {
                Auth.$authWithOAuthPopup("google").then(function(authData) {
                    // User successfully logged in. We can log to the console
                    // since we’re using a popup here
                    console.log(authData);
                });
            } else {
                // Another error occurred
                console.log(error);
            }
        });
    };

    this.logOut = function () {
        Auth.$unauth();
    };
}]);
