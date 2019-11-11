const prompt = require('readline-sync');
const Game = require('./Game.js').Game;
const ui = require('./uiWidgets.js');


/**
 * Header widget to display in all states.
 *
 * Uses the `Widget.render()` pattern to 
 * make a pretty output.
 */
const GameHeader = {

  /**
   * Widget for the title, version, etc.
   *
   */
  render: () => {
    const output = [
      ui.H1,
      'Console Hangman' + ' '.repeat(54) + 'Version 1.0',
      ' '.repeat(58) + '(Type ctl + c to quit)',
      ui.H1,
    ];
    console.log(output.join('\n'));
  }
};


/**
 * GameSummary widget to display in all states.
 *
 */
const GameSummary = {

  /**
   * Compute the summary statistics.
   *
   * @param gameHistory {Array}: An array of objects e.g. [{outcome: 'win'}, {outcome: 'loss'}, ...]
   * @returns {Object}: A summary object e.g. {totalGames: 10, win: 6, loss: 4}
   */
  summarize: (gameHistory) => {
    const output = {
      totalGames: 0,
      win: 0,
      loss: 0,
    }
    return gameHistory.reduce((acc, cur) => {
      acc.totalGames++;
      acc[cur.outcome]++;
      return acc;
    }, output);
  },


  /**
   * Render the GameSummary
   *
   * @param vals {Object}: Data to render
   */
  render: (vals) => {

    const outputStats = [
      `Rounds Complete: ${vals.totalGames}`,
      `Wins: ${vals.win}`,
      `Losses: ${vals.loss}`,
    ];

    const output = [
      ui.BR,
      `Current Round: ${vals.totalGames + 1}` + ' '.repeat(24) + outputStats.join(' | '),
    ];

    console.log(output.join('\n'));
  }
};


/**
 *  Footer widget to display messages
 */
const GameFooter = {
  render: (msg) => {
    let c = 0;
    while ( msg.length ) {
      console.log(msg.shift());
      c++;
    }
    while ( c < 2 ) {
      console.log('\n');
      c++;
    }
  }
};


/**
 * Sub-Footer results widget
 *
 */
const GameResult = {
  render: (vals) => {
    if ( vals.outcome === 'win' ) {
      console.log(`Hooray!!! The answer was **${vals.answer}**. You win this round!!!\n`);
    } else {
      console.log(`Sorry... The answer was **${vals.answer}**. You lose this round.\n`);
    }
  }
};


/**
 * Play Again widget to pause execution after a game completes
 */
const PlayAgain = {
  render: () => {
    prompt.question('Press any key to continue >');
  }
};


/**
 * GameSession widget
 *
 * This in the main parent widget for the app. It is responsible for maintaining
 * the history of the games played and the lifecycle of the child widgets.
 */
const GameSession = (config) => {

  const gameHistory = [];

  return {

    /**
     * Main execution loop
     *
     * Each pass through the loop, the appropriate widgets are updated and
     * serialized to the console via the `Widget.render()` method as needed.
     *
     * The widgets (top down):
     * - GameHeader (title, version)
     * - GameSummary (summary stats)
     * - Game (hangman avatar, tries remaining, guesses state & history)
     * - GameFooter (any messages to user)
     * - GameResult (outcome messages)
     * - PlayAgain (prompt to break before clearing console)
     *
     */
    main: () => {
      let gameCount = 0;
      let game = false;
      let msgList = [];

      while ( gameCount < config.maxGames ) {
        console.clear();

        GameHeader.render();

        const summaryData = GameSummary.summarize(gameHistory);
        GameSummary.render(summaryData);

        // start a new game if on round 1 or previous game is complete
        if ( !game ) {
          game = Game(config.wordBank, config.templates);
          gameCount++;
        }

        game.render();

        GameFooter.render(msgList);

        if ( !game.getOutcome() ) {
          // if a game is underway, prepare input and play a turn

          const rawInput = prompt.question('Guess a letter > ').toUpperCase();
          let input = rawInput;

          if ( rawInput.length > 1 ) {
            input = rawInput[0];
            msgList.push(`You entered **${rawInput}**. Only the FIRST LETTER **${input}** was used.\n`);
          } 

          const validInput = game.validateInput(input);
          if ( !validInput ) {
            msgList.push(`You entered **${input}**. Only LETTER values are accepted.\n`);
          }

          const reusedGuess = game.sameGuess(input);
          if ( reusedGuess ) {
            msgList.push(`You entered **${input}**. This value has already been guessed. Please pick a new letter.\n`);
          }

          if ( validInput && !reusedGuess ) {
            game.playTurn(input);
          }

        } else {
          // game is complete, transition to new game

          gameHistory.push({outcome: game.getOutcome()});
          GameResult.render({outcome: game.getOutcome(), answer: game.getAnswer()});
          PlayAgain.render();
          game = false;
        }
      }
    },
  };
};

module.exports = {
  GameSession
};

