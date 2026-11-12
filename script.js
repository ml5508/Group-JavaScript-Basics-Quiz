// Each question is an object. Add more objects here when your team is ready.
const questions = [
  {
    type: "multiple-choice",
    question: "Which keyword can you use to create a variable in JavaScript?",
    choices: ["let", "style", "click", "answer"],
    correctAnswer: "let"
  },
  {
    type: "open-ended",
    question: "What are your plans for Thanksgiving? Where would you like to go?",
    placeholder: "Write anything you would like to share..."
  }
];

let currentQuestionIndex = 0;
const questionText = document.querySelector("#question-text");
const questionCount = document.querySelector("#question-count");
const choicesContainer = document.querySelector("#choices");
const checkButton = document.querySelector("#check-button");
const feedback = document.querySelector("#feedback");

function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionCount.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
  questionText.textContent = currentQuestion.question;
  choicesContainer.innerHTML = "";
  feedback.textContent = "";
  feedback.className = "feedback";

  if (currentQuestion.type === "multiple-choice") {
    choicesContainer.setAttribute("role", "radiogroup");
    choicesContainer.setAttribute("aria-label", "Answer choices");
    checkButton.textContent = "Check answer";

    currentQuestion.choices.forEach(function (choice) {
      const label = document.createElement("label");
      label.className = "choice";
      label.innerHTML = `
        <input type="radio" name="answer" value="${choice}">
        <span>${choice}</span>
      `;
      choicesContainer.appendChild(label);
    });
  } else {
    choicesContainer.removeAttribute("role");
    choicesContainer.removeAttribute("aria-label");
    checkButton.textContent = "Continue";

    const response = document.createElement("textarea");
    response.id = "open-answer";
    response.className = "open-answer";
    response.rows = 5;
    response.placeholder = currentQuestion.placeholder;
    response.setAttribute("aria-label", "Your Thanksgiving plans");
    choicesContainer.appendChild(response);
    response.focus();
  }
}

function checkAnswer() {
  const currentQuestion = questions[currentQuestionIndex];

  if (currentQuestion.type === "open-ended") {
    const response = document.querySelector("#open-answer");

    if (!response.value.trim()) {
      feedback.textContent = "Please write a response before continuing.";
      feedback.className = "feedback incorrect";
      return;
    }

    goToNextQuestion();
    return;
  }

  const selectedAnswer = document.querySelector('input[name="answer"]:checked');

  if (!selectedAnswer) {
    feedback.textContent = "Choose an answer first.";
    feedback.className = "feedback incorrect";
    return;
  }

  if (selectedAnswer.value === currentQuestion.correctAnswer) {
    feedback.textContent = "Correct! let creates a variable.";
    feedback.className = "feedback correct";
    goToNextQuestion();
  } else {
    feedback.textContent = "Not quite. Try again!";
    feedback.className = "feedback incorrect";
  }
}

function goToNextQuestion() {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex += 1;
    showQuestion();
  } else {
    questionCount.textContent = "Quiz complete";
    questionText.textContent = "Thanks for sharing your Thanksgiving plans!";
    choicesContainer.innerHTML = "";
    checkButton.hidden = true;
    feedback.textContent = "You have completed the quiz.";
    feedback.className = "feedback correct";
  }
}

checkButton.addEventListener("click", checkAnswer);
showQuestion();
