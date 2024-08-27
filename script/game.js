class Game {
  #wordle;
  #totalChance;
  #chanceLeft;
  #guessed;
  #score;
  #guessedHistory;

  constructor(wordle, totalChance) {
    this.#wordle = wordle;
    this.#totalChance = totalChance;
    this.#chanceLeft = totalChance;
    this.#guessed = false;
    this.#score = 0;
    this.#guessedHistory = [];
  }

  isGuessCorrect(guessedWord) {
    return this.#wordle.isSame(guessedWord);
  }

  #calculateScore() {
    this.#score =
      (this.#totalChance - (this.#totalChance - this.#chanceLeft) + 1) * 10;
    if (!this.#guessed && this.#chanceLeft === 0) {
      this.#score = 0;
    }
  }

  isGameOver() {
    return this.#chanceLeft === 0 || this.#guessed;
  }

  #registerGuess(guessedWord, correctStats) {
    this.#guessedHistory.push({ guessedWord, correctStats });
  }

  updateGame(guessedWord) {
    this.#guessed = this.isGuessCorrect(guessedWord);
    this.#chanceLeft = this.#chanceLeft - 1;
    this.#calculateScore();
    const letterStats = this.#wordle.calculateLetterStats(guessedWord);
    this.#registerGuess(guessedWord, letterStats);
  }

  get status() {
    const guessedHistory = [...this.#guessedHistory];
    const guessed = this.#guessed;
    const chanceLeft = this.#chanceLeft;
    const score = this.#score;
    const word = this.#wordle.correctWord;

    return { guessed, guessedHistory, chanceLeft, score, word };
  }
}
