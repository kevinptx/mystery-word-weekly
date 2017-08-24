const express = require("express")
const app = express()
const emptyArray = []

const fs = require('fs');
const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");

const randomWord = words[Math.floor(Math.random() * words.length)]

//attempt to initialize the emptyArray to print out the dashes according to the size of the given random word.
  for (var i = 0; i < randomWord.length; i++) {
    emptyArray.push("_")
  }


module.exports = {
  randomWord: randomWord,
  emptyArray: emptyArray
}
