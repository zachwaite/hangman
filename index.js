/**
 * Main entry point for hangman game.
 *
 * See src/* for components
 *
 */
const wordBank = require('./word-bank.json');
const ui = require('./src/uiWidgets.js');
const GameSession = require('./src/GameSession.js').GameSession;

/**
 * Configuration
 *
 * Items
 * =============
 * - maxGames {int}: Limt the number of games in a session. Helpful to keep you
 *   from staying up all night playing hangman.
 * - wordBank {Array}: A single array of random words.
 * - templates {Object}: (import and use ui.TEMPLATE6 or ui.TEMPLATE8) Allows
 *   different number of guesses by providing an avatar with the right number
 *   of parts.
 *
 */
const config = {
  maxGames: Infinity,
  wordBank: wordBank,
  templates: ui.TEMPLATES6,
};


const gameSession = GameSession(config);
gameSession.main();

