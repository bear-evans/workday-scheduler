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

    // Updates the header's date
    function _updateDate () {
        $("#currentDay").text(dateAndTime.getDate());
    }

    // Adds event listeners
    function _clickHandler() {
        $(".saveBtn").click(_saveItem);
    }

    // Cycles through all text boxes, changing their colors
    function _colorizeTasks () {
        let hour = dateAndTime.getHour();

        $("textarea").each(
            function(i) {
                if (i < (hour - 9)) {
                    $(this).removeClass("present future").addClass("past");
                } else if (i == (hour - 9)) {
                    $(this).removeClass("past future").addClass("present");
                } else {
                    $(this).removeClass("past present").addClass("future");
                }
            }
        );
    }

    // Saves items when save button is clicked
    function _saveItem() {
        let item = $(this).siblings("textarea").val();

        // don't process blank slots
        if (item === "") {
            return;
        }

        // convert the index based on the time offset (9 AM = 0)
        let index = $(this).parent().attr("id") - 9; // the magic of loosley typed languages
        storeManager.saveData(index, item);
    }

    // Loads tasks from memory and sets the textboxes to their values
    function _loadTasks() {
        let taskBox = $("textarea");
        for (var i = 0; i < taskBox.length; i++) {
            taskBox[i].textContent = storeManager.loadData(i);
        }
    }


    // initializes the planner module
    function init() {
        _updateDate();
        _loadTasks();
        _colorizeTasks();
        _clickHandler();
    }

    // expose the planner module's opening function
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

    // loads the value of they provided key
    // key is a base 0 index adjusted for the time offset (9 AM = 0)
    function loadData(key) {
        let value = JSON.parse(localStorage.getItem(key));
        return value;
    }

    // Stores task data based on the provided key
    function saveData(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    // Exposed the save and load interfaces
    return {
        loadData: loadData,
        saveData: saveData
    }
})();

/// ==================================
// Runtime Code
// -----------------------------------
// Runs on load
// ===================================

plannerApp.init();