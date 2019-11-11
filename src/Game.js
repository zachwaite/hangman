const ui = require('./uiWidgets.js');


/**
 * Game
 *
 * A Game is composed of rounds of guesses. The number of guesses is determined
 * based upon the templates passed in. e.g. if a templates list with 7 templates
 * is passed, then the limit becomes 6 guesses. (1 for initial state, 6 for each
 * subsequent guess).
 */
const Game = (wordBank, templates) => {

  /**
   * Getter for the gameOutcome private variable.
   */
  const getOutcome = () => {
    return gameOutcome;
  };

  /**
   * Getter for the gameAnswer private variable.
   */
  const getAnswer = () => {
    return gameAnswer;
  };

  /**
   * Generate the initial state of the gameState private variable.
   *
   * The gameState variable maintains the state of the game by tracking each
   * letter (in order), whether the letter has been guessed or not and the
   * UI representation of the letter. If the letter has been correctly
   * guessed the representation is the letter itself, else the letter is
   * represented by a placeholder e.g. '_'.
   *
   * @param word {str}: The result of the randomWord() method.
   * @returns {Array}: An array of objects e.g. [{letter: A, guessed: false, repr: '_'}, ...]
   */
  const initState = (word) => {
    return word.split('').reduce((acc, cur) => {
      acc.push({letter: cur, guessed: false, repr: '_'});
      return acc;
    }, []);
  };

  const render = () => {
    let stateOutput = [
      gameState.map(x => x.repr).join(' '),
      '  '.repeat(6 - gameAnswer.length),
      ' '.repeat(20),
      'Guesses History: ' + gameHistory.join(', ')
    ];
    let output = [
      ui.H2,
      gameTemplates[guessesRemaining],
      ui.BR,
      stateOutput.join(''),
      ui.BR,
      ui.H2,
      ui.BR,
    ];
    console.log(output.join('\n'));
  };

  /**
   * Validate input
   *
   * @param raw {str}: String input
   * @returns {bool}: true if input is valid
   */
  const validateInput = (raw) => {
    const pat = new RegExp('^[a-zA-Z]$');
    return pat.test(raw);
  };

  /**
   * Check if guess has already been tried by looking at the gameHistory private
   * variable.
   *
   * @param guess {str}: A letter
   * @returns {bool}: true if the guess has already been tried
   *
   */
  const sameGuess = (guess) => {
    if ( gameHistory.find(x => x === guess ) ) {
      return true;
    } else {
      return false;
    }
  };

  /**
   * Process a single guess.
   *
   * Multiple things happen here.
   * - gameHistory private variable is extended for tracking
   * - If the guess is new and wrong, then the guessesRemaining variable is decremented
   * - If the guess is new and right, then the gameState variable is updated
   * - If the guess results in winning or losing the game, the gameOutcome variable is set accordingly
   *   Note that gameOutcome has 3 states: 'win', 'loss' and false. win or loss indicate game is over,
   *   while false indicates the game is in progress.
   *
   * @returns {bool}: Always true
   */
  const playTurn = (input) => {
    gameHistory.push(input);

    if ( !gameState.find(x => x.letter === input) ) {
      guessesRemaining--;
    } else {
      gameState.forEach(x => {
        if ( x.letter === input ) {
          x.guessed = true;
          x.repr = x.letter;
        }
      });
    }

    if ( gameState.filter(x => x.guessed === false).length === 0 ){ gameOutcome = 'win'; }
    if ( guessesRemaining === 0 ) { gameOutcome = 'loss'; }

    return true;
  };

  /**
   * Pick a random word from an array;
   *
   * @param words {Array}: An array of words
   * @returns {str}: A single UPPERCASED word
   */
  const randomWord = (words) => {
    const ndx = Math.floor(Math.random() * words.length)
    return words[ndx].toUpperCase();
  };


  let guessesRemaining = Object.keys(templates).length - 1;
  let gameAnswer = randomWord(wordBank);
  let gameTemplates = templates;
  let gameOutcome = false; 
  let gameState = initState(gameAnswer);
  let gameHistory = [];

  return {
    sameGuess: sameGuess,
    validateInput: validateInput,
    getAnswer: getAnswer,
    getOutcome: getOutcome,
    render: render,
    playTurn: playTurn,
  };
};

module.exports = {
  Game
};
