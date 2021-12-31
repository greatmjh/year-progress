function yearToTimestamp(year){
    var d = new Date(Date.UTC(year,0,1,0,0,0));
    ts = d.getTime()
    ts = ts + d.getTimezoneOffset()*60000 //get timezone offset in milliseconds and apply
    return ts;
}

function toFixed(x) {
    if (Math.abs(x) < 1.0) {
      var e = parseInt(x.toString().split('e-')[1]);
      if (e) {
          x *= Math.pow(10,e-1);
          x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
      }
    } else {
      var e = parseInt(x.toString().split('+')[1]);
      if (e > 20) {
          e -= 20;
          x /= Math.pow(10,e);
          x += (new Array(e+1)).join('0');
      }
    }

    return x;
  }

function update() {
    year = new Date().getFullYear(); //Get current year
    
    //Set year in page
    for (i = 0; i < document.getElementsByClassName("year").length; i++) {
        document.getElementsByClassName("year")[i].innerHTML = year;
    }
    
    //Get progress through the year
    yearStart = yearToTimestamp(year); //Unix time of beginning of current year
    nextYearStart = yearToTimestamp(year + 1); //Unix time of beginning of next year
    yearLength = nextYearStart - yearStart; //Length of the year in miliseconds
    now = Math.round(Date.now()); //Unix time now
    timeElapsed = now - yearStart; //Unix time between now and the beginning of the year
    progress = timeElapsed / yearLength; //Progress through year as float
    
    //Convert float to percentage rounded to 7 decimal places
    progress = progress * 1000000000;
    progress = Math.round(progress);
    progress = progress / 10000000;

    //Display in progress bar
    document.getElementById("year-prog").value = progress * 100;
    
    //Pad extra zeroes if necessary
    progress = String(toFixed(progress));
    if (progress < 10) {
        progress = "0" + progress
    }
    if (progress.length == 2) {
        //No decimal
        progress = progress + ".0000000";
    } 
    
    //Pad the extra zeroes
    progress = progress.substring(0, 10)
    while (progress.length < 10) {
        progress = progress + "0";
    }
    for (i = 0; i < document.getElementsByClassName("percent").length; i++) {
        document.getElementsByClassName("percent")[i].innerHTML = progress;
    }
    
}
function main() {
    //Set year
    year = new Date().getFullYear();
    
    update()
    setInterval(update, 10);
}
