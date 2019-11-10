/*
 * Components for the program
 */

const prompt = require('readline-sync');

const PANEWIDTH = 80;

const fullwidth = (char) => {
  return char.repeat(PANEWIDTH);
};

H1 = fullwidth('=');
H2 = fullwidth('-');
BR = fullwidth(' ');
TAB = '    ';
TAB2 = TAB.repeat(2);
TAB3 = TAB.repeat(3);


const TEMPLATES6 = {
  6: "   ___\n      |\n      |\n      |\n      |\n-----------\n^         ^" + " ".repeat(20) +  "6 tries left",
  5: "   ___\n   0  |\n      |\n      |\n      |\n-----------\n^         ^" + " ".repeat(20) +  "5 tries left",
  4: "   ___\n   0  |\n   |  |\n      |\n      |\n-----------\n^         ^" + " ".repeat(20) +  "5 tries left",
  3: "   ___\n   0  |\n  /|  |\n      |\n      |\n-----------\n^         ^" + " ".repeat(20) +  "5 tries left",
  2: "   ___\n   0  |\n  /|\\ |\n      |\n      |\n-----------\n^         ^" + " ".repeat(20) +  "5 tries left",
  1: "   ___\n   0  |\n  /|\\ |\n  /   |\n      |\n-----------\n^         ^" + " ".repeat(20) +  "5 tries left",
  0: "   ___\n   0  |\n  /|\\ |\n  / \\ |\n      |\n-----------\n^         ^" + " ".repeat(20) +  "You're out!",
}


const Game = (wordBank, templates) => {

  const getOutcome = () => {
    return gameOutcome;
  };

  const getAnswer = () => {
    return gameAnswer;
  };

  const initAnswer = (words) => {
    return randomWord(words);
  }

  const initState = (word) => {
    return word.split('').reduce((acc, cur) => {
      acc.push({letter: cur, guessed: false, repr: '_'});
      return acc;
    }, []);
  };

  const render = () => {
    let output = [
      H2,
      gameTemplates[guessesRemaining],
      BR,
      gameState.map(x => x.repr).join(' ') + ' '.repeat(20) + 'Guesses History: ' + gameHistory.join(', '),
      BR,
      H2,
      BR,
    ];
    console.log(output.join('\n'));
  };

  const playTurn = (input) => {
    // append history
    gameHistory.push(input);

    // update state for new guess
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

    // check if game is won after guess
    if ( gameState.filter(x => x.guessed === false).length === 0 ){
      gameOutcome = 'win';
    }

    // check if any guesses remain
    if ( guessesRemaining === 0 ) {
      gameOutcome = 'loss';
    }

    return true;
  };

  const randomWord = (words) => {
    const ndx = Math.floor(Math.random() * words.length)
    return words[ndx];
  };


  let guessesRemaining = Object.keys(templates).length - 1;
  let gameAnswer = initAnswer(wordBank);
  let gameTemplates = templates;
  let gameOutcome = false; // {false: game in progress, win: game complete & won, loss: game complete and lost}
  let gameState = initState(gameAnswer);
  let gameHistory = [];

  return {
    getAnswer: getAnswer,
    getOutcome: getOutcome,
    render: render,
    playTurn: playTurn,
  };
};

// stateless mini modules
const GameHeader = {
  render: () => {
    const output = [
      H1,
      'Console Hangman' + ' '.repeat(54) + 'Version 1.0',
      ' '.repeat(58) + '(Type ctl + c to quit)',
      H1,
    ];
    console.log(output.join('\n'));
  }
};

const GameSummary = {
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
  render: (vals) => {
    const outputStats = [
      `Games Played: ${vals.totalGames}`,
      `Wins: ${vals.win}`,
      `Losses: ${vals.loss}`,
    ];
    const output = [
      BR,
      'Session History:' + ' '.repeat(26) + outputStats.join(' | '),
    ];
    console.log(output.join('\n'));
  }
};

const GameSession = (config) => {
  const gameHistory = [];
  return {
    main: () => {
      let gameCount = 0;
      let game = false;

      while ( gameCount < config.maxGames ) {
        console.clear();
        GameHeader.render();

        const summaryData = GameSummary.summarize(gameHistory);
        GameSummary.render(summaryData);

        // start a new game if on round 1 or previous game is over
        if ( !game ) {
          game = Game(config.wordBank, config.templates);
          gameCount++;
        }

        // render game screen
        game.render();

        // play a turn
        if ( !game.getOutcome() ) {
          const input = prompt.question('Guess a letter > ');
          game.playTurn(input);
        } else {
          gameHistory.push({outcome: game.getOutcome()});
          console.log(`Game Over. Outcome: ${game.getOutcome()}`);
          const playAgain = prompt.question('Play Again? (Y/N) >');
          if ( playAgain.toLowerCase() === 'n' ) {
            break;
          }
          game = false;
        }
      }
    },
  };
};


module.exports = {
  Game,
  GameHeader,
  GameSession,
  GameSummary,
  TEMPLATES6,
};
