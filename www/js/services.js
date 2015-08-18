angular.module('bero.services', [])

.service('loginService', ['$state', 'Auth', '$firebaseArray', '$firebaseObject', function ($state, Auth, $firebaseArray, $firebaseObject) {

    this.login = function () {
        console.log('service.login');
        Auth.$authWithOAuthRedirect("google").then(function(authData) {
            // User successfully logged in
            // Can't do anything here :(
        }).catch(function(error) {
            if (error.code === "TRANSPORT_UNAVAILABLE") {
                Auth.$authWithOAuthPopup("google").then(function(authData) {
                    // User successfully logged in. We can log to the console
                    // since we’re using a popup here
                    console.log("popupAuth", authData.google.cachedUserProfile.given_name);
                });
            } else {
                // Another error occurred
                console.log(error);
            }
        });
    };

    this.logOut = function () {
        console.log('service.logOut');
        Auth.$unauth();
    };

    this.createUser = function(authData){
        var beroURL = "https://bero.firebaseio.com";
        // build user details object to save to firebase
        var userCreds = {
            uid: authData.auth.uid,
            firstName: authData.google.cachedUserProfile.given_name,
            lastName: authData.google.cachedUserProfile.family_name,
            displayName: authData.google.displayName,
            profileImg: authData.google.profileImageURL,
            timestamp: Date.now()
        };
        // check if the logged in user already has an account in firebase
        var users = new Firebase( beroURL + "/users");
        users.child(userCreds.uid).once('value', function(snapshot){
            var userExists = snapshot.val();
            console.log('userExists', userExists);
            //
            if (userExists === null) {
                // create new user in firebase
                // array that works
                // var urlArray = $firebaseArray( new Firebase(beroURL + "/users/" + userCreds.uid) );
                // urlArray.$add(userCreds).then(function(ref){
                //     // can do something here...
                // });
                // object maybe?
                var newUser = new Firebase(beroURL + "/users/" + userCreds.uid);
                console.log(userCreds);
                newUser.set(userCreds);
            } else {
                $state.go('app.home');
            }
        });
    };
}])
.service('locationsService', ['$firebaseArray', function($firebaseArray){

    this.saveLocation = function (formatted, latlng) {
        // save the formatted address and latlng to the users firebase
        console.log(formatted, latlng);

    };

}]);
