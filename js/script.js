$(document).ready(function () {
  var text_hour = 9;
  var timeSuffix = ":00am";

  var storedBlocks = [];
  var storedBlocks_NAME = "Stored Blocks";

  //Use moment.js to display date on screen
  var m = moment();
  $("#currentDay").text(m.format("dddd, MMMM Do"));

  //Function to change background color of time-block depending on hour of the day
  function setBackground(eventCol, currentTime, showTime)
{
    var iTime_CUR = currentTime.split("");
    var iTime_TXT = showTime.split("");

    if(iTime_CUR[iTime_CUR.length - 2] !== iTime_TXT[iTime_TXT.length - 2])
    {
        if(iTime_CUR[iTime_CUR.length - 2] > iTime_TXT[iTime_TXT.length - 2])
        {
            eventCol.addClass("past");
        }
        else
        {
            eventCol.addClass("future");
        }
    }
    else
    {
        var t_CUR = parseHour(iTime_CUR);
        var t_TXT = parseHour(iTime_TXT);

        if(parseInt(t_CUR) > parseInt(t_TXT))
        {
            eventCol.addClass("past");
        }
        else if(parseInt(t_CUR) < parseInt(t_TXT))
        {
            if(parseInt(t_TXT) === 12)
            {
                eventCol.addClass("past");
            }
            else
            {
                eventCol.addClass("future");
            }
        }
        else
        {
            eventCol.addClass("present");
        }
    }
}

  //Function to generate timeblock
  function setTimeBlock() {
    var currentTime = getCurrentHour("LT");

    for (var i = 0; i < 9; i++) {
      //Create a variable named "newRow" equal to $("<div>") and add the classes "row" and "time-block"
      var newRow = $("<div>").addClass("row time-block");

      var showTime = text_hour + timeSuffix;
      var displayTime = $("<p>").addClass("hour").text(showTime);

      //Append displayTime to timeCol
      var timeCol = $("<div>").addClass("col-1").append(displayTime);

      //Give each "eventCol" a data-attribute called "data-time"
      var eventCol = $("<textarea>")
        .addClass("col-10")
        .text("")
        .attr("id", showTime);

      //Change the background of eventCol based on time of the day
        setBackground(eventCol, currentTime, showTime);

      //Append save icon to saveBtnCol
      var saveBtnCol = $("<div>")
        .addClass("col-1 saveBtn")
        .append('<i class="far fa-save"></i>');

      //Append timeCol, eventCol, saveBtnCol to newRow
      newRow.append(timeCol, eventCol, saveBtnCol);

      //Append newRow to container
      $(".container").append(newRow);

      incrementTextHour();
    }
  }

  function incrementTextHour() {
    if (text_hour === 12) {
      text_hour = 1;
    } else if (text_hour === 11) {
      timeSuffix = ":00pm";
      text_hour++;
    } else {
      text_hour++;
    }
  }

  function getCurrentHour(pFormat) {
    var time = moment().format(pFormat).toLowerCase();

    time = time.split("");

    var suffix = "";

    var hour = parseHour(time);

    if (time[time.length - 2] === "p") {
      suffix = ":00pm";
    } else {
      suffix = ":00am";
    }

    return hour + suffix;
  }

  function parseHour(pTime) {
    var i = 0;
    var iHour = "";

    while (pTime[i] !== ":" || i > 100) {
      iHour += pTime[i];
      i++;
    }

    return iHour;
  }

  function AlterStoredBlocks(pText, pID)
  {
      nBlock = {
          id : pID,
          input : pText.trim()
      }
  
      for(var i = 0; i < storedBlocks.length; i++)
      {
          if(storedBlocks[i].id === nBlock.id)
          {
              storedBlocks.splice(i, 1);
  
              localStorage.setItem(storedBlocks_NAME, JSON.stringify(storedBlocks));
  
              return null;
          }
      }
  
      storedBlocks.push(nBlock);
  
      localStorage.setItem(storedBlocks_NAME, JSON.stringify(storedBlocks));
  }
  
  
  function GetStoredBlocks()
  {
  
      if(localStorage.getItem(storedBlocks_NAME))
      {
          storedBlocks = JSON.parse(localStorage.getItem(storedBlocks_NAME));
  
          storedBlocks.forEach(iBlock => {
             
              iID = "#" + iBlock.id;
  
              newRow = $(document.getElementById(iBlock.id));
  
              newRow.val(iBlock.input);
  
  
          });
  
      }
  
  }


  setTimeBlock();
  GetStoredBlocks();

  $(".saveBtn").click(function() {
   
    $iTextArea = $($(this).parent().children()[1]);

    iInput = $iTextArea.val();
    iID = $iTextArea.attr("id");

    AlterStoredBlocks(iInput, iID);
  });

  
});
