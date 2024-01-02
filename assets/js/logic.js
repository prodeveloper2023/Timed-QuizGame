// Wait for the DOM to be fully loaded before executing the JavaScript code
document.addEventListener("DOMContentLoaded", function () {
  // DOM elements
  const startButton = document.getElementById("start");
  const questionsContainer = document.getElementById("questions");
  const endScreen = document.getElementById("end-screen");
  const timerElement = document.getElementById("time");
  const choicesContainer = document.getElementById("choices");
  const feedbackContainer = document.getElementById("feedback");
  const finalScoreElement = document.getElementById("final-score");
  const initialsInput = document.getElementById("initials");
  const submitButton = document.getElementById("submit");

  // Quiz state variables
  let currentQuestionIndex = 0;
  let timeLeft = 60;
  let timerInterval;
  let userScores = JSON.parse(localStorage.getItem("userScores")) || [];

  // Event listener for the start button
  startButton.addEventListener("click", startQuiz);

  // Function to start the quiz
  function startQuiz() {
    startButton.style.display = "none";
    questionsContainer.classList.remove("hide");
    timerInterval = setInterval(updateTimer, 1000);
    displayQuestion();
  }

  // Function to display a question
  function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById("question-title").textContent =
      currentQuestion.question;

    choicesContainer.innerHTML = "";
    currentQuestion.choices.forEach((choice) => {
      const button = document.createElement("button");
      button.textContent = choice;
      button.addEventListener("click", checkAnswer);
      choicesContainer.appendChild(button);
    });
  }

  // Function to check the selected answer
  function checkAnswer(event) {
    const selectedAnswer = event.target.textContent;
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedAnswer === currentQuestion.correctAnswer) {
      feedbackContainer.textContent = "Correct!";
    } else {
      feedbackContainer.textContent = "Incorrect! -10 seconds";
      timeLeft -= 10;
    }

    // Move to the next question after a delay
    setTimeout(() => {
      feedbackContainer.textContent = "";
      currentQuestionIndex++;

      if (currentQuestionIndex < questions.length) {
        displayQuestion();
      } else {
        endQuiz();
      }
    }, 1000);
  }

  // Function to update the timer
  function updateTimer() {
    timerElement.textContent = timeLeft;
    if (timeLeft <= 0) {
      endQuiz();
    } else {
      timeLeft--;
    }
  }

  // Function to end the quiz
  function endQuiz() {
    clearInterval(timerInterval);
    questionsContainer.classList.add("hide");
    endScreen.classList.remove("hide");
    finalScoreElement.textContent = timeLeft;
  }

  // Event listener for the submit button
  submitButton.addEventListener("click", saveScore);

  // Function to save the score
  function saveScore() {
    const initials = initialsInput.value.trim();
    if (initials !== "") {
      const userScore = { initials: initials, score: timeLeft };
      userScores.push(userScore);
      localStorage.setItem("userScores", JSON.stringify(userScores));

      // Save the score or perform any other action as needed
      console.log(`Initials: ${initials}, Score: ${timeLeft}`);
    }
  }
});
