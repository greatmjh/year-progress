function yearToTimestamp(year){
    var datum = new Date(Date.UTC(year,0,1,0,0,0));
    return datum.getTime();
}

function update() {
    year = new Date().getFullYear(); //Get current year
    yearStart = yearToTimestamp(year); //Unix time of beginning of current year
    nextYearStart = yearToTimestamp(year + 1); //Unix time of beginning of next year
    yearLength = nextYearStart - yearStart; //Length of the year in miliseconds
    now = Math.round(Date.now()); //Unix time noe
    timeElapsed = now - yearStart; //Unix time between now and the beginning of the year
    progress = timeElapsed / yearLength; //Progress through year as float
    //Convert float to percentage rounded to 7 decimal places
    progress = progress * 1000000000;
    progress = Math.round(progress);
    progress = progress / 10000000;
    //Display in progress bar
    document.getElementById("year-prog").value = progress * 100;
    //Pad extra zeroes if necessary
    progress = String(progress);
    if (progress.length == 2) {
        //No decimal
        progress = progress + ".0000000";
    } 
    //Pad the extra zeroes
    while (progress.length <= 9) {
        progress = progress + "0";
    }
    for (i = 0; i < document.getElementsByClassName("percent").length; i++) {
        document.getElementsByClassName("percent")[i].innerHTML = progress;
    }
    
}
function main() {
    //Set year
    year = new Date().getFullYear();
    for (i = 0; i < document.getElementsByClassName("year").length; i++) {
        document.getElementsByClassName("year")[i].innerHTML = year;
    }
    update()
    setInterval(update, 10);
}
