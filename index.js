const prompt = require('readline-sync');
const wordBank = require('./word-bank.json');

prompt.question('Type something> ');

console.log(wordBank);
