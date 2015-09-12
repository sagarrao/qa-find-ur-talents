app.controller('GetOrUpdateGenius',["$scope", "GeniusFactory","$window","$location","$firebaseArray","$firebaseObject","currentAuth",
	function($scope,GeniusFactory,$window,$location,$firebaseArray,$firebaseObject,currentAuth) {
		// Initialize the scope variables
		$scope.add = true;
		var geniusForm;
		var user;
		var remarks;
		$scope.user ={};
		$scope.form_readonly = false;
		$scope.selected = '';
		if (currentAuth) { // Fetches the existing list of genius's from firebase if current user has authorization for the same.
			$scope.usersArray = $firebaseArray(new Firebase(ref));			
		}
	 	var userId = null;
		$scope.error_messsage = null;		 
		
		//Function to set the user data in the form for the genius chosen by user.
		$scope.gotoAGenius = function() {
								userId = JSON.parse(JSON.stringify($scope.selected))['$id'];
								$scope.form_readonly = false;
								GeniusFactory.setUser((JSON.parse(JSON.stringify($scope.selected))['$id']))	
								$scope.error_messsage = null;			;
								$scope.user = GeniusFactory.getUser();
							 }
							 
         // Function to disable the genius form in case user tries to access user details which do not exist in the Firebase DB.
	     $scope.usernamechanged = function(){ $scope.user = {};
											  $scope.form_readonly = true;
											  $scope.error_messsage = "No such genius exists in the system. Please click on ADD Genius to add a new genius"
											}
											
		 // Function to ADD or UPDATE the genius details in Firebase details based on the scenario
		 $scope.saveGeniusInfo = function() {  geniusForm = $scope.geniusInfoForm;
											    if(geniusForm.$pristine)
													$window.alert("No values to update..");
												else{
														var userId = GeniusFactory.getUserId();
														user =$scope.user;
														if(document.getElementById('geniusaddremarks').value) 				   
														{  var date =  new Date();
														   date = date.toString().substring(0,24);
														   remarks = date  +  " " + document.getElementById('geniusaddremarks').value ;
														  
														   if(document.getElementById('geniuspreviousremarks').value){
															   
														   user.geniuspreviousremarks = remarks + 
																						"" + 
																						document.getElementById('geniuspreviousremarks').value;
														   }
														   else{
															   user.geniuspreviousremarks = remarks ;
														   }	
														user.geniusaddremarks = '';
													  
													}
													// If user has chosen add option, add the genius data from form into Firebase Database   
													if($scope.add){
														user.geniusname = document.getElementById('geniusname').value; 
														GeniusFactory.addUser(user);
													}
													// If user has chosen update option, update the genius data from form into Firebase Database  
													else if(!$scope.add){
														user.geniusname = document.getElementById('searchgenius').value; 
														GeniusFactory.updateUser(user,userId);
													}
												} 
											}
		
		// Function is executed when add genius option is selected.
		$scope.addGenius = function ()
		{
			document.forms['geniusInfoForm'].reset();
			$scope.add = true;
			$scope.error_messsage = null;	
			$scope.form_readonly = false;
			$scope.user ={};
			 
		}
		
		// Function is executed when update genius option is selected.
		$scope.updateGenius = function ()
		{
	        $scope.user = {};
			document.forms['geniusInfoForm'].reset();
			$scope.error_messsage = null;	
			$scope.form_readonly = false;
			$scope.add = false;
		} 
		}
  ]);