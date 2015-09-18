app.controller('GetAllGeniuses', ["currentAuth","$scope", 'GeniusFactory', '$window','$location','$firebaseArray',
    function(currentAuth,$scope, GeniusFactory,$window,$location,$firebaseArray) {
		// Code for creating a pagination in the window
		$scope.itemsPerPage = 10;
		$scope.currentPage = 0;
	    
		// Returns the previous page in the list when previous page hyper link is clicked
		$scope.prevPage = function() { if ($scope.currentPage > 0) 
										{
										  $scope.currentPage--;
										}
									 };
									 
        // Disables previous page hyper link if current page is the first page for the list
		$scope.prevPageDisabled = function() { return $scope.currentPage === 0 ? "disabled" : "";
											 };
											 
        //Stores the total number of pages required to display current list of users.
		$scope.pageCount = function() { return Math.ceil($scope.users.length/$scope.itemsPerPage)-1;
									  };
		// Returns the next page in the list when next page hyper link is clicked
		 $scope.nextPage = function() { if ($scope.currentPage < $scope.pageCount()) 
											{
											  $scope.currentPage++;
											}
									  };
		// Disables next page hyper link if next page is the last page for the list
		  $scope.nextPageDisabled = function() { return $scope.currentPage === $scope.pageCount() ? "disabled" : ""; };	 
  
  
		//Checks If current User is Authorized to view the page, and fetches the user list if yes.
		if(currentAuth)
		{
			$scope.users = $firebaseArray(new Firebase(ref)); 
		}
		// Initializes the scope variables			
		$scope.selected="";
		$scope.message="Pick Any Genius From Below List " ;
		$scope.viewgenius = false;
		$scope.form_readonly = false;
		$scope.user = {};
		$scope.authorization_failed = true;
		
		// To Fetch the UID of currently logged in user from the Session
		$(document).ready( function() { 
						   uid = $scope.uid; 
						   // If UID found in the session , Check if the user associated with this UID has write access to the database
						   if(uid != null){
							   var ref = new Firebase("https://torrid-heat-237.firebaseio.com/superusers");
							   ref.once("value", function(snapshot) { 
													var authorization = snapshot.hasChild(uid);
													// If authorization check succeeds then set the authorization_failed as false
													if ( authorization == true ){
														$scope.authorization_failed = false;													
													}				 								    
													// If authorization check fails then set the authorization_failed as true
													else {
															$scope.authorization_failed = true;
														 }			 
									});
							}
						 });
			
		// Function is Called when user tries to access a genius whose details do not exist in the database
		$scope.usernamechanged = function(){	
									$scope.user = {};
									$scope.form_readonly = true;
									$scope.error_messsage = "No such genius exists in the system. Please GOTO ADD Genius to add a new genius";
									}
	   // When a User name is chosen for update, remaining fields of the form are updated with existing user details present in the DB
	   $scope.DisplayAGenius = function(user) {  $scope.message='Genius Info';
												 $scope.viewgenius = true;
												 GeniusFactory.setUser(JSON.parse(JSON.stringify(user))['$id'])					;
												 $scope.form_readonly = false;			 
												 $scope.user = GeniusFactory.getUser();	
											}
	   // Function is called when a user wants to go back to the list of user from the update genius form.
	   $scope.enablelist = function(){   $scope.viewgenius = false;
										 $scope.message = "Pick Any Genius From Below List " ;
										 $scope.user = {};
										 $scope.form_readonly = false;
										 $scope.selected= '';
									 }
									 
		//Function is called when user wants to save the updated details of the current User	
		$scope.saveGeniusInfo = function() {
											 var remarks ;
											 //Fetches the current User ID from the GeniusFactory
											 var userId = GeniusFactory.getUserId();
											 var user = $scope.user;
											 //Checks If new Remark has been added in the user form
											if(document.getElementById('geniusaddremarks').value) 				   
											{  var date =  new Date();
											   date = date.toString().substring(0,24);
											   remarks = date  +  '\n' + document.getElementById('geniusaddremarks').value +  '\n';
															
											   
											   if(document.getElementById('geniuspreviousremarks').value) 
											   {
												   user.geniuspreviousremarks = remarks + '\n' + document.getElementById('geniuspreviousremarks').value;
											   }											   
											   else
											   {
												   user.geniuspreviousremarks = remarks ;
											   }
											   
											   user.geniusaddremarks = '';
											  
											}												
										    GeniusFactory.updateUser(user,userId);
										  }
		
	}]
);