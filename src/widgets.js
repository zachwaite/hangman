/**
 * Random UI components for the program
 */

// width of the program. Could be used in the future to make the width dynamic.
const PANEWIDTH = 80;

/**
 *  Generate a line of characters as wide as the pane
 *
 *  @param char {str}: The character to repeat
 *  @returns {str}: The char, repeated PANEWIDTH times
 *
 */
const fullwidth = (char) => {
  return char.repeat(PANEWIDTH);
};

H1 = fullwidth('=');
H2 = fullwidth('-');
BR = fullwidth(' ');

/**
 * A 6 guess template
 */
const TEMPLATES6 = {
  6: "   ___\n      |\n      |\n      |\n      |\n-----------\n^         ^" + " ".repeat(20) +  "6 tries left",
  5: "   ___\n   0  |\n      |\n      |\n      |\n-----------\n^         ^" + " ".repeat(20) +  "5 tries left",
  4: "   ___\n   0  |\n   |  |\n      |\n      |\n-----------\n^         ^" + " ".repeat(20) +  "4 tries left",
  3: "   ___\n   0  |\n  /|  |\n      |\n      |\n-----------\n^         ^" + " ".repeat(20) +  "3 tries left",
  2: "   ___\n   0  |\n  /|\\ |\n      |\n      |\n-----------\n^         ^" + " ".repeat(20) +  "2 tries left",
  1: "   ___\n   0  |\n  /|\\ |\n  /   |\n      |\n-----------\n^         ^" + " ".repeat(20) +  "1 try left",
  0: "   ___\n   0  |\n  /|\\ |\n  / \\ |\n      |\n-----------\n^         ^" + " ".repeat(20) +  "You're out!",
}

/**
 * An 8 guess template
 */
const TEMPLATES8 = {
  8: "   ___\n      |\n      |\n      |\n      |\n-----------\n^         ^" + " ".repeat(20) +  "8 tries left",
  7: "   ___\n   |  |\n      |\n      |\n      |\n      |\n      |\n-----------\n^         ^" + " ".repeat(20) +  "7 tries left",
  6: "   ___\n   |  |\n   0  |\n      |\n      |\n      |\n      |\n-----------\n^         ^" + " ".repeat(20) +  "6 tries left",
  5: "   ___\n   |  |\n   0  |\n   |  |\n      |\n      |\n      |\n-----------\n^         ^" + " ".repeat(20) +  "5 tries left",
  4: "   ___\n   |  |\n   0  |\n  /|  |\n      |\n      |\n      |\n-----------\n^         ^" + " ".repeat(20) +  "4 tries left",
  3: "   ___\n   |  |\n   0  |\n  /|\\ |\n      |\n      |\n      |\n-----------\n^         ^" + " ".repeat(20) +  "3 tries left",
  2: "   ___\n   |  |\n   0  |\n  /|\\ |\n   |  |\n      |\n      |\n-----------\n^         ^" + " ".repeat(20) +  "2 tries left",
  1: "   ___\n   |  |\n   0  |\n  /|\\ |\n   |  |\n  /   |\n      |\n-----------\n^         ^" + " ".repeat(20) +  "1 try left",
  0: "   ___\n   |  |\n   0  |\n  /|\\ |\n   |  |\n  / \\ |\n      |\n-----------\n^         ^" + " ".repeat(20) +  "You're out!",
}


module.exports = {
  TEMPLATES6,
  TEMPLATES8,
  H1,
  H2,
  BR,
};
