const express = require("express")
const app = express()
const mustache = require("mustache-express")
const bodyParser = require("body-parser")
const session = require("express-session")
const expressValidator = require("express-validator")
var lowercasePaths = require("express-lowercase-paths")

const words = require("./models/words")
// const randomWordLength = words.result.length
const randomWord = words.randomWord
const dashArray = words.dashArray
const result = words.result

console.log("dashArray", dashArray)
console.log("result", result)
console.log("randomWord", randomWord)

const guessedLetter = []
const guessCount = (result.length + 2)
const emptyArray = []

app.engine("mustache", mustache())
app.set("view engine", "mustache")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: false}))

//session is just an object and you can put stuff on it. You can put guesses on it. You can add guesses to the session and actually call them when you render. You can put generated word on the session, the guesses on the session. This give you easy access.

//amazon can add items
//session needs authentication. keeps track of activities/credentials. Keep track you're unique user on website. what you put into session available to next page you go to. anything sess available for next request.

var sess = {
  secret: "keyboard cat",
  cookie: {},
  saveUninitialized: true,
  resave: true
}
app.use(session(sess))

app.use(function(req, res, next) {
  if (!req.session.pageLoads) {
    req.session.pageLoads = 0
  }
  req.session.pageLoads += 1
  next()
})

app.use(expressValidator())
app.use(lowercasePaths())

//create an empty array that breaks the words up into individual letters (split function).

//make choice when submit or when the page loads.
app.get("/", function(req, res) {
  let winspace = false
  for (let i = 0; i < randomWord.length; i++) {
    if (emptyArray.indexOf(randomWord[i]) >= 0){
      result[i] = randomWord[i]
  } else {
    result[i] = "_"
    winspace = true
  }
}
if (!winspace) {
  res.redirect("/win")
} else {
  res.render("index", {
    dashArray: dashArray,
    guessedLetter: guessedLetter,
    result: result,
    emptyArray: emptyArray,
    randomWord: randomWord
  })
}

})

app.post("/", function(req, res) {
const guessWord = req.body.guess
guessedLetter.push(guessWord)
//some variable that's guess++ and send it back to the user saying 8-i = 7 guesses left.
//then send back to user showing num of guesses left on screen.
for (var i = 0; i < randomWord.length; i++) {
  if (guessWord === randomWord[i]) {
    dashArray[i] = guessWord
    console.log(dashArray)
    //if dashArray is = equal to array_underscore,
    //when those 2 things are same then you win.
  }
}
emptyArray.push(guessWord)
res.redirect("/")
})

//figure out how to get underscores on pg that are equal to the length of the word that's been generated.

//get the length of the randomWord and add dash(es) for the length. dash === randondomWord.length

//render a random word but needs to be _ equal to the length of that random word.
//FIRST get to point at which you can display letter on the page.

//get form to res render to same page. in HTML put the name of the page, get it to the point where you can enter a letter into the input text and hit enter and have it redirect to the page.

//create an empty array that breaks up the word into into individual letters (split method)

app.get("/win", function(req, res) {
res.render("win")
})

app.listen('3000', function() {
console.log('The robots are listening!')
})
