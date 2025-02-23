import challenge from './challenge.js';
import { showOnlyElem } from './common.js';
import quiz from './quiz.js';

export const createBottomNav = () => {
  const navBar = document.createElement('div');
  navBar.id = 'bottom-nav';

  const menuItems = [
    { label: 'Discover Love Language', emoji: '🔭', id: 'hero'},
    { label: 'Primary Love Language', emoji: '📝', id: 'quiz-section' },
    { label: 'Read Love Stories', emoji: '📖', id:'stories' },
    { label: 'Explore the Love Around the World', emoji: '🌍', id: 'global-expressions' },
    { label: 'Love Language Challenge', emoji: '❤️', id:'daily-challenge' },
  ];

  menuItems.forEach(item => {
    const button = document.createElement('button');
    button.className = 'bottom-nav-btn';
    button.innerHTML = `<span>${item.emoji}</span>${item.label}`;

    button.addEventListener('click', () => {
      quiz.startQuiz();
      showOnlyElem(item.id)

      if(item.id === 'daily-challenge'){
        setTimeout(() => {
          document.getElementById('new-challenge').style.display = 'block'
          document.getElementById('completion-tracker').style.display = 'block'
          
          challenge.loadNewChallenge()
        },1000)
      }
    });

    navBar.appendChild(button);
  });

  document.body.appendChild(navBar);
}
