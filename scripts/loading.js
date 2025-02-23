// 1. body를 숨김 (초기 설정)
document.documentElement.style.visibility = "hidden"; // HTML 전체 숨기기

// 2. 로딩 스피너 생성
const createLoadingSpinner = () => {
  const spinnerWrapper = document.createElement('div');
  spinnerWrapper.id = 'loading-spinner';
  spinnerWrapper.style.position = 'fixed';
  spinnerWrapper.style.top = '0';
  spinnerWrapper.style.left = '0';
  spinnerWrapper.style.width = '100%';
  spinnerWrapper.style.height = '100%';
  spinnerWrapper.style.display = 'flex';
  spinnerWrapper.style.justifyContent = 'center';
  spinnerWrapper.style.alignItems = 'center';
  spinnerWrapper.style.backgroundColor = 'white';
  spinnerWrapper.style.zIndex = '9999';

  const spinner = document.createElement('div');
  spinner.style.border = '8px solid #f3f3f3';
  spinner.style.borderTop = '8px solid var(--accent-color)';
  spinner.style.borderRadius = '50%';
  spinner.style.width = '60px';
  spinner.style.height = '60px';
  spinner.style.animation = 'spin 1s linear infinite';

  // 애니메이션 스타일 추가
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);

  spinnerWrapper.appendChild(spinner);
  document.body.appendChild(spinnerWrapper);
};

// 3. 스피너 제거 & body 표시
const removeLoadingSpinner = () => {
  const spinner = document.getElementById('loading-spinner');
  if (spinner) {
    spinner.style.opacity = '0';
    spinner.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
      spinner.remove();
      document.documentElement.style.visibility = "visible"; // HTML 전체 표시
    }, 500); // 트랜지션 후 제거
  }
};

// HTML 숨긴 상태에서 스피너 추가
createLoadingSpinner();

// 모든 리소스가 로드된 후 스피너 제거 & HTML 표시
window.addEventListener('load', () => {
  removeLoadingSpinner();
});
