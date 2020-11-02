$(document).ready(function () {
    
  //Use moment.js to display date on screen
  var m = moment();
  $("#currentDay").text(m.format("dddd, MMMM Do"));

  //Function to generate timeblock
  function setTimeBlock() {
    for (var i = 0; i < 9; i++) {
      //Create a variable named "newRow" equal to $("<div>") and add the classes "row" and "time-block"
      var newRow = $("<div>").addClass("row time-block");

      var time = ["9", "10", "11", "12", "13", "14", "15", "16", "17"];

      //Give each "variable a text equal to "time[i]".
      var displayTime = $("<h5>").addClass("hour");
      if (time[i] < 10) {
        displayTime.text("0" + time[i] + ":00");
      } else {
        displayTime.text(time[i] + ":00");
      }

      //Append displayTime to timeCol
      var timeCol = $("<div>").addClass("col-1").append(displayTime);

      var eventCol = $("<textarea>").addClass("col-10");

      //Give each "eventCol" a data-attribute called "data-time"
      eventCol.attr("data-time", time[i]);

      //insert setBackground function

      //Append save icon to saveBtnCol
      var saveBtnCol = $("<div>")
        .addClass("col-1 saveBtn")
        .append('<i class="far fa-save"></i>');

      //Append timeCol, eventCol, saveBtnCol to newRow
      newRow.append(timeCol, eventCol, saveBtnCol);

      //Append newRow to container
      $(".container").append(newRow);
    }
  }

  setTimeBlock();

  //Function to change background color of input event text area
  //     function setBackgroundColor(){
  //         var currentTime = m.format("H");
  //         return time[i];
  // }
  //     console.log(setBackgroundColor());
});

//   //Create an "on-click" event attached to the ".saveBtn" class.
//   $('.saveBtn').on("click", function() {
//     console.log("clicked");
//   })
