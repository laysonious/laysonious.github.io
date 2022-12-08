$(document).ready(function() {
    
    $(".table-container").on("click", ".increase", addScore);
    $(".table-container").on("click", ".decrease", addScore);
    $(".previous-container").on("click", ".next-quarter", nextQuarter);
    $(".previous-container").on("click", ".previous-quarter", previousQuarter);
    $(document).on("click", "#reset-btn", reset);
    $(document).on("click", "#submit", submit);
    
    
    
    function addScore(){   

        var currentQuarter = $(".quarter").text();
        if (currentQuarter == "Done") {
            alert("Game is over!")
            return
        }
        var button = $(this);
        var display = $(button).siblings(".score-display");
        var oldVal = $(display).text();
        if (this.classList.contains("increase")) {
          var modification = 1
        }
        else {
          var modification = -1
        }
        var newVal = parseFloat(oldVal) + modification;
        if (newVal < 0) {
          newVal = 0
        }
        $(display).text(newVal);
        if (this.classList.contains("teamA")) {
          tableOpen = "teamAtable"
        }
        else {
          tableOpen = "teamBtable"
        }
        var myTable = document.getElementById(tableOpen)
        if (this.classList.contains("fg")) {
          var rowNum = 1
          var multiplier = 2
        }
        if (this.classList.contains("tp")) {
          var rowNum = 2
          var multiplier = 3
        }
       if (this.classList.contains("ft")) {
          var rowNum = 3
          var multiplier = 1
        }
        if (this.classList.contains("foul")) {
          var rowNum = 6
          var multiplier = 1
        }
        myTable.rows[rowNum].cells[currentQuarter].innerHTML = newVal;
        myTable.rows[rowNum].cells[5].innerHTML = (parseFloat(myTable.rows[rowNum].cells[1].innerHTML) + parseFloat(myTable.rows[rowNum].cells[2].innerHTML) + parseFloat(myTable.rows[rowNum].cells[3].innerHTML) + parseFloat(myTable.rows[rowNum].cells[4].innerHTML)) * multiplier
      
       myTable.rows[4].cells[currentQuarter].innerHTML =           parseFloat(myTable.rows[1].cells[currentQuarter].innerHTML) * 2 +   
parseFloat(myTable.rows[2].cells[currentQuarter].innerHTML) * 3 + 
parseFloat(myTable.rows[3].cells[currentQuarter].innerHTML)
      
        var total = parseFloat(myTable.rows[1].cells[5].innerHTML) + parseFloat(myTable.rows[2].cells[5].innerHTML) + parseFloat(myTable.rows[3].cells[5].innerHTML)
        myTable.rows[4].cells[5].innerHTML = total;
        if (this.classList.contains("teamA")) {
           $(".homeScore").text(total);
        }
        else {
          $(".visitorScore").text(total);
        }
        var display = $(button).parents(".player-container").find("h2");
        $(display).text(total)
}
 
   
    function reset(){
        $(".score-display-main").text(0);
        $(".score-display").text(0);
        $(".quarter").text(1);
        resetTable("teamAtable");
        resetTable("teamBtable");
    }  
    
  function resetTable(table) {
        var myTable = document.getElementById(table);
        var i;
        var j;
        for (i=1; i<myTable.rows.length ; i++){
          if (i == 5) {continue;}
          for (j=1; j<myTable.rows[0].cells.length; j++) {
            myTable.rows[i].cells[j].innerHTML = "0";
          }
        }
     }
    
    function nextQuarter(){
        var oldVal = document.getElementsByClassName("quarter")[0].innerHTML;
        if (oldVal == "Done") {
          alert('Game is complete');
        }
        else {
          var newVal = parseFloat(oldVal) + 1;
          if (newVal > 4) {
            $(".quarter").text("Done");
            $(".score-display").text(0);
            return;
          }
          $(".quarter").text(newVal);
          updateQuarterStats(newVal);
        }
    } 
 
    function previousQuarter(){
        var oldVal = document.getElementsByClassName("quarter")[0].innerHTML;
        if (oldVal == "Done") {
          var newVal = 4;
        }
        else {
          var newVal = parseFloat(oldVal) - 1;
        }
        if (newVal < 1) {
          newVal = 1;
          alert("Already on 1st Quarter");
          return;
        }
        $(".quarter").text(newVal);
        updateQuarterStats(newVal);
    }
  
    function updateQuarterStats(newVal){
       
        updateQuarterSide("teamA", 1, newVal);
        updateQuarterSide("teamB", 2, newVal);
    }
    
    function updateQuarterSide(team, rownum, newVal) {
        var table = team + "table";
        var myTable = document.getElementById(table);
        classname = team + " fieldgoals";
        var a = document.getElementsByClassName(classname)[0].getElementsByClassName('score-display');
        newValue = myTable.rows[1].cells[newVal].innerHTML;
        $(a).text(newValue);
        classname = team + " threepointers";
        var a = document.getElementsByClassName(classname)[0].getElementsByClassName('score-display');
        newValue = myTable.rows[2].cells[newVal].innerHTML;
        $(a).text(newValue);
        classname = team + " freethrows";
        var a = document.getElementsByClassName(classname)[0].getElementsByClassName('score-display');
        newValue = myTable.rows[3].cells[newVal].innerHTML;
        $(a).text(newValue);
        classname = team + " fouls";
        var a = document.getElementsByClassName(classname)[0].getElementsByClassName('score-display');
        newValue = myTable.rows[rownum].cells[newVal].innerHTML;
        $(a).text(newValue);
    }
  
  
  
  function submit() {
    var homeTeam = document.getElementsByClassName("homeTeam")[0].innerHTML;
    var visitorTeam = document.getElementsByClassName("visitorTeam")[0].innerHTML;
    var year = document.getElementsByClassName("year")[0].innerHTML;
    var game = new Object();
    game["year"] = year;
    game["home"] = homeTeam;
    game["visitor"] = visitorTeam;
    var myTable = document.getElementById("foulTable");
    game["foulFirstHome"] = myTable.rows[1].cells[1].innerHTML;
    game["foulSecondHome"] = myTable.rows[1].cells[2].innerHTML;
    game["foulThirdHome"] = myTable.rows[1].cells[3].innerHTML;
    game["foulFourthHome"] = myTable.rows[1].cells[4].innerHTML;
    game["foulFirstVisitor"] = myTable.rows[2].cells[1].innerHTML;
    game["foulSecondVisitor"] = myTable.rows[2].cells[2].innerHTML;
    game["foulThirdVisitor"] = myTable.rows[2].cells[3].innerHTML;
    game["foulFourthVisitor"] = myTable.rows[2].cells[4].innerHTML;
    var myTable = document.getElementById("teamAtable");
    game["fieldFirstHome"] = myTable.rows[1].cells[1].innerHTML;
    game["fieldSecondHome"] = myTable.rows[1].cells[2].innerHTML;
    game["fieldThirdHome"] = myTable.rows[1].cells[3].innerHTML;
    game["fieldFourthHome"] = myTable.rows[1].cells[4].innerHTML;
    game["threeFirstHome"] = myTable.rows[2].cells[1].innerHTML;
    game["threeSecondHome"] = myTable.rows[2].cells[2].innerHTML;
    game["threeThirdHome"] = myTable.rows[2].cells[3].innerHTML;
    game["threeFourthHome"] = myTable.rows[2].cells[4].innerHTML;
    game["freeFirstHome"] = myTable.rows[3].cells[1].innerHTML;
    game["freeSecondHome"] = myTable.rows[3].cells[2].innerHTML;
    game["freeThirdHome"] = myTable.rows[3].cells[3].innerHTML;
    game["freeFourthHome"] = myTable.rows[3].cells[4].innerHTML;
    var myTable = document.getElementById("teamBtable");
    game["fieldFirstVisitor"] = myTable.rows[1].cells[1].innerHTML;
    game["fieldSecondVisitor"] = myTable.rows[1].cells[2].innerHTML;
    game["fieldThirdVisitor"] = myTable.rows[1].cells[3].innerHTML;
    game["fieldFourthVisitor"] = myTable.rows[1].cells[4].innerHTML;
    game["threeFirstVisitor"] = myTable.rows[2].cells[1].innerHTML;
    game["threeSecondVisitor"] = myTable.rows[2].cells[2].innerHTML;
    game["threeThirdVisitor"] = myTable.rows[2].cells[3].innerHTML;
    game["threeFourthVisitor"] = myTable.rows[2].cells[4].innerHTML;
    game["freeFirstVisitor"] = myTable.rows[3].cells[1].innerHTML;
    game["freeSecondVisitor"] = myTable.rows[3].cells[2].innerHTML;
    game["freeThirdVisitor"] = myTable.rows[3].cells[3].innerHTML;
    game["freeFourthVisitor"] = myTable.rows[3].cells[4].innerHTML;
    game["gameID"] = ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
    var jsonString= JSON.stringify(game);
    alert(jsonString);
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://127.0.0.1:2096/services/collector", true);
    xhttp.setRequestHeader("Authorization", "5d73ac98-f4bd-4730-9402-c052efea4e7a");
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.send(JSON.stringify({"event": "THE STRING YOU WANT TO SEND"}));
  }
  
  // Get the URL & Params, Break them Down
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,    
    function(m,key,value) {
      vars[key] = value;
    });
    return vars;
  }
  
 

// Get just the event param
var home_ENC = getUrlVars()["home"];
var visitor_ENC = getUrlVars()["visitor"]
var year_ENC = getUrlVars()["year"]

// Decode the URI to Plaintext Chars
var home = decodeURI(home_ENC);
var visitor = decodeURI(visitor_ENC);
var year = decodeURI(year_ENC);
                    
$(".homeTeam").text(home);
$(".visitorTeam").text(visitor);
$(".year").text(year);
$(".homeTeamSub").text(home.split(" ").pop());
$(".visitorTeamSub").text(visitor.split(" ").pop());


});




