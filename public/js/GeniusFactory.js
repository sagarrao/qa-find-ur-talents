 app.factory('GeniusFactory', ["$firebaseObject", "$firebaseArray","$http", "$location","$window","$q",
 function($firebaseObject,$firebaseArray,$http,$location,$window,$q){
    //Initialize Variables
	var _user;
    var _userid;
	var ref = new Firebase(geniusesCollectionURL);
	var users = [];

	
    return {  
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
						// _users = $firebaseArray(new Firebase(geniusesCollectionURL));
						users.$add(user).then( function(ref){  //If User was added successfully then redirects to the home page
												_user = null;
												document.forms['geniusInfoForm'].reset();
												window.location.assign("/addSuccess");
												}).catch( function(error) { // If user addition fails then reset the form redirects to home
															document.forms['geniusInfoForm'].reset();
															_user =null;
															window.location.assign("/addFailed");
														});
						},
			usersArray: function usersArray(){
			                if(users.length == 0)
							{
								users = $firebaseArray(ref);
								
						    }
								return users;
						}
						
	    }
  } 	

	
  ]); 
