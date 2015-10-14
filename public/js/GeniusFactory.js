 app.factory('GeniusFactory', ["$firebaseObject", "$firebaseArray","$http", "$location","$window",
 function($firebaseObject,$firebaseArray,$http,$location,$window){
    //Initialize Variables
    var _users;
	var _usersArray;
	var _user;
    var _userid;

	
    return {  users: users,
			  usersArray: usersArray,
			  setUser : function setUser(id){ //Sets current user and user id for future use
				         
						_user = $firebaseObject(new Firebase(geniusesCollectionURL+"/"+id));
						_userid = id;
						},
			 getUser : function getUser(){ //Returns current user as object
						return _user;
					   },
			 getUserId : function getUserId(){ //Returns current user id
							return _userid;
						},
			 updateUser: function updateUser(user,index){ //Updates an existing user in the Firebase Database
							_user.$save().then( function(ref) { // If user was updated successfully then reset the user and redirects to the home page
												_user =  null;
												document.forms['geniusInfoForm'].reset();
												window.location.assign("/addSuccess");
				
											}).catch(function(error) { // If user update fails then reset the form and redirects to home
																		document.forms['geniusInfoForm'].reset();
																		_user = null;
																		window.location.assign("/addFailed");
													});
						},	    
			 addUser: function addUser(user){
						_users = $firebaseArray(new Firebase(geniusesCollectionURL));
						_users.$add(user).then( function(ref){  //If User was added successfully then redirects to the home page
												_user = null;
												document.forms['geniusInfoForm'].reset();
												window.location.assign("/addSuccess");
												}).catch( function(error) { // If user addition fails then reset the form redirects to home
															document.forms['geniusInfoForm'].reset();
															_user =null;
															window.location.assign("/addFailed");
														});
						}
			}  
	
	function usersArray(){
		if(!_usersArray)
		return _usersArray;
	}
	
    function users() {
		  if (!_users) {
			_users = $firebaseObject(new Firebase(ref));
		  }
      return _users;
    }
	
  }]); 
