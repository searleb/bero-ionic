angular.module('bero.services', [])

.service('loginService', ['$state', 'Auth', '$firebaseArray', '$firebaseObject', 'FIREBASE_CONST', function ($state, Auth, $firebaseArray, $firebaseObject, FIREBASE_CONST) {

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
        var users = new Firebase( FIREBASE_CONST.URL + "/users");
        users.child(userCreds.uid).once('value', function(snapshot){
            var userExists = snapshot.val();
            console.log('userExists', userExists);
            //
            if (userExists === null) {
                // create new user in firebase
                // array that works
                // var urlArray = $firebaseArray( new Firebase(FIREBASE_CONST.URL + "/users/" + userCreds.uid) );
                // urlArray.$add(userCreds).then(function(ref){
                //     // can do something here...
                // });
                // object maybe?
                var newUser = new Firebase(FIREBASE_CONST.URL + "/users/" + userCreds.uid + "/profile");
                console.log(userCreds);
                newUser.set(userCreds);
            } else {
                $state.go('app.home');
            }
        });
    };
}])

.service('locationsService', ['$firebaseArray', 'FIREBASE_CONST', 'Auth', function($firebaseArray, FIREBASE_CONST, Auth){
    // get auth data
    var authData = Auth.$getAuth(),
        userUID = authData.uid;


    this.saveLocation = function (formatted, latlng) {
        // save the formatted address and latlng to the users firebase
        if (userUID) {
            var locationArray = $firebaseArray( new Firebase(FIREBASE_CONST.URL + "/users/" + userUID + "/locations") ),
                location = {
                    formatted: formatted,
                    latlng: latlng
                };
                console.log("locationArray",locationArray);
            locationArray.$add(location);
        } else {
            alert("Sorry, something went wrong.");
        }
    };

    this.getLocations = function () {
        var locations = $firebaseArray( new Firebase("https://bero.firebaseio.com/users/" + userUID + "/locations") );
        return locations;
    };

}]);
