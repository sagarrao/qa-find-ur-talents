app.controller('LoginController', ["$scope", "$firebaseAuth","$location","$window",
	function($scope, $firebaseAuth, $location,$window) {
		// Initializes the scope variables
		$scope.welcomemessage="Please Provide Your Login Credentials";
		var authURL = new Firebase(authenticationURL);
		var auth = $firebaseAuth(authURL);
		var authFailed = false;
		$scope.email ='';
		$scope.password='';
		$scope.errorMsg = "";
		//Function to check if login credentials provided by user are correct
		$scope.login = function() {
							var email = $scope.email;
							var password = $scope.password;
							auth.$authWithPassword({
								email: email,
								password: password}).then(function(authData) { // If login credentials are valid then reset the scope and redirects to home page
																			   document.forms['form.loginForm'].reset();
																			   $scope.email ='';
																			   $scope.password='';
																			   window.location.assign('/?auth='+JSON.stringify(authData));
																			   authFailed = false;
																			}).catch(function(error) {  // If login fails then reset the form and displays error message
																										document.forms['form.loginForm'].reset();
																										$scope.errorMsg = "User name or password is incorrect, Kindly try again";
																										$scope.email ='';
																										$scope.password='';
																										$scope.$apply();
																										authFailed = true;
																										});
						 }
		}
	]);