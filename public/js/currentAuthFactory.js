app.factory("currentAuth", ["$firebaseAuth",
  function($firebaseAuth) {
    var authURL = new Firebase(authenticationURL);
    return $firebaseAuth(authURL);
  }
]);