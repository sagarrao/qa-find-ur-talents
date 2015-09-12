app.factory("currentAuth", ["$firebaseAuth",
  function($firebaseAuth) {
    var ref = new Firebase("https://torrid-heat-237.firebaseio.com");
    return $firebaseAuth(ref);
  }
]);