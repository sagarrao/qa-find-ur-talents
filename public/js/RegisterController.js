app.controller('RegisterController', ["$scope", "$firebaseAuth","$location","$window",
function($scope, $firebaseAuth, $location,$window) {
	
	
	//Initializing variable of this scope
	$scope.errorMsg ="";		
    $scope.email ='';
    $scope.password = '';
	document.forms['form.registerForm'].reset();
	var collection_URL = new Firebase(geniusesCollectionURL);
	
	$scope.registerUser = function(){ // try to create a user in Firebase
		collection_URL.createUser({
		email: $scope.email,
		password: $scope.password},
		function(error, userData) { //reset scope variables , scope data and display error if creating user is unsuccessful
			if (error) {  
							document.forms['form.registerForm'].reset();
							switch (error.code) 
							{
								case "EMAIL_TAKEN":
									$scope.errorMsg = "The new user account cannot be created because the email is already in use.";						
									break;
								case "INVALID_EMAIL":
									$scope.errorMsg = "The specified email is not a valid email.";
									break;
								default:
									$scope.errorMsg = "Error creating user:" + error ;
							}
							$scope.email='';
							$scope.password='';	
							$scope.$apply();
				
						}
		   else {
					
					var auth = $firebaseAuth(collection_URL);
					// Try to login the User if user creation was successful.
					auth.$authWithPassword({ email:$scope.email,
											 password: $scope.password 
										   }).then(function(authData) { 
																		// If login is successful, Redirect the user to home 
																		window.location.assign('/?auth='+JSON.stringify(authData));
																		
																	  }).catch(function(error){ $scope.email='';
																								$scope.password='';
																								//Redirect to login page for re-login, if login fails.
																								window.location.assign('/login');
																								$scope.errorMsg = "Could not Login the user, User name or Password is incorrect";
																								$scope.$apply();
																							   })
				  }
				  
		})			
		}		
	}])
		
		
		
