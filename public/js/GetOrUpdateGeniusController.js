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
			//$scope.usersArray = $firebaseArray(new Firebase(geniusesCollectionURL));	
              
			$scope.usersArray = GeniusFactory.usersArray();		
                        			
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
								
								if( length < 106){
									$scope.error_messsage = 'File is not in the correct format';
									user = {};
																	}
								else
								{
										
									user.geniusmanagementpattern = content[0].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") ;
									user.geniusmanagementpercentage = parseFloat(content[1].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").replace(/%2/g," "));
									user.geniusmanagementrank = parseInt(content[3].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") );
									user.geniusleadershippattern = content[4].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") ;
									user.geniusleadershippercentage =  parseFloat(content[5].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").replace(/%2/g," ")) ;
									user.geniusleadershiprank = parseInt(content[7].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",")) ;
									user.geniusimaginerank = parseInt(content[8].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") );
									user.geniusimaginepattern =  content[11].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") ;
									user.geniusimaginepercentage = parseFloat(content[9].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").replace(/%2/g," ")) ;
									user.geniusmathlogicrank = parseInt(content[12].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") );
									user.geniusmathlogicpattern =  content[15].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") ;
									user.geniusmathlogicpercentage = parseFloat(content[13].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").replace(/%2/g," ") );
									user.geniusfinemotorpattern = content[16].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") ;
									user.geniusfinemotorpercentage = parseFloat(content[17].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").replace(/%2/g," "));
									user.geniusfinemotorrank = parseInt(content[19].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",")) ;
									user.geniusgrossmotorpattern = content[20].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") ;
									user.geniusgrossmotorpercentage =parseFloat(content[21].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").replace(/%2/g," "));
									user.geniusgrossmotorrank = parseInt(content[23].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",")) ;
									user.geniusmusicrank = parseInt(content[24].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",")) ;
									user.geniusmusicpattern = content[27].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") ;
									user.geniusmusicpercentage = parseFloat(content[25].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").replace(/%2/g," "));
									user.geniuslanguagelistenrank = parseInt(content[28].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",")) ;
									user.geniuslanguagelistenpattern = content[31].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") ;
									user.geniuslanguagelistenpercentage = parseFloat(content[29].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").replace(/%2/g," "));
									user.geniusobservationpattern = content[32].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") ;
									user.geniusobservationpercentage = parseFloat(content[33].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").replace(/%2/g," "));
									user.geniusobservationrank = parseInt(content[35].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",")) ;
									user.geniusvisualpattern = content[36].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",");
									user.geniusvisualpercentage = parseFloat(content[37].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").replace(/%2/g," "));
									user.geniusvisualrank = parseInt(content[39].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",")) ;
									
									//Fetching Genius's Quotient 
									user.geniuseq = parseFloat(content[40].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").replace(/%2/g," ")) ;
									user.geniusiq = parseFloat(content[41].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").replace(/%2/g," ") );
									user.geniusaq = parseFloat(content[42].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").replace(/%2/g," ") );
									user.geniuscq = parseFloat(content[43].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").replace(/%2/g," ") );
									
									//Fetching Genius's learning style
									user.geniusvisuallearning = parseFloat(content[44].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").replace(/%2/g," ")) ;
									user.geniusauditorylearning = parseFloat(content[45].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").replace(/%2/g," ")) ;
									user.geniuskinestheticlearning = parseFloat(content[46].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").replace(/%2/g," ")) ;
									user.geniuslearningby = content[47].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") ;
									
									//Fetching Genius's Multiple Intelligence Rank
									user.geniusminaturerank = parseInt(content[48].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",") );
									user.geniusmiinterrank = parseInt(content[49].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",")) ;
									user.geniusmiintrarank = parseInt(content[50].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",")) ;
									user.geniusmimusicrank = parseInt(content[51].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",")) ;
									user.geniusmikinestheticrank = parseInt(content[52].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",")) ;
									user.geniusmispatialrank = parseInt(content[53].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",")) ;
									user.geniusmimathrank = parseInt(content[54].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",")) ;
									user.geniusmilanguagerank = parseInt(content[55].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",")) ;
									
									//Fetching Genius's Multiple Intelligence Percentage
									user.geniusmilanguageper = parseFloat(content[56].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").replace(/%2/g," ").substring(0, 6));
									user.geniusmimathper = parseFloat(content[57].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").replace(/%2/g," ").substring(0, 6));
									user.geniusmispatialper = parseFloat(content[58].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").replace(/%2/g," ").substring(0, 6));
									user.geniusmikinestheticper = parseFloat(content[59].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").replace(/%2/g," ").substring(0, 6));
									user.geniusmimusicper = parseFloat(content[60].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").replace(/%2/g," ").substring(0, 6));
									user.geniusmiintraper = parseFloat(content[61].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").replace(/%2/g," ").substring(0, 6));
									user.geniusmiinterper = parseFloat(content[62].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").replace(/%2/g," ").substring(0, 6));
									user.geniusminatureper = parseFloat(content[63].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").replace(/%2/g," ").substring(0, 6));
									
									//Fetching Genius's ATD angles
									user.geniusatdleft = parseInt(content[70].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,","));
									user.geniusatdright = parseInt(content[71].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,","));
									
									//Fetching Genius's Traits -RIASEC
									user.geniusrealistic = parseFloat(content[48].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").replace(/%2/g," ") );
									user.geniusinvestigate = parseFloat(content[49].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").replace(/%2/g," ")) ;
									user.geniusartistic = parseFloat(content[50].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").replace(/%2/g," ")) ;
									user.geniussocial = parseFloat(content[51].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").replace(/%2/g," "));
									user.geniusenterprise = parseFloat(content[52].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").replace(/%2/g," ")) ;
									user.geniusconventional = parseFloat(content[53].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").replace(/%2/g," ")) ;
									
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
											user.geniusocipital = parseFloat(content[82+length].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").replace(/%2/g," ")) ;
											user.geniustemporal = parseFloat(content[83+length].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").replace(/%2/g," "))  ;
											user.geniusparietal = parseFloat(content[84+length].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").replace(/%2/g," "))  ;
											user.geniusfrontal = parseFloat(content[85+length].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").replace(/%2/g," "))  ;
											user.geniusprefrontal = parseFloat(content[86+length].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").replace(/%2/g," "))  ;
											
											//Fetching Genius's Brain details
											user.geniusleftpercentage = parseFloat(content[87+length].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").substring(0, 6).replace(/%2/g," "));
											user.geniusrightpercentage = parseFloat(content[88+length].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").substring(0, 6).replace(/%2/g," "));
											user.geniustfrc = parseFloat(content[89+length].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").substring(0, 6).replace(/%2/g," "));
											user.geniustfrcarc = content[89+length].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").substring(6).replace(/%2/g," ").replace(/B/g,"").replace(/X/g,"");
											user.geniusreflective = parseFloat(content[90+length].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").substring(0, 6).replace(/%2/g," "));
											user.geniusmotive = parseFloat(content[91+length].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").substring(0, 6).replace(/%2/g," "));
											
											//Fetching Genius's STYLE of learning
											user.geniuscognitivestyle = parseFloat(content[92+length].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").substring(0, 6).replace(/%2/g," "));
											user.geniusaffectivestyle = parseFloat(content[93+length].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").substring(0, 6).replace(/%2/g," "));
											user.geniuscriticalstyle = parseFloat(content[94+length].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").substring(0, 6).replace(/%2/g,"%"));
											user.geniusreflectivestyle = parseFloat(content[95+length].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").substring(0, 6).replace(/%2/g," "));
											user.geniuseintegratedstyle =  parseFloat(content[96+length].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,",").substring(0, 6).replace(/%2/g," "));
											
											//Fetching Genius's STYLE of learning
											user.geniusenterprise =  parseFloat(content[97+length].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,","));
											user.geniusconventional =  parseFloat(content[98+length].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,","));
											user.geniussocial = parseFloat(content[99+length].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,","));
											user.geniusartistic =  parseFloat(content[100+length].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,","));
											user.geniusinvestigate =  parseFloat(content[101+length].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,","));
											user.geniusrealistic =  parseFloat(content[102+length].R[0].T.replace(/%2F/g, "/").replace(/%20/g ," ").replace(/%2C/g ,","));
										
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