const quizData = [
   {
    question: "What is the capital of India?",
    choices: ["Mumbai", "Delhi", "Luckhnow", "Kolkata"],
    answer: "Delhi"
  },
  {
    question: "Which language runs in a web browser?",
    choices: ["Java", "C", "Python", "Javascript"],
     answer: "Javascript"
   },
  {
    question: "What is the largest ocean on Earth?",
    choices: ["Atlantic", "Pacific", "Indian", "Arctic"],
    answer: "Pacific"
  },
  {
    question: "Who wrote 'Hamlet'?",
    choices: ["William Shakespeare", "Mark Twain", "Jane Austen", "Charles Dickens"],
    answer: "William Shakespeare"
  },
  {
    question: "Who is known as the father of computers? ",
    choices: ["Alan Turing", "Tim Berners-Lee", "Charles Babbage", "Bill Gates"],
    answer: "Charles Babbage"
  },
  {
    question: "What is the square root of 64?",
    choices: ["6", "8", "10", "12"],
    answer: "8"
  },
  {
    question: "Who is known as the King of Cricket? ",
    choices: ["Ben Stokes", "M.S Dhoni", "Steve Smith", "Virat Kohli"],
    answer: "Virat Kohli"
  },
  {
    question: "How many continents are there in the world?",
    choices: ["5", "6", "7", "8"],
    answer: "7"
  },
  {
    question: "What is the chemical symbol for gold?",
    choices: ["Au", "Ag", "Gd", "Go"],
    answer: "Au"
  },
  {
    question: "What year did World War II end?",
    choices: ["1942", "1945", "1948", "1950"],
    answer: "1945"
  }
];

// Shuffle questions
quizData.sort(() => Math.random() - 0.5);

let currentIndex = 0;
let score = 0;

const questionEl = document.getElementById("question");
const numberEl = document.getElementById("question-number");
const choicesEl = document.getElementById("choices");
const nextBtn = document.getElementById("next-btn");
const feedbackEl = document.getElementById("feedback");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
const progressBar = document.getElementById("progress-bar");

function loadQuestion() {
  const current = quizData[currentIndex];
  questionEl.textContent = current.question;
  numberEl.textContent = `Question ${currentIndex + 1} of ${quizData.length}`;
  choicesEl.innerHTML = "";
  feedbackEl.textContent = "";
  nextBtn.classList.add("hidden");

  current.choices.forEach(choice => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.onclick = () => checkAnswer(btn, choice, current.answer);
    li.appendChild(btn);
    choicesEl.appendChild(li);
  });

  updateProgress();
}

function checkAnswer(button, selected, correct) {
  const buttons = document.querySelectorAll("#choices button");

  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correct) {
      btn.classList.add("correct");
    } else if (btn.textContent === selected) {
      btn.classList.add("wrong");
    }
  });

  if (selected === correct) {
    feedbackEl.textContent = "✅ Correct!";
    score++;
  } else {
    feedbackEl.textContent = `❌ Wrong! Correct answer: ${correct}`;
  }

  nextBtn.classList.remove("hidden");
}

nextBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < quizData.length) {
    loadQuestion();
  } else {
    showResults();
  }
});

function updateProgress() {
  const progress = ((currentIndex) / quizData.length) * 100;
  progressBar.style.width = `${progress}%`;
}

function showResults() {
  document.getElementById("quiz").classList.add("hidden");
  resultEl.classList.remove("hidden");
  scoreEl.textContent = `${score} / ${quizData.length}`;

  let percentage = Math.round((score / quizData.length) * 100);
  let message = "";

  if (percentage === 100) message = "🏆 Perfect!";
  else if (percentage >= 80) message = "🎉 Great job!";
  else if (percentage >= 50) message = "👍 Not bad!";
  else message = "📘 Keep practicing!";

  document.getElementById("performance").textContent = `Score: ${percentage}% – ${message}`;
  progressBar.style.width = `100%`;

  saveHighScore(score);
}

// Theme toggle
document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const mode = document.body.classList.contains("dark-mode") ? "Light Mode" : "Dark Mode";
  document.getElementById("theme-toggle").textContent = mode === "Dark Mode" ? "🌙 Dark Mode" : "☀️ Light Mode";
});

// High score storage
function saveHighScore(newScore) {
  const saved = localStorage.getItem("highScore") || 0;
  const highScore = Math.max(newScore, saved);
  localStorage.setItem("highScore", highScore);
  document.getElementById("high-score").textContent = `${highScore} / ${quizData.length}`;
}

document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("highScore") || 0;
  document.getElementById("high-score").textContent = `${saved} / ${quizData.length}`;
});

// Load the first question
loadQuestion();
