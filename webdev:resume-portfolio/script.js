$(document).ready(function() {
    // Check if a theme is already saved in localStorage
    const savedTheme = localStorage.getItem('resumeTheme');
    if (savedTheme) {
        // If the theme is saved, apply it to the page.
        applyTheme(savedTheme); 
    } else {
        // Prompt the user to pick a theme if it's the first visit
        let userChoice = "";
        // While the userChoice is not equal to light or dark
        while (userChoice !== "light" && userChoice !== "dark") {
            // Ask the user if they want the light or dark theme
            userChoice = prompt("Choose a theme! Light or Dark?").toLowerCase();
        }
        // Save the user's choice in the key resumeTheme
        localStorage.setItem('resumeTheme', userChoice);
        // Apply the chosen theme
        applyTheme(userChoice);
    }
});

// Event listeners for the buttons to toggle between themes
$("#light-theme").click(function() {
    // Apply the light theme.
    applyTheme('light');
    // Save the light theme to localStorage
    localStorage.setItem('resumeTheme', 'light');
    // Alert the user of the theme change
    alert("You changed the theme to light!");
});

$("#dark-theme").click(function() {
    // Apply the dark theme
    applyTheme('dark');
    // Save the dark theme to localStorage
    localStorage.setItem('resumeTheme', 'dark');
    // Alert the user of the theme change
    alert("You changed the theme to dark!");
});

// Function to apply the selected theme
// Function to apply the selected theme
function applyTheme(theme) {
    // If theme is equal to light
    if (theme === 'light') {
        // Change the color of the text and background to light theme colors
        $("body").css({
            "color": "black", 
            "background-image": "linear-gradient(to top right, #b3598c 30%, #ffc2de 67%)"
        });
        $(".section").css("background-color", "#ffebf3");
        $("h3").css({
            "color": "black",  // Darker h3 for light theme
            "font-size": "1.2em", // Increase the font size
            "padding": "10px 0" // Add some padding to separate it from other elements
        });
        $("p").css("color", "black");  // Set p tags to black in light theme
        $(".section li").css("color", "black"); // Set li tags to black in light theme

    // If theme is equal to dark
    } else if (theme === 'dark') {
        // Change the same elements to dark theme colors
        $("body").css({
            "color": "white", 
            "background-image": "linear-gradient(to top right, #ff99cc 0%, #1b1b1e 60%)"
        });
        $(".section").css({
            "border-color": "#40262f",  // Set border color
            "background-color": "#282828" // Set background color
        });
        $("h3").css({
            "color": "pink",  // Lighter h3 color for better contrast in dark mode
            "font-size": "1.2em",  // Increase the font size
            "padding": "10px 0"  // Add padding to separate it
        });
        $("p").css("color", "white");  // Set p tags to white in dark theme
        $(".section li").css("color", "white"); // Set li tags to white in dark theme
    } else {
        // If no valid option was selected
        alert("Input not recognized. Please choose light or dark.");
    }
}


// Given instructions on how to interact with the webpage
alert("Click on a section to view more information. Hover over the bulletins to view them better.");

// Click event to show/hide the rest of the content
$(".section h2").click(function() {
    // Reveal the content below header
    $(this).nextAll("p, ul, h3").stop(true, true).slideToggle();
});


