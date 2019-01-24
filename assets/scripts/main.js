$(document).ready(function () {
  var playlistSelection = {
    best90s : [ "90's Best","PL5QA6aplcJ88GE47o2YEN35jKBX5R7Zyc"],
    pop : ["Pop", "PLChOO_ZAB22UB3y-qFBmFi_dk0tQhbn5C"],
    bestWorkout : ["Best Workout!","PLnZGnqvPbb9Pw_51eEx5ud1dhF4DrKjXV"],
    hipHop : ["Hip Hop","PLn3mS0NtJwSpOFcj8Gg2SMTUwXcsgoVeM"],
    superSaiyan : ["Super Saiyan!","PLe8RKAkuBycdBz-e0-JJXU2DNsgCuXyi0"],
    heavyRock : ["Heavy Rock","PLYfS6Plko3T4Xqjlu9Q-kVB2FQcobDk5u"]
  };
  var config = {
    apiKey: "AIzaSyBQvk3ZKGc9LMbus4Ma39xV_NPobuQOu0o",
    authDomain: "workout-app-4ece3.firebaseapp.com",
    databaseURL: "https://workout-app-4ece3.firebaseio.com",
    projectId: "workout-app-4ece3",
    storageBucket: "workout-app-4ece3.appspot.com",
    messagingSenderId: "1003379802026"
  };
  
  firebase.initializeApp(config);
  var database = firebase.database();
  var workout;
  if (localStorage.getItem("userID") === null) {
    window.location.href = "https://schmitzaddie.github.io/workout-app/";
} else {
    var userInfo = database.ref("users/" + localStorage.getItem("userID")+"/workout");
    userInfo.once('value', function (snapshot) {
        workout = snapshot.val();
        $.each(workout, function(i,v){
          $("#currentWorkout").append(i, v);
        });
    });
};
  var sounds = ["sound1", "sound2", "sound3", "sound4", "sound5", "sound6", "sound7", "sound8", "sound9"];
  document.getElementById("inspo").onclick = function (){
    var index = Math.floor(Math.random() * sounds.length);
    var id = sounds[index];
    var audioElement = document.getElementById(id);
    audioElement.pause();
    audioElement.play();
}
  
  $.each(playlistSelection, function(i,val){
    btn = $("<button class='btn btn-primary'>");
    btn.text(val[0]);
    btn.attr("id",i);
    btn.css("width","175px");
    $(btn).click(function(){
      newPlaylist(playlistSelection[this.id][1]);
    });
    $("#playlistButtons").append(btn);
  });


  $("#dropbtn").click(function () {
    // wrkOutDetails
  });

  $("#pause").on("click", stop);
  $("#stop").on("click", reset);
  $("#play").on("click", start);

  var intervalId;
  var clockRunning = false;
  var time = 5*60;


  function reset() {
    time = 5*60;
  }

  function start() {
    if (!clockRunning) {
      intervalId = setInterval(count, 1000);
      clockRunning = true;
    }
  }

  function stop() {
    clearInterval(intervalId);
    clockRunning = false;
  }

  function count() {

    // DONE: increment time by 1,
    if (!time == 1) {
      time == 1;
    } else {
      time--;
    }
    var converted = timeConverter(time);
    $("#display").text(converted);
  }
  function timeConverter(t) {

    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes === 0) {
      minutes = "00";
    }
    else if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
  }
  $("#subRec").on("click", function (event) {
    console.log("test")
    //no button reset
    event.preventDefault();
    //creating variables for each value//
    workoutSummery = {
      sets : $("#setInput").val().trim(),
      reps : $("#repInput").val().trim(),
      weight : $("#weightInput").val().trim()

    }

  
    database.ref("users/" + localStorage.getItem("userID")).update(workoutSummery);
  
  });
<<<<<<< HEAD
}
// var mGroup = {};
    

// varQueryURL = "https://wger.de/api/v2/exercisecategory/?format=json"
// $('#helpMeModal').on('click', function () {
//   API_KEY = "79b9f9a7451896388ccd98b0e512c33ea8d732c4";
//   $.ajax({
//     url: varQueryURL,
//     method: "GET",
//     headers: {
//       "Authorization": "Token " + API_KEY
//     }
//   }).then(function (response) {
//     for (var i = 0; i < response.count; i++) {
//       mGroup[response.results[i].name] = response.results[i].id;
//     };
//     $.each(mGroup, function (index, value) {
//       exerciseURL = "https://wger.de/api/v2/exercise/?category=" + value + "&language=2&license_author=wger.de&format=json";
//       newBtn = $("<button>");
//       newBtn.attr("data-url", exerciseURL);
//       newBtn.text(index);
//       newBtn.attr("id", index.toLowerCase());
//       $(newBtn).click(function () {
//         newQuery($(this).attr("data-url"));
//       });
//       $("#buttons").append(newBtn);
//     });
//   });
//   var newQuery = function (varQueryURL) {
//     API_KEY = "79b9f9a7451896388ccd98b0e512c33ea8d732c4";
//     $.ajax({
//       url: varQueryURL,
//       method: "GET",
//       headers: {
//         "Authorization": "Token " + API_KEY
//       }
//     }).then(function (response) {{

//       var mSubGroup = {};
//     for (var j = 0; j < response.count; j++) {
//       mSubGroup[response.results[j].name] = response.results[j].id;
//     };
//     $.each(mSubGroup, function (index, value) {
//       exerciseURL = "https://wger.de/api/v2/exercise/?category=" + value + "&language=2&license_author=wger.de&format=json";
//       newBtn = $("<button>");
//       newBtn.attr("data-url", exerciseURL);
//       newBtn.text(index);
//       newBtn.attr("id", index.toLowerCase());
//       $(newBtn).click(function () {
//         newQuery($(this).attr("data-url"));
//       });
//       $("#buttons").append(newBtn);
//     });
//   };
  
  
//       console.log(response)
//     });
//   }

// });
// //imgUrl = "https://wger.de/api/v2/exerciseimage/"
=======
  var newPlaylist = function (playlistID) {
    $("#selectPlaylist").empty()
    skip = $("<div id='skip' class='skip timer zmdi zmdi-skip-next col-md-3'>");
    prev = $("<div id='prev' class='skip timer zmdi zmdi-skip-previous col-md-3'>");
    $("#selectPlaylist").append(prev, skip);
    $(".skip").click( function() {
      if (this.id == "skip") {
        currentItem++;
      } else {
        currentItem--;
      };
      vidURL = "https://www.youtube.com/embed/" + youtubePlaylist.items[currentItem].contentDetails.videoId;
      $("#ytplayer").attr("src", vidURL);
    });
    var queryURL =  "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=25&playlistId="
                    +playlistID+
                    "&key=AIzaSyCsAsCrQMs8kHpHEwtFqArNXzRZSqJ5kg8";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      currentItem = 0
      youtubePlaylist = response;
      vidURL = "https://www.youtube.com/embed/" + response.items[currentItem].contentDetails.videoId;
      $("#ytplayer").attr("src", vidURL);
    });
  }

});
>>>>>>> 10d4bc3a002fd8675b601b3a693af17aff509e4a
