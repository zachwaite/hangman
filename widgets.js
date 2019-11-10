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


const TEMPLATES6 = {
  6: "   ___\n      |\n      |\n      |\n      |\n-----------\n^         ^" + " ".repeat(20) +  "6 tries left",
  5: "   ___\n   0  |\n      |\n      |\n      |\n-----------\n^         ^" + " ".repeat(20) +  "5 tries left",
  4: "   ___\n   0  |\n   |  |\n      |\n      |\n-----------\n^         ^" + " ".repeat(20) +  "4 tries left",
  3: "   ___\n   0  |\n  /|  |\n      |\n      |\n-----------\n^         ^" + " ".repeat(20) +  "3 tries left",
  2: "   ___\n   0  |\n  /|\\ |\n      |\n      |\n-----------\n^         ^" + " ".repeat(20) +  "2 tries left",
  1: "   ___\n   0  |\n  /|\\ |\n  /   |\n      |\n-----------\n^         ^" + " ".repeat(20) +  "1 try left",
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
    let stateOutput = [
      gameState.map(x => x.repr).join(' '),
      '  '.repeat(6 - gameAnswer.length),
      ' '.repeat(20),
      'Guesses History: ' + gameHistory.join(', ')
    ];
    let output = [
      H2,
      gameTemplates[guessesRemaining],
      BR,
      stateOutput.join(''),
      BR,
      H2,
      BR,
    ];
    console.log(output.join('\n'));
  };

  const validateInput = ( raw ) => {
    const pat = new RegExp('^[a-zA-Z]$');
    return pat.test(raw);
  };

  const sameGuess = ( guess ) => {
    if ( gameHistory.find(x => x === guess ) ) {
      return true;
    } else {
      return false;
    }
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
    return words[ndx].toUpperCase();
  };


  let guessesRemaining = Object.keys(templates).length - 1;
  let gameAnswer = initAnswer(wordBank);
  let gameTemplates = templates;
  let gameOutcome = false; // {false: game in progress, win: game complete & won, loss: game complete and lost}
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
      `Rounds Complete: ${vals.totalGames}`,
      `Wins: ${vals.win}`,
      `Losses: ${vals.loss}`,
    ];
    const output = [
      BR,
      `Current Round: ${vals.totalGames + 1}` + ' '.repeat(24) + outputStats.join(' | '),
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
      let msg = [];

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

        // render messages
        while ( msg.length ) {
          console.log(msg.shift());
        }

        // play a turn or display results
        if ( !game.getOutcome() ) {
          const rawInput = prompt.question('Guess a letter > ').toUpperCase();
          let input = rawInput;

          if ( rawInput.length > 1 ) {
            input = rawInput[0];
            msg.push(`You entered **${rawInput}**. Only the FIRST LETTER **${input}** was used.\n`);
          } 

          const validInput = game.validateInput(input);
          if ( !validInput ) {
            msg.push(`You entered **${input}**. Only LETTER values are accepted.\n`);
          }

          const reusedGuess = game.sameGuess(input);
          if ( reusedGuess ) {
            msg.push(`You entered **${input}**. This value has already been guessed. Please pick a new letter.\n`);
          }

          if ( validInput && !reusedGuess ) {
            game.playTurn(input);
          }

        } else {
          gameHistory.push({outcome: game.getOutcome()});
          if ( game.getOutcome() === 'win' ) {
            console.log(`Hooray!!! The answer was **${game.getAnswer()}**. You win this round!!!\n`);
          } else {
            console.log(`Sorry... The answer was **${game.getAnswer()}**. You lose this round.\n`);
          }

          const playAgain = prompt.question('Press any key to continue >');
          if ( playAgain.toUpperCase() === 'n' ) {
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
