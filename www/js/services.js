angular.module('bero.services', [])

.service('loginService', ['$state', 'Auth', '$firebaseArray', function ($state, Auth, $firebaseArray) {

    this.login = function () {

        Auth.$authWithOAuthRedirect("google").then(function(authData) {
            // User successfully logged in
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

    this.createUser = function(authData){
        var beroURL = "https://bero.firebaseio.com";
        // build user details object to save to firebase
        var userCreds = {
            uid: authData.auth.uid,
            firstName: authData.google.cachedUserProfile.given_name,
            lastName: authData.google.cachedUserProfile.family_name,
            timestamp: Date.now()
        };
        // check if the logged in user already has an account in firebase
        var users = new Firebase( beroURL + "/users");
        users.child(userCreds.uid).once('value', function(snapshot){
            var userExists = snapshot.val();
            //
            if (userExists === null) {
                // create new user in firebase
                var url = $firebaseArray( new Firebase(beroURL + "/users/" + userCreds.uid) );
                url.$add(userCreds).then(function(ref){
                    // can do something here...
                });
            }
        });
    };
}]);
