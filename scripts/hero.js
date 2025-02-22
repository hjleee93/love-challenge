import { toggleElementById } from './common.js';

export default new class Hero {
  constructor() {
    this.section = document.getElementById('hero')
    this.languageCards = document.querySelectorAll('#language-cards .card');
  }

  addIcon() {
    this.languageCards.forEach(card => {
      const language = card.getAttribute('data-language');
      card.classList.add('love-card');

      const icon = document.createElement('div');
      icon.classList.add('card-icon');

      switch (language) {
        case 'words':
          icon.innerHTML = '💬';
          break;
        case 'acts':
          icon.innerHTML = '🤝';
          break;
        case 'gifts':
          icon.innerHTML = '🎁';
          break;
        case 'time':
          icon.innerHTML = '⏰';
          break;
        case 'touch':
          icon.innerHTML = '🤗';
          break;
        default:
          icon.innerHTML = '❤️';
      }

      card.prepend(icon);

    });
  }

  flipCard() {

    const languageDetails = {
      words: {
        description: "Genuine praise and encouragement."
      },
      acts: {
        description: "Express love through actions."
      },
      gifts: {
        description: "Convey your heart through gifts."
      },
      time: {
        description: "Spending time together is precious."
      },
      touch: {
        description: "Express intimacy through touch."
      }
    };


    this.languageCards.forEach((card) => {
      const languageKey = card.getAttribute("data-language");
      const detail = languageDetails[languageKey] || { description: "No info available. / 정보 없음" };

      const flipContainer = document.createElement("div");
      flipContainer.classList.add("flip-container");

      const flipper = document.createElement("div");
      flipper.classList.add("flipper");

      const front = document.createElement("div");
      front.classList.add("card-front");
      front.innerHTML = card.innerHTML;

      const back = document.createElement("div");
      back.classList.add("card-back");
      back.innerHTML = "<p>" + detail.description + "</p>";

      flipper.appendChild(front);
      flipper.appendChild(back);
      flipContainer.appendChild(flipper);
      card.innerHTML = "";
      card.appendChild(flipContainer);

      card.addEventListener("click", () => {
        this.languageCards.forEach(function (otherCard) {
          if (otherCard !== card) {
            const otherFlip = otherCard.querySelector(".flip-container");
            if (otherFlip && otherFlip.classList.contains("flipped")) {
              otherFlip.classList.remove("flipped");
            }
          }
        })

        flipContainer.classList.toggle("flipped");
      });

      document.addEventListener("click", (event) => {
        if (!event.target.closest("#language-cards .card")) {
          this.languageCards.forEach((card) => {
            const flipContainer = card.querySelector(".flip-container");
            if (flipContainer) { flipContainer.classList.remove("flipped"); }
          });
        }
      });
    });

  }

  addNextButton() {
    const nextBtn = document.createElement("button");
    nextBtn.setAttribute('id', 'next-quiz')
    nextBtn.classList.add('next-quiz-btn')
    nextBtn.textContent="Start Quiz"
    this.section.appendChild(nextBtn)

    nextBtn.addEventListener("click", ()=>{
      toggleElementById('hero')
      toggleElementById('next-quiz')
      toggleElementById('quiz-section')
      toggleElementById(nextBtn)
    });

  }
}