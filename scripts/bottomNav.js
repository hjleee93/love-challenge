import { showOnlyElem } from './common.js';
import quiz from './quiz.js';
// 하단 네비게이션 바 생성 함수
export const createBottomNav = () => {
  const navBar = document.createElement('div');
  navBar.id = 'bottom-nav';

  // 메뉴 아이템 데이터
  const menuItems = [
    { label: 'Discover Love Language', emoji: '🔭', id: 'hero'},
    { label: 'Primary Love Language', emoji: '📝', id: 'quiz-section' },
    { label: 'Read Love Stories', emoji: '📖', id:'stories' },
    { label: 'Explore the Love Around the World', emoji: '🌍', id: 'global-expressions' },
    { label: 'View Love Stories', emoji: '❤️', id:'daily-challenge' },
  ];

  // 각 버튼 생성 및 추가
  menuItems.forEach(item => {
    const button = document.createElement('button');
    button.className = 'bottom-nav-btn';
    button.innerHTML = `<span>${item.emoji}</span>${item.label}`;

    // 클릭 이벤트
    button.addEventListener('click', () => {
      quiz.startQuiz();
      showOnlyElem(item.id)
    });

    navBar.appendChild(button);
  });

  // 네비게이션 바를 body에 추가
  document.body.appendChild(navBar);
}
