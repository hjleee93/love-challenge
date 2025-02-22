const allSectionId = ['hero', 'quiz-section', 'results-section', 'stories', 'global-expressions', 'daily-challenge']

export const toggleElementById = (id) =>{ 

  const elem = document.getElementById(id)
  
    if (!elem) return; 
    if (elem.style.display === 'none') {
      if(id === 'quiz-section' || id === 'results-section'){
        elem.style.display = 'flex'
      }else{
        elem.style.display = 'flex';
      }
    } else {
      elem.style.display = 'none';
    }
  
}

export const showOnlyElem = (id) => {
  const allSectionId = ['hero', 'quiz-section', 'results-section', 'stories', 'global-expressions', 'daily-challenge'];

  allSectionId.forEach(sectionId => {
    const elem = document.getElementById(sectionId);
    if (!elem) return;

    if (sectionId === id) {
      // 특정 섹션을 보이게 설정
      if (sectionId === 'quiz-section' || sectionId === 'results-section') {
        elem.style.display = 'flex';
      } else {
        elem.style.display = 'flex';
      }
    } else {
      // 나머지 섹션은 숨김
      elem.style.display = 'none';
    }
  });
};
