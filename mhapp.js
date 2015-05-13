function summonerLookUp(){
var SUMMONER_NAME="";
SUMMONER_NAME = $("#summoner").val();

if(SUMMONER_NAME !== ""){
$.ajax({
url:
'https://euw.api.pvp.net/api/lol/euw/v1.4/summoner/by-name/'+ SUMMONER_NAME + '?api_key=c53b69b4-e95f-491a-a79c-e8d8b34ab98f',
type: 'GET',
dataType:'json',
data: {

},
success:
function(json){
var SUMMONER_NAME_NOSPACES = SUMMONER_NAME.replace("","");
SUMMONER_NAME_NOSPACES = SUMMONER_NAME_NOSPACES.toLowerCase().trim();

summonerLevel=json[SUMMONER_NAME_NOSPACES].summonerLevel;
summonerID=json[SUMMONER_NAME_NOSPACES].id;
summonerName=json[SUMMONER_NAME_NOSPACES].name;
document.getElementById("name").innerHTML = summonerName;
document.getElementById("sLevel").innerHTML = summonerLevel;
document.getElementById("sID").innerHTML = summonerID;
//getMasteries(summonerID);
//getRunes(summonerID);
getMatchHistory(summonerID);



},
error:
function(XMLHttpRequest,textStatus, errorThrown)
{
alert("error getting Summoner data!");

}

});
} else {}
}


function getMatchHistory(summonerID){
$.ajax({
  url:
  'https://euw.api.pvp.net/api/lol/euw/v2.2/matchhistory/'+ summonerID + '?rankedQueues=RANKED_SOLO_5X5&api_key=c53b69b4-e95f-491a-a79c-e8d8b34ab98f',
  type: 'GET',
  dataType: 'json',
  data: {

  },
  success: function(resp){

    Region12 = resp[summonerID].matches.length;
    document.getElementById("region1").innerHTML=
    Region12;
    resp[summonerID].matches.forEach(function (item){
      document.getElementById("regionAll").innerHTML =
      document.getElementById("regionAll").innerHTML +
      item.name + "<br />";

    });
},
  error: function(XMLHttpRequest, textStatus, errorThrown){
  alert("error getting summoner data 2!");
  }



});
}
