/**
 * Main entry point for hangman game.
 *
 * See src/widgets.js for component definitions.
 *
 */
const wordBank = require('./word-bank.json');
const widgets = require('./src/widgets.js');
const GameSession = require('./src/GameSession.js').GameSession;

/**
 * Configuration
 *
 * templates: TEMPLATE6 or TEMPLATE8. Allows different number of guesses by manipulating the avatar
 *
 */
const config = {
  maxGames: Infinity,
  wordBank: wordBank,
  templates: widgets.TEMPLATES6,
};


const gameSession = GameSession(config);
gameSession.main();

