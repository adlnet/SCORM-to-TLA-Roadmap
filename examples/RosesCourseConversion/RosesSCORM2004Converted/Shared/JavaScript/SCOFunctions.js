// JavaScript Document
/*******************************************************************************
**
** Course functions for the Advanced Distributed Learning
** Sequencing Essentials Content Example (SECE).
** Sharable Content Object Reference Model (SCORM®) 2004 Sequencing.
**
*******************************************************************************/

// Global variables

// Keep track of location in content by div number
var CurrentPage;

/*******************************************************************************
**
** This function asks the LMS if there exists a previous SCO or Asset to go to.
** If a SCO or Asset exists, then the previous button is displayed.
**
** Inputs:  None
**
** Return:  String - "true" if the previous button should be displayed
**                   "false" if failed.
**
*******************************************************************************/
function RenderPreviousButton() {
	var value = retrieveDataValue("adl.nav.request_valid.previous");
	return value;
}

/*******************************************************************************
**
** This function asks the LMS if there exists a next SCO or Asset to continue
** to.  If a SCO or Asset exists, then the continue button is displayed.
**
** Inputs:  None
**
** Return:  String - "true" if the continue button should be displayed
**                   "false" if failed.
**
*******************************************************************************/
function RenderContinueButton() {
	var value = retrieveDataValue("adl.nav.request_valid.continue");
	return value;
}

/*******************************************************************************
**
** This function is used to go to a previous SCO
**
*******************************************************************************/
function PreviousSCO() {
	// we request the previous SCO from the LMS
	storeDataValue( "adl.nav.request", "previous" );
	// we terminate this SCO's communication with the LMS
	terminateCommunication();
}

/*******************************************************************************
**
** This function is used to go to a next SCO
**
*******************************************************************************/
function ContinueSCO() {
	// we request the previous SCO from the LMS
	storeDataValue( "adl.nav.request", "continue" );
	// we terminate this SCO's communication with the LMS
	terminateCommunication();
}

/*******************************************************************************
**
** This function is used to tell the LMS to initiate the communication session
** using the APIWrapper.js file as a pass through.
**
** Inputs:  None
**
** Return:  String - "true" if the initialization was successful, or
**          "false" if the initialization failed.
**
*******************************************************************************/
function Initialize() {
	// make initialize call
	initializeCommunication();

	// set completion status to incomplete
	SetIncomplete();

	// set exit to suspended
	storeDataValue( "cmi.exit","suspend" );

	// check for resumed entry state
	var entryMode = retrieveDataValue( "cmi.entry" );

	// set a local variable to page 1
	var location = 1;

	// check whether resuming SCO
	if (entryMode == "resume") {
		// check if a prior location was set
		location = retrieveDataValue( "cmi.location" );

		// get the Error code from the last call
		var errorCode = retrieveLastErrorCode();

		// if not set or at the last page, go to first page
		if (errorCode == "403"  || location == TotalPages()) {
			location = 1;
		}
	}
	// present page to learner
	DisplayPage( location );
}

/*******************************************************************************
**
** This function is used to get the total number of a
**
** Inputs:  None
**
** Return:  String - total number of divs with the class name "page"
**
*******************************************************************************/
function TotalPages(){
	// initial setup of variables
	var pages = 0
	var divs = document.getElementsByTagName("div");

	for ( var i = 0; i < divs.length; i++ )	{
			if (divs[i].className == "page"){
				pages++;
		}

	}
	return pages;
}


/*******************************************************************************
**
** Makes the appropriate calls for a normal exit calling Terminate
**
** Inputs:  None
**
** Return:  None
**
*******************************************************************************/
function Terminate() {
	terminateCommunication();
}

/*******************************************************************************
**
** Sets the SCO completion status to incomplete.
**
** Inputs:  None
**
** Return:  None
**
*******************************************************************************/
function SetIncomplete (){
	retrieveDataValue( "cmi.completion_status" );
	if (status != "completed"){
		storeDataValue( "cmi.completion_status", "incomplete" );
	}
}

/*******************************************************************************
**
** Sets the SCO completion status to complete.
**
** Inputs:  None
**
** Return:  None
**
*******************************************************************************/
function SetComplete (){
	storeDataValue( "cmi.completion_status", "completed" );
}

