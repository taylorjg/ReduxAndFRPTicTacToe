[![CircleCI](https://circleci.com/gh/taylorjg/ReduxAndFRPTicTacToe.svg?style=svg)](https://circleci.com/gh/taylorjg/ReduxAndFRPTicTacToe)

[Try it on Heroku](https://reduxandfrptictactoe.herokuapp.com/)
(_it may take 10s to re-activate_)

## Description

This repo contains multiple JavaScript implementations of Tic-Tac-Toe using a variety of Web UI technologies:

* jQuery
* React + Redux
* Angular 1.x (_TODO_)
* Angular 2.x (_TODO_)
* Elm (_TODO_)

In each case, you play against the computer. The computer move makes an AJAX call to a Node.js server
because I wanted to:

* cover making network requests
* cover handling network request errors
* avoid repeating the computer move logic in each client

The computer move logic is pretty basic. It does the following:

* makes the winning computer move, if possible
* blocks the winning human move, if necessary
* picks a random empty square

## Screenshots

TODO
