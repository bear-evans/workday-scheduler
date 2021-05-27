/// ==================================
// Date and Time Module
// -----------------------------------
// Handles all Moment.js calls
// ===================================
var dateAndTime = (function() {
    
    // Simple function to return the current date
    function getDate() {
        let date = moment().format('MMMM Do YYYY');
        return date;
    }

    // Simple function to return the current hour
    function getHour() {
        let hour = moment().format('HH');
        return hour;
    }

    // Expose current date and hour for use
    return {
        getDate : getDate,
        getHour : getHour
    }
})();

/// ==================================
// Planner Module
// -----------------------------------
// Handles DOM manipulation and user
// interaction
// ===================================
var plannerApp = (function() {

    let taskBoxes = $("textarea");

    // Updates the header's date
    function _updateDate () {
        $("#currentDay").text(dateAndTime.getDate());
    }

    // Cycles through all text boxes, changing their colors
    function _colorizeTasks () {
        let hour = dateAndTime.getHour();

        $("textarea").each(
            function(i) {
                if (i < hour - 9) {
                    $(this).removeClass("present future").addClass("past");
                } else if (i == hour - 9) {
                    $(this).removeClass("past future").addClass("present");
                } else {
                    $(this).removeClass("past present").addClass("future");
                }    
            }
        );
    }

    function init() {
        _updateDate();
        _colorizeTasks();
        console.log(taskBoxes);
    }

    return {
        init: init
    }

})();

/// ==================================
// Storage Module
// -----------------------------------
// Handles retrieving and storing data
// in local storage
// ===================================
var storeManager = (function() {

})();

/// ==================================
// Runtime Code
// -----------------------------------
// Runs on load
// ===================================
plannerApp.init();