/*******************************************************************************
**
** Shows and hides divs to create the appearance of paging through a sco.
**
** Inputs:  Int (or a String formatted as an Int) - div to display
**
** Return:  None
**
*******************************************************************************/
function DisplayPage( pn )
{
	pageNumber = parseInt(pn);
	pinArray = new Array();

	// catch out of range pages

	if (pageNumber <1 || pageNumber > TotalPages()){
		pageNumber = 1;
	}

	//check and stop flash

	if (SwfLoaded(document["swf" + CurrentPage ])) {
	    document["swf" + CurrentPage ].GotoFrame(1);
	}

	// set location value for bookmark
	storeDataValue( "cmi.location", pageNumber ) ;

	var divs = document.getElementsByTagName("div");

	for ( var i = 0; i < divs.length; i++ )	{
		var div = divs[i];
		var id = div.id;
		var className = div.className;

		if ( className == "page" ){
			if ( id == "p" + pageNumber ){
				// show requested page
				div.style.visibility = "visible";
			}
			else {
				// hide other pages
				div.style.visibility = "hidden";
			}
		}

	}

	// set completion status to completed when the user hits the last page
	// check whether to display continue button at end of sco for navigation to next sco
	if ( pageNumber == TotalPages() ) {

		SetComplete();

		if ( RenderContinueButton() != "true") {
			document.getElementById("nextBtn").style.visibility = "hidden";
		}
	}
	else{
		document.getElementById("nextBtn").style.visibility = "visible";
	}

	// check whether to display previous button at beginning of sco for navigation to previous sco
	if ( pageNumber == 1 ) {
		if ( RenderPreviousButton() != "true") {
			document.getElementById("previousBtn").style.visibility = "hidden";
		}
	}
	else{
		document.getElementById("previousBtn").style.visibility = "visible";
	}

	// check and start flash
	if (SwfLoaded(document["swf" + pageNumber])) {
	    document["swf" + pageNumber].Play();
 	}

	// set global page
	CurrentPage = pageNumber;

}


/*******************************************************************************
**
** Navigation button continue function. Handles page to page and sco to sco navigation.
** (Buttons are hidden when sco to sco navigtion is not allowed.)
**
** Inputs:  None
**
** Return:  None
**
*******************************************************************************/
function NextPage() {
	if (CurrentPage+1 <= TotalPages()){
		DisplayPage( CurrentPage + 1 )
	}
	else{
		ContinueSCO();
	}
}

/*******************************************************************************
**
** Navigation button previous function. Handles page to page and sco to sco navigation.
** (Buttons are hidden when sco to sco navigtion is not allowed.)
**
** Inputs:  None
**
** Return:  None
**
*******************************************************************************/
function PreviousPage() {
	if (CurrentPage-1 >= 1){
		DisplayPage( CurrentPage - 1 )
	}
	else{
		PreviousSCO();
	}
}

/*******************************************************************************
**
** Checks if Flash object is finished loading.
**
** Inputs:  Object - DOM Reference
**
** Return:  Boolean
**
*******************************************************************************/
function SwfLoaded (swfRef) {
  if (typeof(swfRef) != "undefined") {
    return swfRef.PercentLoaded() == 100;
  } else {
    return false;
  }
}

/*******************************************************************************
**
** Hides and shows a div on a page.
**
** Inputs:  Object - DOM Reference
**
** Return:  Void
**
*******************************************************************************/
function AdditionalInfo(divId)
{
	var divs = document.getElementsByTagName("div");
		for ( var i = 0; i < divs.length; i++ )	{
			var div = divs[i];
			var id = div.id;
			var className = div.className;

			if ( className == "optionalElement" || className == "requiredElement" ){
				if ( id == divId ){
					// show requested page
					if(	div.style.display == "block"){
						// close page if already open
						div.style.display = "none";
					}
					else {
						div.style.display  = "block";
					}
				}
				else {
					// hide other pages
					var checkPin = searchArray(pinArray, div.id, 0);
					if (checkPin == 0){
						div.style.display = "none";
					}
				}
			}

	}
}

function TogglePin(divId)
{
	var pinValue = searchArray(pinArray, divId, 1);
	if (pinValue == 0){
		pinArray.push(divId);
		//change the pin image
		document[divId + "_img"].src="../Shared Files/images/pinned.png";
	}
}

function searchArray(thearray, value, delPin){
	var isfound=false;
	for (var pinCount = 0; pinCount < thearray.length; pinCount++ ){
		if (thearray[pinCount]==value){
			isfound=true;
			if (delPin == true){
				thearray.splice(pinCount,1); //delete this element from array
				thearray.sort();
				//change the back to unpinned image
				document[value + "_img"].src="../Shared Files/images/unpinned.png";
			}
			break;
		}
	}
	return isfound;
}


/*******************************************************************************
********************************************************************************
**
**		REVIEW TOOL FUNCTIONS - REMOVE FOR FINAL DELIVERY
**
** Opens comment local comment page with the url encoded string for the current
** sco and page
**
** Inputs: String - SCO Name
**
** Returns: void
**
********************************************************************************
*******************************************************************************/

function postReview(currentSco){
	localCommentsPath = "../Shared%20Files/Review%20Tool/comments.html";

	if(currentSco != null){
		if(!CurrentPage){
		  cp = ""
		} else {
		  cp = "_" + CurrentPage;
		}

		var path = localCommentsPath + "?currentPage=" + currentSco + cp;
		reviewWindow = window.open(path, "ReviewTool", "toolbar=0, location=0, directories=0, status=0, menubar=0, resizable=1, scrollbars=1, width=700, height=500");
		reviewWindow.focus();
	}
}