/* ****Code for the Summoner look up function using JSON****  */
/* Begin Inital function declaration  */
$document.ready(function(){
    function summonerLookUp(){

    /* Initialises and sets the value of SUMMONER_NAME to equal a blank string  */    
    var SUMMONER_NAME="";

    /*Sets the summoner name = to what the API throws back      */
    SUMMONER_NAME = $("#summoner").val();

    /*If the summoner name is valid and thus retrieved, then this function executes */
    if(SUMMONER_NAME !== ""){

    /* Use the dollar sign dot notation with ajax to start running an ajax script */    
    $.ajax({

    /* This is the API request algorithm - asks the api for a particular function and returns the information */    
    url:
    'https://euw.api.pvp.net/api/lol/euw/v1.4/summoner/by-name/'+ SUMMONER_NAME + '?api_key=c53b69b4-e95f-491a-a79c-e8d8b34ab98f',
    type: 'GET', /* Tells the script that this aims to 'retrieve' information  */
    dataType:'json', /* Specify the data returned is JSON   */
    data: {

    },

    /* If the script running is succcessful then this code block will execute */    
    success:
    function(json){

    /* When the summoner name is entered without spaces -> inserts spaces into the string   */    
    var SUMMONER_NAME_NOSPACES = SUMMONER_NAME.replace("","");
    SUMMONER_NAME_NOSPACES = SUMMONER_NAME_NOSPACES.toLowerCase().trim();

    /* Initialises All values to be used in the search function - var = json[summname].valinapi    */    
    summonerLevel=json[SUMMONER_NAME_NOSPACES].summonerLevel;
    summonerID=json[SUMMONER_NAME_NOSPACES].id;
    summonerName=json[SUMMONER_NAME_NOSPACES].name;

    /* Retrieves the values in the data given by riot and sets it equal to the previously initialised variables   */    
    document.getElementById("name").innerHTML = summonerName;
    document.getElementById("sLevel").innerHTML = summonerLevel;
    document.getElementById("sID").innerHTML = summonerID;

    /* Calls the functions later declared in the script - List all the other functions to be called below! */    
    getMasteries(summonerID);
    getRunes(summonerID);

    },

    /* If Script is unsuccessful -> error is thrown  */    
    error:
    function(XMLHttpRequest,textStatus, errorThrown)
    {
    /* Send useful error message to user*/
    alert("error getting Summoner data! - Did you enter the name correctly?");

    }

    });
    } else {}
    }

    /* GetMasteries function below */
    function getMasteries(summonerID){
    $.ajax({
      url:
      'https://euw.api.pvp.net/api/lol/euw/v1.4/summoner/'+ summonerID + '/masteries?api_key=c53b69b4-e95f-491a-a79c-e8d8b34ab98f',
      type: 'GET',
      dataType: 'json',
      data: {

      },
        /*function(resp) as it isn't the primary function in the script */
      success: function(resp){
        numberOfPages = resp[summonerID].pages.length;

        document.getElementById("masteryPageCount").innerHTML=
        numberOfPages;
        resp[summonerID].pages.forEach(function (item){
          document.getElementById("masteryPagesAll").innerHTML =
          document.getElementById("masteryPagesAll").innerHTML +
          item.name + "<br />";

        });

      },
      error: function(XMLHttpRequest, textStatus, errorThrown){
      alert("error getting summoner data 2!");
      }



    });

    }

    function getRunes(summonerID){
      $.ajax({
        url: 'https://euw.api.pvp.net/api/lol/euw/v1.4/summoner/'+ summonerID + '/runes?api_key=c53b69b4-e95f-491a-a79c-e8d8b34ab98f',
        type: 'GET',
        dataType: 'json',
        data: {
        },
        success: function(resp){
          numberOfRPages = resp[summonerID].pages.length;
          document.getElementById("runePageCount").innerHTML=numberOfRPages;
          resp[summonerID].pages.forEach(function(item){
            document.getElementById("runePagesAll").innerHTML =
            document.getElementById("runePagesAll").innerHTML +
            item.name + "<br />";
      });
    },
    error: function(XMLHttpRequest, textStatus, errorThrown){
    alert("error getting summoner data 3!");
    }
    });
    }
});