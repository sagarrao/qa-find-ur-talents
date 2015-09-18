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
		
        $scope.showContent = function($fileContent){
								var content = JSON.parse($fileContent).formImage.Pages[45].Texts;
								var user = $scope.user;
								//Fetching Genius's Skills
								user.geniusmanagementpattern = content[0].R[0].T +  " " + content[1].R[0].T+ '%';
								user.geniusmanagementrank = content[3].R[0].T ;
								user.geniusleadershippattern = content[4].R[0].T +  " " + content[5].R[0].T + '%';
								user.geniusleadershiprank = content[7].R[0].T ;
								user.geniusimaginerank = content[8].R[0].T ;
								user.geniusimaginepattern =  content[11].R[0].T +  " " + content[9].R[0].T + '%';
								user.geniusmathlogicrank = content[12].R[0].T ;
								user.geniusmathlogicpattern =  content[15].R[0].T +  " " + content[13].R[0].T + '%';
								user.geniusfinemotorpattern = content[16].R[0].T +  " " + content[17].R[0].T+ '%';
								user.geniusfinemotorrank = content[19].R[0].T ;
								user.geniusgrossmotorpattern = content[20].R[0].T +  " " + content[21].R[0].T+ '%';
								user.geniusgrossmotorrank = content[23].R[0].T ;
								user.geniusmusicrank = content[24].R[0].T ;
								user.geniusmusicpattern = content[27].R[0].T +  " " + content[25].R[0].T+ '%';
								user.geniuslanguagelistenrank = content[28].R[0].T ;
								user.geniuslanguagelistenpattern = content[31].R[0].T +  " " + content[29].R[0].T+ '%';
								user.geniusobservationpattern = content[32].R[0].T +  " " + content[33].R[0].T+ '%';
								user.geniusobservationrank = content[35].R[0].T ;
								user.geniusvisualpattern = content[36].R[0].T +  " " + content[37].R[0].T+ '%';
								user.geniusvisualrank = content[39].R[0].T ;
								
								//Fetching Genius's Quotient 
								user.geniuseq = content[40].R[0].T ;
								user.geniusiq = content[41].R[0].T ;
								user.geniusaq = content[42].R[0].T ;
								user.geniuscq = content[43].R[0].T ;
								
								//Fetching Genius's learning style
								user.geniusvisuallearning = content[44].R[0].T ;
								user.geniusauditorylearning = content[45].R[0].T ;
								user.geniuskinasteticlearning = content[46].R[0].T ;
								user.geniuslearningby = content[47].R[0].T ;
								
								//Fetching Genius's Multiple Intelligence Rank
								user.geniusminaturerank = content[48].R[0].T ;
								user.geniusmiinterrank = content[49].R[0].T ;
								user.geniusmiintrarank = content[50].R[0].T ;
								user.geniusmimusicrank = content[51].R[0].T ;
								user.geniusmikinasteticrank = content[52].R[0].T ;
								user.geniusmispatialrank = content[53].R[0].T ;
								user.geniusmimathrank = content[54].R[0].T ;
								user.geniusmilanguagerank = content[55].R[0].T ;
								
								//Fetching Genius's Multiple Intelligence Percentage
								user.geniusmilanguageper = content[56].R[0].T.substring(0, 6);
								user.geniusmimathper = content[57].R[0].T.substring(0, 6);
								user.geniusmispatialper = content[58].R[0].T.substring(0, 6);
								user.geniusmikinasteticper = content[59].R[0].T.substring(0, 6);
								user.geniusmimusicper = content[60].R[0].T.substring(0, 6);
								user.geniusmiintraper = content[61].R[0].T.substring(0, 6);
								user.geniusmiinterper = content[62].R[0].T.substring(0, 6);
								user.geniusminatureper = content[63].R[0].T.substring(0, 6);
								
								//Fetching Genius's ATD angles
								user.geniusatdleft = content[70].R[0].T;
								user.geniusatdright = content[71].R[0].T;
								
								//Fetching Genius's Traits -RIASEC
								user.geniusrealistic = content[48].R[0].T ;
								user.geniusinvestigate = content[49].R[0].T ;
								user.geniusartistic = content[50].R[0].T ;
								user.geniussocial = content[51].R[0].T ;
								user.geniusenterprise = content[52].R[0].T ;
								user.geniusconventional = content[53].R[0].T ;
								
								//Fetching Genius's Characterstic and Thinking Type
								user.geniuscharinner = content[72].R[0].T ;
								user.geniusthinkleft = content[73].R[0].T ;
								user.geniuscharouter = content[75].R[0].T ;
								user.geniusthinkright = content[74].R[0].T ;
								
								//Fetching Genius's Personal Details
								user.geniusname = content[76].R[0].T ;
								user.geniusdob =  content[77].R[0].T.replace(/%2F/g, "/"); 
								var gender = content[78].R[0].T;
								if (gender == 'F'){
									user.geniusgender= 'female';
								}
								else if (gender == 'M'){
									user.geniusgender= 'male';
								}
								user.geniusparent = content[79].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ");
								user.geniusaddressline1 = content[80].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") + content[81].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",");
								user.geniusaddressline2 = content[106].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",");
								user.geniuscontact = content[82].R[0].T;
								
								//Fetching Genius's Lobe details
								user.geniusocipital = content[83].R[0].T + " %" ;
								user.geniustemporal = content[84].R[0].T + " %" ;
								user.geniusparietal = content[85].R[0].T + " %" ;
								user.geniusfrontal = content[86].R[0].T + " %" ;
								user.geniusprefrontal = content[87].R[0].T + " %" ;
								
								//Fetching Genius's Brain details
								user.geniusleftpercentage = content[88].R[0].T.substring(0, 6);
								user.geniusrightpercentage = content[89].R[0].T.substring(0, 6);
								user.geniustfrc = content[90].R[0].T.substring(0, 6);
								user.geniusreflective = content[91].R[0].T.substring(0, 6);
								user.geniusmotive = content[92].R[0].T.substring(0, 6);
								user.geniusmotive = content[92].R[0].T.substring(0, 6);
								user.geniusmotive = content[92].R[0].T.substring(0, 6);
								user.geniusmotive = content[92].R[0].T.substring(0, 6);
								user.geniusmotive = content[92].R[0].T.substring(0, 6);
								user.geniusmotive = content[92].R[0].T.substring(0, 6);
								
								//Fetching Genius's STYLE of learning
								user.geniuscognitivestyle = content[93].R[0].T.substring(0, 6);
								user.geniusaffectivestyle = content[94].R[0].T.substring(0, 6);
								user.geniuscriticalstyle = content[95].R[0].T.substring(0, 6);
								user.geniusreflectivestyle = content[96].R[0].T.substring(0, 6);
								user.geniuseintegratedstyle =  content[97].R[0].T.substring(0, 6);
								
								//Fetching Genius's STYLE of learning
								user.geniusenterprise =  content[98].R[0].T;
								user.geniusconventional =  content[99].R[0].T;
								user.geniussocial = content[100].R[0].T;
								user.geniusartistic =  content[101].R[0].T;
								user.geniusinvestigate =  content[102].R[0].T;
								user.geniusrealistic =  content[103].R[0].T;
								user.scantakenyes = true;
								
								//Fetch the content from first page 
								var content = JSON.parse($fileContent).formImage.Pages[1].Texts;
								
								//Fetching Genius's ID, phone number and email ID
								user.geniusemail =  content[9].R[0].T.replace(/%40/g, "@");
								user.geniusdos = content[10].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ");
								user.geniusid = content[12].R[0].T.replace(/%20/g ," ");
								user.geniuscontact = content[15].R[0].T.replace(/%20/g ," ");
								console.log(user);
								
								
							 };

		
		
		//Function to set the user data in the form for the genius chosen by user.
		$scope.gotoAGenius = function() {
			                    console.log(JSON.stringify($scope.selected));
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
														   remarks = date  +  '\n' + document.getElementById('geniusaddremarks').value + '\n';
														  
														   if(document.getElementById('geniuspreviousremarks').value){
															   
														   user.geniuspreviousremarks = remarks + '\n' + document.getElementById('geniuspreviousremarks').value;
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