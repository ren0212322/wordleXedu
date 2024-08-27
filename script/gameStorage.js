class GameStorage {
  constructor() {
    this.gameScored = "gameSession";
  }

  registerScore(gameScore) {
    localStorage.setItem(this.gameScored, JSON.stringify(gameScore));
  }

  get gameScore() {
    return { ...JSON.parse(localStorage.getItem(this.gameScored)) };
  }
}
