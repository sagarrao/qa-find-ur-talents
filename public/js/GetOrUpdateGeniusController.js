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
			$scope.usersArray = $firebaseArray(new Firebase(geniusesCollectionURL));			
		}
	 	var userId = null;
		$scope.error_messsage = null;
		
        $scope.showContent = function($fileContent){
								$scope.user = {};								
								var page_length =  JSON.parse($fileContent).formImage.Pages.length;
								var length = JSON.parse($fileContent).formImage.Pages[page_length-1].Texts.length;
								var content = JSON.parse($fileContent).formImage.Pages[page_length - 1].Texts;
								var user = $scope.user;
								//Fetching Genius's Skills
								
								if( length != 106 || length != 107){
									$scope.error_messsage = 'File is not in the correct format';
									user = {};
								}
								else
								{
										
									user.geniusmanagementpattern = content[0].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") ;
									user.geniusmanagementpercentage = content[1].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",");
									user.geniusmanagementrank = content[3].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") ;
									user.geniusleadershippattern = content[4].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") ;
									user.geniusleadershippercentage =  content[5].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") ;
									user.geniusleadershiprank = content[7].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") ;
									user.geniusimaginerank = content[8].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") ;
									user.geniusimaginepattern =  content[11].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") ;
									user.geniusimaginepercentage = content[9].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") ;
									user.geniusmathlogicrank = content[12].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") ;
									user.geniusmathlogicpattern =  content[15].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") ;
									user.geniusmathlogicpercentage = content[13].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") ;
									user.geniusfinemotorpattern = content[16].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") ;
									user.geniusfinemotorpercentage =content[17].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",");
									user.geniusfinemotorrank = content[19].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") ;
									user.geniusgrossmotorpattern = content[20].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") ;
									user.geniusgrossmotorpercentage =content[21].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",");
									user.geniusgrossmotorrank = content[23].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") ;
									user.geniusmusicrank = content[24].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") ;
									user.geniusmusicpattern = content[27].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") ;
									user.geniusmusicpercentage = content[25].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",");
									user.geniuslanguagelistenrank = content[28].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") ;
									user.geniuslanguagelistenpattern = content[31].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") ;
									user.geniuslanguagelistenpercentage = content[29].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",");
									user.geniusobservationpattern = content[32].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") ;
									user.geniusobservationpercentage =content[33].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",");
									user.geniusobservationrank = content[35].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") ;
									user.geniusvisualpattern = content[36].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",");
									user.geniusvisualpercentage =content[37].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",");
									user.geniusvisualrank = content[39].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") ;
									
									//Fetching Genius's Quotient 
									user.geniuseq = content[40].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") ;
									user.geniusiq = content[41].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") ;
									user.geniusaq = content[42].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") ;
									user.geniuscq = content[43].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") ;
									
									//Fetching Genius's learning style
									user.geniusvisuallearning = content[44].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") ;
									user.geniusauditorylearning = content[45].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") ;
									user.geniuskinasteticlearning = content[46].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") ;
									user.geniuslearningby = content[47].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") ;
									
									//Fetching Genius's Multiple Intelligence Rank
									user.geniusminaturerank = content[48].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") ;
									user.geniusmiinterrank = content[49].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") ;
									user.geniusmiintrarank = content[50].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") ;
									user.geniusmimusicrank = content[51].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") ;
									user.geniusmikinasteticrank = content[52].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") ;
									user.geniusmispatialrank = content[53].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") ;
									user.geniusmimathrank = content[54].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") ;
									user.geniusmilanguagerank = content[55].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") ;
									
									//Fetching Genius's Multiple Intelligence Percentage
									user.geniusmilanguageper = content[56].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").substring(0, 6);
									user.geniusmimathper = content[57].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").substring(0, 6);
									user.geniusmispatialper = content[58].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").substring(0, 6);
									user.geniusmikinasteticper = content[59].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").substring(0, 6);
									user.geniusmimusicper = content[60].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").substring(0, 6);
									user.geniusmiintraper = content[61].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").substring(0, 6);
									user.geniusmiinterper = content[62].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").substring(0, 6);
									user.geniusminatureper = content[63].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").substring(0, 6);
									
									//Fetching Genius's ATD angles
									user.geniusatdleft = content[70].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",");
									user.geniusatdright = content[71].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",");
									
									//Fetching Genius's Traits -RIASEC
									user.geniusrealistic = content[48].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") ;
									user.geniusinvestigate = content[49].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") ;
									user.geniusartistic = content[50].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") ;
									user.geniussocial = content[51].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") ;
									user.geniusenterprise = content[52].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") ;
									user.geniusconventional = content[53].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") ;
									
									//Fetching Genius's Characterstic and Thinking Type
									user.geniuscharinner = content[72].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") ;
									user.geniusthinkleft = content[73].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") ;
									user.geniusthinkright = content[75].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") ;
									user.geniuscharouter = content[74].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") ;
									
									//Fetching Genius's Personal Details
									user.geniusname = content[76].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") ;
									user.geniusdob =  content[77].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").replace(/%2F/g, "/"); 
									var gender = content[78].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",");
									if (gender == 'F'){
										user.geniusgender= 'female';
									}
									else if (gender == 'M'){
										user.geniusgender= 'male';
									}
									user.geniusparent = content[79].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",");
									if (length == 107)
									{				
								
											user.geniusaddressline1 = content[80].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") + content[81].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",");
											user.geniusaddressline2 = content[106].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",");
											length = 1;
									}
									else if ( length == 106 ) 
									{				
								
											user.geniusaddressline1 = content[80].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") ;
											user.geniusaddressline2 = content[105].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",");
											length = 0;
									}
											
											user.geniuscontact = content[81+length].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",");
											
											//Fetching Genius's Lobe details
											user.geniusocipital = content[82+length].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") ;
											user.geniustemporal = content[83+length].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",")  ;
											user.geniusparietal = content[84+length].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",")  ;
											user.geniusfrontal = content[85+length].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",")  ;
											user.geniusprefrontal = content[86+length].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",")  ;
											
											//Fetching Genius's Brain details
											user.geniusleftpercentage = content[87+length].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").substring(0, 6).replace(/%2/g," ");
											user.geniusrightpercentage = content[88+length].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").substring(0, 6).replace(/%2/g," ");
											user.geniustfrc = content[89+length].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").substring(0, 6).replace(/%2/g," ");
											user.geniusreflective = content[90+length].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").substring(0, 6).replace(/%2/g," ");
											user.geniusmotive = content[91+length].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").substring(0, 6).replace(/%2/g," ");
											
											//Fetching Genius's STYLE of learning
											user.geniuscognitivestyle = content[92+length].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").substring(0, 6).replace(/%2/g," ");
											user.geniusaffectivestyle = content[93+length].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").substring(0, 6).replace(/%2/g," ");
											user.geniuscriticalstyle = content[94+length].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").substring(0, 6).replace(/%2/g,"%");
											user.geniusreflectivestyle = content[95+length].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").substring(0, 6).replace(/%2/g," ");
											user.geniuseintegratedstyle =  content[96+length].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").substring(0, 6).replace(/%2/g," ");
											
											//Fetching Genius's STYLE of learning
											user.geniusenterprise =  content[97+length].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",");
											user.geniusconventional =  content[98+length].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",");
											user.geniussocial = content[99+length].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",");
											user.geniusartistic =  content[100+length].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",");
											user.geniusinvestigate =  content[101+length].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",");
											user.geniusrealistic =  content[102+length].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",");
										
										    user.scantakenyes = true;
									
											//Fetch the content from first page 
											var content = JSON.parse($fileContent).formImage.Pages[1].Texts;
											length = JSON.parse($fileContent).formImage.Pages[1].Texts.length;
											//Fetching Genius's ID, phone number and email ID
											length = length -1;
											user.geniusemail =  content[length -8].R[0].T.replace(/%40/g, "@").replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",");
											user.geniusdos = content[length - 7].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",");
											user.geniusid = content[length-5].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",");
											//console.log(JSON.stringify(user));
								
								}
								
								
							 };

		
		
		//Function to set the user data in the form for the genius chosen by user.
		$scope.gotoAGenius = function() {
			                   // console.log(JSON.stringify($scope.selected));
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
											    var date =  new Date();
												date = date.toString().substring(0,24);
											    if($scope.user == {})
													$window.alert("No values to update..");
												else{
														var userId = GeniusFactory.getUserId();
														user =$scope.user;
														if(document.getElementById('geniusaddremarks').value) 				   
														{ 
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
														if(user.scantakenyes != true)
														{
															user.meetingDay = date;
														}
														
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