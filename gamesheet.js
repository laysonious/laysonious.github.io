$(document).ready(function() {
    
    $(".player-container").on("click", ".increase", addScore);
    $(".player-container").on("click", ".decrease", addScore);
    $(".player-container").on("click", ".increase-foul", addFoul);
    $(".player-container").on("click", ".decrease-foul", addFoul);
    $(".player-container").on("click", ".increase-shootout", addShootOut);
    $(".player-container").on("click", ".decrease-shootout", addShootOut);
    $(".player-container").on("click", ".next-quarter", nextQuarter);
    $(".player-container").on("click", ".previous-quarter", previousQuarter);
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
        myTable.rows[rowNum].cells[currentQuarter].innerHTML = newVal;
        myTable.rows[rowNum].cells[5].innerHTML = (parseFloat(myTable.rows[rowNum].cells[1].innerHTML) + parseFloat(myTable.rows[rowNum].cells[2].innerHTML) + parseFloat(myTable.rows[rowNum].cells[3].innerHTML) + parseFloat(myTable.rows[rowNum].cells[4].innerHTML)) * multiplier
      
       myTable.rows[4].cells[currentQuarter].innerHTML =           parseFloat(myTable.rows[1].cells[currentQuarter].innerHTML) * 2 +   
parseFloat(myTable.rows[2].cells[currentQuarter].innerHTML) * 3 + 
parseFloat(myTable.rows[3].cells[currentQuarter].innerHTML)
      
        var total = parseFloat(myTable.rows[1].cells[5].innerHTML) + parseFloat(myTable.rows[2].cells[5].innerHTML) + parseFloat(myTable.rows[3].cells[5].innerHTML)
        myTable.rows[4].cells[5].innerHTML = total
        var display = $(button).parents(".player-container").find("h2");
        $(display).text(total)
    }
  

    function addFoul(){
        var currentQuarter = $(".quarter").text();
        if (currentQuarter == "Done") {
            alert("Game is over!")
            return
       }
       if (this.classList.contains("increase-foul")) {
          var modification = 1
        }
        else {
          var modification = -1
        }
        var button = $(this);
        var display = $(button).parents(".fouls").find("h3");
        var oldVal = $(display).text();
        var newVal = parseFloat(oldVal) + modification;
        if (newVal < 0) {
          newVal = 0
        }
        $(display).text(newVal);
        var myTable = document.getElementById("foulTable")
        if (this.classList.contains("teamA")) {
          team = 1;
        }
        else {
          team = 2;
        }
        myTable.rows[team].cells[currentQuarter].innerHTML = newVal
        myTable.rows[team].cells[5].innerHTML = parseFloat(myTable.rows[team].cells[1].innerHTML) + parseFloat(myTable.rows[team].cells[2].innerHTML) + parseFloat(myTable.rows[team].cells[3].innerHTML) + parseFloat(myTable.rows[team].cells[4].innerHTML)
    }
    
    function addShootOut(){
        var currentQuarter = $(".quarter").text();
        if (currentQuarter != "Done") {
            alert("Game is still in progress, finish the quarters to score the shoot-out")
            return
       }
       if (this.classList.contains("increase-shootout")) {
          var modification = 1
        }
        else {
          var modification = -1
        }
        var button = $(this);
        var display = $(button).parents(".shootout").find("h3");
        var oldVal = $(display).text();
        var newVal = parseFloat(oldVal) + modification;
        if (newVal < 0) {
          newVal = 0
        }
        $(display).text(newVal);
        if (this.classList.contains("teamA")) {
          tableOpen = "shootout teamB"
        }
        else {
          tableOpen = "shootout teamA"
        }
        var otherShootOut = document.getElementById(tableOpen);
        var otherShootOutNumber = $(display).find("h3");
        var otherShootOutValue = $(otherShootOutNumber).text();
        if (otherShootOutValue > newvVal {
            alert("Other Team")
        }
        if (newval > otherShootOutValue) {
            alert("This Team")
        }
    
        
        
        
     //   var myTable = document.getElementById(tableOpen)
     //   myTable.rows[4].cells[5].innerHTML = parseFloat(myTable.rows[team].cells[1].innerHTML)
        //var myTable = document.getElementById("foulTable")
        //if (this.classList.contains("teamA")) {
        //  team = 1;
        //}
        //else {
         // team = 2;
        //}
        //myTable.rows[team].cells[currentQuarter].innerHTML = newVal
        //myTable.rows[team].cells[5].innerHTML = parseFloat(myTable.rows[team].cells[1].innerHTML) + parseFloat(myTable.rows[team].cells[2].innerHTML) + parseFloat(myTable.rows[team].cells[3].innerHTML) + parseFloat(myTable.rows[team].cells[4].innerHTML)
    }
 
   
    function reset(){
        $(".score-display-main").text(0);
        $(".score-display").text(0);
        $(".quarter").text(1);
        resetTable("foulTable")
        resetTable("teamAtable")
        resetTable("teamBtable")
    }  
     function resetTable(table) {
        var myTable = document.getElementById(table);
        var i;
        var j;
        for (i=1; i<myTable.rows.length ; i++){
          for (j=1; j<myTable.rows[0].cells.length; j++) {
            myTable.rows[i].cells[j].innerHTML = "0";
          }
        }
     }
    
    function nextQuarter(){
        var button = $(this);
        var display = $(button).parents(".player-container").find("p");
        var oldVal = $(display).text();
        if (oldVal == "Done") {
          alert('Game is complete');
        }
        else {
          var newVal = parseFloat(oldVal) + 1;
          if (newVal > 4) {
            $(display).text("Done");
            $(".score-display").text(0);
            return;
          }
          $(display).text(newVal);
          updateQuarterStats(newVal)
        }
    } 
 
    function previousQuarter(){
        var button = $(this);
        var display = $(button).parents(".player-container").find("p");
        var oldVal = $(display).text();
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
        $(display).text(newVal);
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
        var myTable = document.getElementById("foulTable");
        classname = team + " fouls";
        var a = document.getElementsByClassName(classname)[0].getElementsByClassName('score-display');
        newValue = myTable.rows[rownum].cells[newVal].innerHTML;
        $(a).text(newValue);
    }
  
  
  
  function submit() {
    var homeTeam = document.getElementsByClassName("homeTeam")[0].innerHTML;
    var visitorTeam = document.getElementsByClassName("visitorTeam")[0].innerHTML;
    var tournamentID = new Date().getFullYear();
    var game = new Object();
    game["tournamentID"] = tournamentID;
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
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));

   
    var jsonString= JSON.stringify(game);
    
    let xhr = new XMLHttpRequest();
    xhr.open("POST","https://usebasin.com/f/f25fbe63cc49",true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(jsonString);
    alert("Game info has been submitted");



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

// Decode the URI to Plaintext Chars
var home = decodeURI(home_ENC);
var visitor = decodeURI(visitor_ENC);
                    
$(".homeTeam").text(home);
$(".visitorTeam").text(visitor);
$(".homeTeamSub").text(home.split(" ").pop());
$(".visitorTeamSub").text(visitor.split(" ").pop());



    
});




