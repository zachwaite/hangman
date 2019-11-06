# hangman
Hangman Assignment for Javascript Fundamentals Fall 2019


# Technical Description

Works using REPL and MVC pattern. The top of the screen is the rendered view.
The bottom of the page is a prompt. Enter data into the prompt, then post the
form. The program updates and re-renders the view.

## widgets.js

The view widgets. Widgets are nestable.

app = the whole thing
header = the top message in a header ( welcome to hangman, to exit ...)
gamestate = the round #, statistics
body = the guy & accessory graphics
letters = the slots and successfully guessed letters
footer = the separation of the view graphics from the prompt

prompt = where the next guess goes
