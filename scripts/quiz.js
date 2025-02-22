import { toggleElementById } from './common.js';

const quizData = [
  {
    question: "What makes you feel most appreciated?",
    options: [
      { text: "Words of affirmation", language: "words" },
      { text: "Acts of service", language: "acts" },
      { text: "Receiving gifts", language: "gifts" }
    ]
  },
  {
    question: "What's your ideal weekend activity?",
    options: [
      { text: "Spending quality time", language: "time" },
      { text: "A thoughtful gift", language: "gifts" },
      { text: "A warm hug", language: "touch" }
    ]
  },
  {
    question: "How do you show love to others?",
    options: [
      { text: "Helping with tasks", language: "acts" },
      { text: "Giving compliments", language: "words" },
      { text: "Physical affection", language: "touch" }
    ]
  },
  {
    question: "What's most meaningful to you?",
    options: [
      { text: "Undivided attention", language: "time" },
      { text: "A surprise gift", language: "gifts" },
      { text: "Words of encouragement", language: "words" }
    ]
  },
  {
    question: "What makes you feel loved?",
    options: [
      { text: "A warm hug", language: "touch" },
      { text: "Someone helping me", language: "acts" },
      { text: "Heartfelt compliments", language: "words" }
    ]
  }
];


export default new class Quiz {
  #currentQuestionIndex;
  #scores;
  #questionDisplay;
  #optionsContainer;
  #optionButtons
  #bars;

  constructor() {
    this.#currentQuestionIndex = 0;
    this.#scores = {
      words: 0,
      acts: 0,
      gifts: 0,
      time: 0,
      touch: 0
    };

    this.#questionDisplay = document.getElementById("question-display");
    this.#optionsContainer = document.getElementById("options-container");
    this.#optionButtons = document.querySelectorAll("#options-container .option");
    this.#bars = document.querySelectorAll(".bar");
  }

  startQuiz() {
    console.log('start')

    this.#currentQuestionIndex = 0;
    this.#scores = { words: 0, acts: 0, gifts: 0, time: 0, touch: 0 };

  toggleElementById('results-section');
  toggleElementById('quiz-section');

  this.#bars.forEach(bar => {
    bar.style.height = '0%';
    bar.style.backgroundColor = '#e0e0e0';
    bar.textContent = '';
    bar.style.opacity = '1';
    bar.style.padding = '0';
  });

  this.showQuestion();
  }

  showQuestion() {
    const currentQuestion = quizData[this.#currentQuestionIndex];
    this.#questionDisplay.textContent = currentQuestion.question;

    this.#optionButtons.forEach((button, index) => {

      if (currentQuestion.options[index]) {
        const option = currentQuestion.options[index];
        button.textContent = option.text;
        button.setAttribute("data-language", option.language);
        button.style.display = "inline-block";
        button.onclick = (event) => this.handleOptionClick(event);
      } else {
        button.style.display = "none";
      }
    });

  }
  handleOptionClick = (event) => {
    const score = event.target.getAttribute("data-language");
    this.#scores[score] += 1; 

    this.#currentQuestionIndex++;

    if (this.#currentQuestionIndex < quizData.length) {
      this.showQuestion(); 
    } else {
      this.showResults();
    }
  }
  showResults() {
    toggleElementById('quiz-section')
    toggleElementById('results-section'); 
  
    const maxScore = Math.max(...Object.values(this.#scores));
  
    this.#bars.forEach(barContainer => {
      const language = barContainer.parentElement.getAttribute("data-language");
      const bar = barContainer;
      const score = this.#scores[language] || 0;
  
      const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
  
      // 바 스타일 업데이트
      bar.style.height = `${percentage}%`;
      bar.style.backgroundColor = "#6C63FF";
      bar.textContent = `${score}`;

      if(!score){
        bar.style.padding = '10px';
        bar.style.opacity = '0.6'
      }
    });
  }
  



}