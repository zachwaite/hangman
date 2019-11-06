/*
 * UI Components for the program
 */

const states = {
  95: "   0   \n   | \   \n        4 tries left ..."
  96: "   0   \n   | \   \n    \\   3 tries left ..."
  97: "   0   \n   | \   \n  / \\   2 tries left ..."
  99: "   0   \n  /|\\   \n  / \\   You're out!"
}

const newRound = () => 'Type ctl + c to exit';

const main = () => {
  console.clear();
  while (true) {
    newRound();
  }
};
