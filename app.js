const express = require("express")
const app = express()
const mustache = require("mustache-express")
const bodyParser = require("body-parser")
const session = require("express-session")
const validator = require("express-validator")


const words = require("./words")
const randomWord = words.randomWord
const randomWordLength = words.randomWord.length
const emptyArray = words.emptyArray
console.log(emptyArray)

const mysteryWord = randomWord.split("")
const guessedLetter = []

app.engine("mustache", mustache())
app.set("view engine", "mustache")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: false }))

//session is just an object and you can put stuff on it. You can put guesses on it. You can add guesses to the session and actually call them when you render. You can put generated word on the session, the guesses on the session. This give you easy access.

//amazon can add items
//session needs authentication. keeps track of activities/credentials. Keep track you're unique user on website. what you put into session available to next page you go to. anything sess available for next request.

var sess = {
  secret: "JWORULESSEKRETKEY",
  cookie: {},
  saveUninitialized: true,
  resave: true
}
app.use(session(sess))

//create an empty array that breaks the words up into individual letters (split function).

//make choice when submit or when the page loads.
app.get("/", function(req, res) {
  // for (var i = 0; i < mysteryWord.length; i++) {
  //   if(guessedLetter[i] === mysteryWord[i]) {
  //     emptyArray[i] = guessedLetter
  //     console.log(guessedLetter)
  //   }
  // }

  res.render("index", {
    randomWord: randomWord,
    guessedLetter: guessedLetter,
    mysteryWord: mysteryWord,
    emptyArray: emptyArray
  })
})

app.post("/", function(req, res){
  const guessWord = req.body.guess
  guessedLetter.push(guessWord)
  //some variable that's guess++ and send it back to the user saying 8-i = 7 guesses left.
  //then send back to user showing num of guesses left on screen.
  for (var i = 0; i < mysteryWord.length; i++) {
    if(guessWord === mysteryWord[i]) {
      emptyArray[i] = guessWord
      console.log(emptyArray)
    }
  }


  res.redirect("/")
})


//figure out how to get underscores on pg that are equal to the length of the word that's been generated.

//get the length of the randomWord and add dash(es) for the length. dash === randondomWord.length


//render a random word but needs to be _ equal to the length of that random word.
//FIRST get to point at which you can display letter on the page.


//get form to res render to same page. in HTML put the name of the page, get it to the point where you can enter a letter into the input text and hit enter and have it redirect to the page.



//create an empty array that breaks up the word into into individual letters (split method)

app.listen('3000', function(){
  console.log('The robots are listening!')
})
