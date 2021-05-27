/// ==================================
// Date and Time Module
// -----------------------------------
// Handles all Moment.js calls
// ===================================
var dateAndTime = (function() {
    
    function getDate() {
        let date = moment().format('MMMM Do YYYY');
        return date;
    }

    function getHour() {
        let hour = moment().format('HH');
        return hour;
    }

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

    let headerDate = document.getElementById("currentDay");

    function updateDate () {
        headerDate.textContent = dateAndTime.getDate();
    }

    function init() {
        updateDate();
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