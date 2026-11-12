// Each question is an object. Add more objects here when your team is ready.
const questions = [
  {
    question: "Which keyword can you use to create a variable in JavaScript?",
    choices: ["let", "style", "click", "answer"],
    correctAnswer: "let"
  }
];

const currentQuestion = questions[0];
const questionText = document.querySelector("#question-text");
const choicesContainer = document.querySelector("#choices");
const checkButton = document.querySelector("#check-button");
const feedback = document.querySelector("#feedback");

function showQuestion() {
  questionText.textContent = currentQuestion.question;

  currentQuestion.choices.forEach(function (choice) {
    const label = document.createElement("label");
    label.className = "choice";
    label.innerHTML = `
      <input type="radio" name="answer" value="${choice}">
      <span>${choice}</span>
    `;
    choicesContainer.appendChild(label);
  });
}

function checkAnswer() {
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');

  if (!selectedAnswer) {
    feedback.textContent = "Choose an answer first.";
    feedback.className = "feedback incorrect";
    return;
  }

  if (selectedAnswer.value === currentQuestion.correctAnswer) {
    feedback.textContent = "Correct! let creates a variable.";
    feedback.className = "feedback correct";
  } else {
    feedback.textContent = "Not quite. Try again!";
    feedback.className = "feedback incorrect";
  }
}

checkButton.addEventListener("click", checkAnswer);
showQuestion();
