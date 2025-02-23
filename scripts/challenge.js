export default new class Challenge {
  constructor() {
    this.challengeText = document.getElementById('challenge-text');
    this.newChallengeBtn = document.getElementById('new-challenge');
    this.dayElements = document.querySelectorAll('.day');

    this.challenges = [
      "Give your loved one a genuine compliment today. 💖", // Words of Affirmation
      "Do a small chore for someone without being asked. 🧹", // Acts of Service
      "Surprise someone with a small gift. 🎁", // Receiving Gifts
      "Take a walk together and have a meaningful conversation. 🚶‍♂️🚶‍♀️", // Quality Time
      "Give someone a warm hug today. 🤗", // Physical Touch
      "Write a heartfelt letter to someone special. ✉️",
      "Listen attentively without interrupting. 👂",
      "Watch a favorite movie together. 🎬"
    ];

    this.currentDay = 1;
    this.init();
  }

  init() {
    this.newChallengeBtn.addEventListener('click', () => {
      this.loadNewChallenge();
      this.markDayCompleted();
    });
  }

  loadNewChallenge() {
    const randomIndex = Math.floor(Math.random() * this.challenges.length);
    this.challengeText.textContent = this.challenges[randomIndex];
  }

  markDayCompleted() {
    if (this.currentDay < this.dayElements.length) {
      this.dayElements[this.currentDay].classList.add('completed');
      this.currentDay++;
    } else {
      alert("You've completed all 5 challenges! 🎉");
    }
  }
}
