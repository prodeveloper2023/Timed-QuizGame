// Wait for the DOM to be fully loaded before executing the JavaScript code
document.addEventListener("DOMContentLoaded", function () {
  // DOM elements
  const highscoresList = document.getElementById("highscores");
  const clearButton = document.getElementById("clear");

  // Display existing highscores when the page loads
  displayHighscores();

  // Add an event listener to the "Clear Highscores" button
  clearButton.addEventListener("click", clearHighscores);

  // Function to display highscores
  function displayHighscores() {
    // Clear the existing content of the highscores list
    highscoresList.innerHTML = "";

    // Retrieve user scores from local storage or use an empty array if no scores are present
    const userScores = JSON.parse(localStorage.getItem("userScores")) || [];

    // Iterate through each user score and display it
    userScores.forEach((score) => {
      displayScore(score);
    });
  }

  // Function to clear highscores
  function clearHighscores() {
    // Remove user scores from local storage
    localStorage.removeItem("userScores");

    // Clear the content of the highscores list
    highscoresList.innerHTML = "";
  }

  // Function to display an individual score
  function displayScore(score) {
    // Create a list item element for the score
    const listItem = document.createElement("li");

    // Set the text content of the list item with the user's initials and score
    listItem.textContent = `${score.initials}: ${score.score}`;

    // Append the list item to the highscores list
    highscoresList.appendChild(listItem);
  }
});
