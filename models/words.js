const express = require("express")
const app = express()

const fs = require('fs');
const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");

const randomWord = words[Math.floor(Math.random() * words.length)]
//this will create varying levels of difficulty.
function generateWord(level){
  let word = Math.floor[Math.floor(Math.random() * words.length)]
  if (difficulty == 'easy') {
    while(word.length > 6 || word.length < 4){
      word = words[Math.floor(Math.random() * words.length)]
    }
  } else if (difficulty == 'normal'){
    while (word.length > 8 || word.length < 6){
      word = words[Math.floor(Math.random() * words.length)]
    }
  } else if (difficulty == 'hard') {
    while (word.length < 8) {
      word = words[Math.floor(Math.random() * words.length)]
    }
  }
  return word
}

const result = randomWord.split("")
const dashArray = []
//attempt to initialize the emptyArray to print out
//the dashes according to the size of the given random word.
for (var i = 0; i < randomWord.length; i++) {
    dashArray.push("_")
  }


module.exports = {
  result: result,
  dashArray: dashArray,
  randomWord: randomWord
}
