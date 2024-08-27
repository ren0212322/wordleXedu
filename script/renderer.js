class Renderer {
  constructor() {
    this.chancesLeft = document.querySelector("#chance-left");
    this.guessedHistory = document.querySelector("#guess-history");
    this.scoreElement = document.querySelector("#score");
    this.correctWordElement = document.querySelector("#correct-word");
    this.guessArea = document.querySelector("#guess-area");
    this.previousScore = document.querySelector("#previous-score");
    this.previousWord = document.querySelector("#previous-word");
    this.guessButton = document.querySelector("#guess-button");
  }

  #createGuessContainer() {
    const guessContainer = document.createElement("section");
    guessContainer.classList.add("flex-row");
    return guessContainer;
  }

  #appendClassToLetter(letterElement, isPresent, isCorrectPosition) {
    if (isPresent) {
      const color = isCorrectPosition ? "green" : "yellow";
      letterElement.classList.add(color);
    }
    letterElement.classList.add("box");
    letterElement.classList.add("flex-row");
  }

  #renderLetter(correctStats, guessContainer) {
    correctStats.forEach((letterWithStat) => {
      const { letter, isPresent, isCorrectPosition } = letterWithStat;
      const letterElement = document.createElement("p");

      this.#appendClassToLetter(letterElement, isPresent, isCorrectPosition);
      letterElement.innerText = letter;
      guessContainer.appendChild(letterElement);
    });
  }

  #renderGuessHistory(guessHistory) {
    this.guessedHistory.replaceChildren();

    guessHistory.forEach((guess) => {
      const { correctStats } = guess;
      const guessContainer = this.#createGuessContainer();

      this.#renderLetter(correctStats, guessContainer);
      this.guessedHistory.appendChild(guessContainer);
    });
  }

  #renderScore(score) {
    this.scoreElement.innerText = `Score: ${Number(score)}`;
  }

  #renderCorrectWord(word) {
    this.correctWordElement.innerText = `Correct Word: ${word.toUpperCase()}`;
  }

  #disableGuessButton() {
    this.guessButton.disabled = true;
  }

  #disableGuessArea() {
    this.guessArea.disabled = true;
}

  render(status) {
    const { guessed, guessedHistory, chanceLeft, score, word } = status;
    this.guessArea.value = null;
    this.chancesLeft.innerText = chanceLeft;
    this.#renderGuessHistory(guessedHistory);

    if (chanceLeft === 0 || guessed) {
      this.#disableGuessButton();
      this.#disableGuessArea();
      this.#renderCorrectWord(word);
      this.#renderScore(score);
    }
  }

  renderPreviousScore(previousScore) {
    const { score, word } = previousScore;
    this.previousScore.innerText = `Previous Score: ${score}`;
    this.previousWord.innerText = `Previous Word: ${word}`;
  }
}
