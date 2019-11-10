// const prompt = require('readline-sync');
const wordBank = require('./word-bank.json');
const widgets = require('./widgets.js');

const config = {
  maxGames: Infinity,
  wordBank: wordBank,
  templates: widgets.TEMPLATES6,
};


const gameSession = widgets.GameSession(config);
gameSession.main();

