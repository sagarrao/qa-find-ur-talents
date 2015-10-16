app.controller('HomeController',["$scope", "$window","$location","$firebaseArray","$firebaseObject",
	function($scope,$window,$location,$firebaseArray,$firebaseObject) {
		// Initialize variables
		$scope.authorization_failed = true;
		//Fetch the UID of currently logged in User from session, based on results disable add[update] functionality of the app
		$(document).ready(function() { 
							 uid = $scope.uid; 
							 // If UID is found, check if user has write access on the Firebase database
							 if(uid != null)
							 {
								 var adminURL =  new Firebase(administratorsURL);
								 adminURL.once("value", function(snapshot) {  var authorization = snapshot.hasChild(uid);
																		 if ( authorization == true ) {
																			 $scope.authorization_failed = false;
																		 }																			 
																		 else{
																			 $scope.authorization_failed = true;
																		 }	
																		 $scope.$apply();
								 
										  });
							 }	
							});
	}])