
import { shareToSns } from './share.js';
import { toggleElementById, showOnlyElem } from './common.js';
import hero from './hero.js';
import quiz from './quiz.js';
import story from './story.js';
import { createBottomNav } from './bottomNav.js'
import world, { leafletScript } from './world.js';

function addFavicon(url) {
  const link = document.createElement('link');
  link.type = "image/png"
  link.rel = 'icon';
  link.href = url;
  document.head.appendChild(link);
}

addFavicon('assets/images/favicon.ico');


function createFloatingHeart(x, y) {
  const heart = document.createElement("span");
  heart.classList.add("clicked-heart");
  heart.html
  heart.innerHTML = "<span class='love-word' style='color: var(--accent-color); position: relative;'><span class='heart' style='position: absolute; top: -20px; left: 50%; transform: translateX(-50%); font-size: 1.2em; opacity: 0;'>&#10084;</span></span>"

  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 1000);
}


document.addEventListener('DOMContentLoaded', function () {
  /**
   * Import main.css
   */
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'assets/styles/main.css';
  document.head.appendChild(link);




  document.body.addEventListener("click", (event) => {
    createFloatingHeart(event.clientX, event.clientY);
  });


  toggleElementById('quiz-section');
  toggleElementById('results-section');
  toggleElementById('stories');
  toggleElementById('global-expressions');
  toggleElementById('daily-challenge');


  /**
   * Hero Section
   */

  //Change the color of specific parts of the text
  (() => {
    const titleEl = document.querySelector('.title');
    if (titleEl) {

      let text = titleEl.textContent;
      text = text.replace("Discover", "<span style='color: #2ecc71;'>Discover</span>");
      text = text.replace("Love", "<span style='color: var(--accent-color);'>Love</span>");
      titleEl.innerHTML = text;

      text = text.replace("Love",
        "<span class='love-word' style='color: var(--accent-color); position: relative;'>Love<span class='heart' style='position: absolute; top: -20px; left: 50%; transform: translateX(-50%); font-size: 1.2em; opacity: 0;'>&#10084;</span></span>");
      titleEl.innerHTML = text;

      const heartEl = titleEl.querySelector('.heart');

      if (heartEl) {
        heartEl.classList.add('floating-heart');
      }
    }
  })();
  hero.addIcon();
  hero.flipCard();

  /**
   * Quiz Section
   */

  (() => {
    const titleEl = document.querySelector('#quiz-section>h2');
    if (titleEl) {
      let text = titleEl.textContent;
      text = text.replace("Love", "<span style='color: var(--accent-color);'>Love</span>");
      titleEl.innerHTML = text;

      text = text.replace("Love",
        "<span class='love-word' style='color: var(--accent-color); position: relative;'>Love<span class='heart' style='position: absolute; top: -20px; left: 50%; transform: translateX(-50%); font-size: 1.2em; opacity: 0;'>&#10084;</span></span>");
      titleEl.innerHTML = text;

      const heartEl = titleEl.querySelector('.heart');

      if (heartEl) {
        heartEl.classList.add('floating-heart');
      }
    }

    const resultEl = document.querySelector('#results-section>h2');
    if (resultEl) {
      let text = resultEl.textContent;
      text = text.replace("Love", "<span style='color: var(--accent-color);'>Love</span>");
      resultEl.innerHTML = text;

      text = text.replace("Love",
        "<span class='love-word' style='color: var(--accent-color); position: relative;'>Love<span class='heart' style='position: absolute; top: -20px; left: 50%; transform: translateX(-50%); font-size: 1.2em; opacity: 0;'>&#10084;</span></span>");
      resultEl.innerHTML = text;

      const heartEl = resultEl.querySelector('.heart');

      if (heartEl) {
        heartEl.classList.add('floating-heart');
      }
    }
  })();

  const startBtn = document.getElementById('start-quiz')
  const optionBtns = document.querySelectorAll('.option')

  startBtn.addEventListener('click', () => {
    quiz.showQuestion()
    startBtn.style.display = "none";
  })

  optionBtns.forEach((btn, index) => {
    if (index === 0) {
      btn.textContent = 'CLICK'
      btn.addEventListener('click', () => {
        quiz.showQuestion()
        startBtn.style.display = "none";
      })
    } else if (index === 1) {
      btn.textContent = 'ANY BUTTON'
      btn.addEventListener('click', () => {
        quiz.showQuestion()
        startBtn.style.display = "none";
      })

    }
    else if (index === 2) {
      btn.textContent = 'TO START'
      btn.addEventListener('click', () => {
        quiz.showQuestion()
        startBtn.style.display = "none";
      })

    }
  });

  /**
   * Story
   */

  (() => {
    const titleEl = document.querySelector('#stories>h2');
    if (titleEl) {
      let text = titleEl.textContent;
      text = text.replace("Love", "<span style='color: var(--accent-color);'>Love</span>");
      titleEl.innerHTML = text;

      text = text.replace("Love",
        "<span class='love-word' style='color: var(--accent-color); position: relative;'>Love<span class='heart' style='position: absolute; top: -20px; left: 50%; transform: translateX(-50%); font-size: 1.2em; opacity: 0;'>&#10084;</span></span>");
      titleEl.innerHTML = text;

      const heartEl = titleEl.querySelector('.heart');

      if (heartEl) {
        heartEl.classList.add('floating-heart');
      }
    }
  })();
  story.initCarousel();

  /**
   * Love of world
   */
  
  (() => {
    const titleEl = document.querySelector('#global-expressions>h2');
    if (titleEl) {
      let text = titleEl.textContent;
      text = text.replace("Love", "<span style='color: var(--accent-color);'>Love</span>");
      titleEl.innerHTML = text;

      text = text.replace("Love",
        "<span class='love-word' style='color: var(--accent-color); position: relative;'>Love<span class='heart' style='position: absolute; top: -20px; left: 50%; transform: translateX(-50%); font-size: 1.2em; opacity: 0;'>&#10084;</span></span>");
      titleEl.innerHTML = text;

      const heartEl = titleEl.querySelector('.heart');

      if (heartEl) {
        heartEl.classList.add('floating-heart');
      }
    }
  })();
  const markers = document.querySelectorAll('.marker')
  markers.forEach((marker) => {
    marker.style.display = 'none'
  })

  leafletScript.onload = () => {
    if (window.L) {
      world.initMap(window.L);
    
    } else {
      console.error('Leaflet library failed to load.');
    }
  };
  /**
   * Love Challenge
   */

  document.getElementById('new-challenge').style.display = 'none'
  document.getElementById('completion-tracker').style.display = 'none'

  const titleEl = document.querySelector('#daily-challenge>h2');
  if (titleEl) {
    let text = titleEl.textContent;
    text = text.replace("Love", "<span style='color: var(--accent-color);'>Love</span>");
    titleEl.innerHTML = text;

    text = text.replace("Love",
      "<span class='love-word' style='color: var(--accent-color); position: relative;'>Love<span class='heart' style='position: absolute; top: -20px; left: 50%; transform: translateX(-50%); font-size: 1.2em; opacity: 0;'>&#10084;</span></span>");
    titleEl.innerHTML = text;

    const heartEl = titleEl.querySelector('.heart');

    if (heartEl) {
      heartEl.classList.add('floating-heart');
    }
  }

  

  /**
   * Share
   */
  const twitterButton = document.querySelector('.share-btn[data-platform="twitter"]');
  const instaButton = document.querySelector('.share-btn[data-platform="instagram"]');
  const facebookButton = document.querySelector('.share-btn[data-platform="facebook"]');

  instaButton.addEventListener('click', () => {
    shareToSns('instagram')
  });
  twitterButton.addEventListener('click', () => {
    shareToSns('twitter')
  });

  facebookButton.addEventListener('click', () => {
    shareToSns('facebook')
  });

})



/**
 * Create Bottom Navigation
 */
window.addEventListener('DOMContentLoaded', createBottomNav);
