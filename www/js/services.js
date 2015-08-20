angular.module('bero.services', [])

.service('loginService', ['$state', 'Auth', '$firebaseArray', 'FIREBASE_CONST', function ($state, Auth, $firebaseArray, FIREBASE_CONST) {

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
        // unauth from Firebase
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

            if (userExists === null) {
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
        var locations = $firebaseArray( new Firebase(FIREBASE_CONST.URL + "/users/" + userUID + "/locations") );
        return locations;
    };

}])
.service('userPosition', ['$firebaseObject', 'FIREBASE_CONST', 'Auth', function ($firebaseObject, FIREBASE_CONST, Auth) {
    // // get auth data
    // var authData = Auth.$getAuth(),
    //     userUID = authData.uid;
    //
    //     this.getCoords = function () {
    //         console.log("getCoords");
    //
    //         var coordsObj = $firebaseObject( new Firebase(FIREBASE_CONST.URL + "/users/" + userUID + "/coords") );
    //
    //         // to take an action after the data loads, use the $loaded() promise
    //         coordsObj.$loaded().then(function() {
    //             console.log("loaded record:");
    //             return coordsObj;
    //         });

            // To make the data available in the DOM, assign it to $scope
            // $scope.data = coordsObj;

            // For three-way data bindings, bind it to the scope instead
            // coordsObj.$bindTo($scope, "data");
            // return coordsObj;




            // var coordsObj = $firebaseObject( new Firebase(FIREBASE_CONST.URL + "/users/" + userUID + "/coords") );
            // coordsObj.$loaded().then(function () {
            //         console.log("loaded coords");
            //         coordsObj.$save(coords);
            // });
        // };
}])
;
