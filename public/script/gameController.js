class GameController {
  constructor(game, renderer, gameStorage) {
    this.game = game;
    this.renderer = renderer;
    this.gameStorage = gameStorage;
  }

  #isWordInvalid(guessedWord) {
    return /[^A-Za-z]/g.test(guessedWord);
  }

  #isLengthInvalid(guessedWord) {
    return guessedWord.length !== 5;
  }

  takeGuess(guessedWord) {
    if (this.#isWordInvalid(guessedWord)) return;
    if (this.#isLengthInvalid(guessedWord)) return;

    const upperCaseGuessedWord = guessedWord.toUpperCase();
    this.game.updateGame(upperCaseGuessedWord);
    const status = { ...this.game.status };
    const { word, score } = status;

    if (this.game.isGameOver()) {
      this.gameStorage.registerScore({ word, score });
    }

    this.renderer.render(status);
  }

  renderPreviousScore() {
    const previousScore = this.gameStorage.gameScore;
    this.renderer.renderPreviousScore(previousScore);
  }
}
