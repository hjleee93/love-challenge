export default new class Story {
  #currentIndex;

  constructor() {
    this.storyCards = document.querySelectorAll('.story-card');
    this.expandButtons = document.querySelectorAll('.expand-btn');
    this.prevBtn = document.getElementById('prev-story');
    this.nextBtn = document.getElementById('next-story');
    this.storyCarousel = document.getElementById('story-carousel');
    this.#currentIndex = 0;

    this.addEventListeners();
  }

  initCarousel() {
    this.storyCarousel.style.display = 'flex';
    this.storyCarousel.style.transition = 'transform 0.5s ease-in-out';

    this.storyCards.forEach((card) => {
      card.style.flex = '0 0 100%'; // 한 번에 하나의 카드만 보이도록
      card.style.boxSizing = 'border-box';
    });

    this.updateCarousel();
   
  }

  addEventListeners() {
   
    this.prevBtn.addEventListener('click', () => this.prevStory());

    this.nextBtn.addEventListener('click', () => this.nextStory());

    this.expandButtons.forEach((btn, index) => {
      btn.addEventListener('click', () => this.toggleFullContent(index, btn));
    });
  }

  updateCarousel() {
    const offset = -(this.#currentIndex * 100);
    this.storyCarousel.style.transform = `translateX(${offset}%)`;
  }

  prevStory() {
    this.#currentIndex = (this.#currentIndex - 1 + this.storyCards.length) % this.storyCards.length;
    this.updateCarousel();
  }

  nextStory() {
    this.#currentIndex = (this.#currentIndex + 1) % this.storyCards.length;
    this.updateCarousel();
  }

  toggleFullContent(index, btn) {
    const story = this.storyCards[index];
    let fullContent = story.querySelector('.full-content');

    // full-content가 없으면 생성
    if (!fullContent) {
      fullContent = document.createElement('div');
      fullContent.classList.add('full-content');
      fullContent.style.marginTop = '10px';
      fullContent.style.color = '#333';
      fullContent.style.maxHeight = '0';
      fullContent.style.overflow = 'hidden';
      fullContent.style.transition = 'max-height 0.5s ease';

      // 확장 내용 (스토리별)
      const fullTexts = {
        words: "Words can heal, inspire, and uplift. In this story, a simple compliment changes someone's entire day, highlighting the true power of positive speech.",
        acts: "Love isn't always about grand gestures. A cup of coffee made with care or a door held open can say more than words.",
        gifts: "A thoughtful gift tells someone you were thinking of them. It’s not about the price tag, but the love behind it."
      };

      const category = story.dataset.category;
      fullContent.textContent = fullTexts[category] || "More details about this story...";

      story.appendChild(fullContent);
    }

    // 확장/축소 토글 애니메이션
    if (fullContent.style.maxHeight === '0px' || fullContent.style.maxHeight === '0') {
      fullContent.style.maxHeight = fullContent.scrollHeight + 'px';
      btn.textContent = '-'; // 확장 시 버튼 변경
    } else {
      fullContent.style.maxHeight = '0';
      btn.textContent = '+'; // 축소 시 버튼 변경
    }
  }

}
