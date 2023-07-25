//to start game and select level of game
document.querySelector(".button span").onclick = function () {
  document.querySelector(".button span").remove();

  //selesct level
  let div = document.createElement("div");
  div.classList.add("levels");

  let easy = document.createElement("div");
  easy.innerHTML = "Easy";
  easy.classList.add("easy");
  div.appendChild(easy);

  let normal = document.createElement("div");
  normal.innerHTML = "Normal";
  normal.classList.add("normal");
  div.appendChild(normal);

  let hard = document.createElement("div");
  hard.innerHTML = "Hard";
  hard.classList.add("hard");
  div.appendChild(hard);

  document.body.appendChild(div);

  document.querySelector(".reload").addEventListener("click", function () {
    location.reload();
  });
  //when user select level will execute one of these functions

  //for easy level
  easy.addEventListener("click", function () {
    easyLevel();
  });

  //for normal level
  normal.addEventListener("click", function () {
    normalLevel();
  });

  //for hard level
  hard.addEventListener("click", function () {
    hardLevel();
  });
};

//arrays of words for each level
let hardWord = [
  "achievement",
  "activity",
  "advantage",
  "amazing",
  "bathroom",
  "capital",
  "concept",
  "defense",
  "fantasy",
  "electronic",
  "grandmother",
  "historical",
  "immediate",
  "introduce",
  "material",
  "necessary",
  "observation",
  "original",
  "percentage",
  "personnel",
  "population",
  "powerful",
  "schedule",
  "satisfy",
  "statement",
  "statistics",
  "successful",
  "suicide",
  "television",
  "vegetable",
];
let normalWord = [
  "accept",
  "access",
  "about",
  "above",
  "across",
  "adjust",
  "affair",
  "among",
  "become",
  "catch",
  "country",
  "delay",
  "father",
  "gray",
  "ignore",
  "image",
  "inside",
  "journal",
  "legal",
  "market",
  "narrow",
  "occur",
  "payment",
  "platform",
  "pound",
  "prefer",
  "reason",
  "sound",
  "stomach",
  "student",
];
let easyWord = [
  "able",
  "add",
  "again",
  "age",
  "aim",
  "air",
  "animal",
  "another",
  "bed",
  "before",
  "basic",
  "bus",
  "call",
  "chair",
  "cook",
  "cover",
  "deep",
  "effect",
  "edge",
  "empty",
  "fail",
  "fat",
  "fear",
  "fee",
  "gun",
  "hold",
  "iron",
  "job",
  "low",
  "owner",
];

//some general varaible
let numberOfWords = 30;
let timerEasy = 6;
let timerNormal = 5;
let timerHard = 5;

//function for easy level
function easyLevel() {
  //remove splash screen
  document.querySelector(".levels").remove();
  document.querySelector(".button").remove();
  document.querySelector("input").focus();
  //set values in top
  document.querySelector(".level span").innerHTML = "Easy";
  document.querySelector(".second span").innerHTML = timerEasy;
  document.querySelector(".score .current-score").innerHTML = 0;
  document.querySelector(".score .total-score").innerHTML = numberOfWords;

  //set random word into her own span
  fetchWord(easyWord);

  //to start the game
  startPlay();
}

//function for normal level
function normalLevel() {
  //remove splash screen
  document.querySelector(".levels").remove();
  document.querySelector(".button").remove();
  document.querySelector("input").focus();
  //set values in top
  document.querySelector(".level span").innerHTML = "Normal";
  document.querySelector(".second span").innerHTML = timerNormal;
  document.querySelector(".score .current-score").innerHTML = 0;
  document.querySelector(".score .total-score").innerHTML = numberOfWords;

  //set random word into her own span
  fetchWord(normalWord);

  //to start the game
  startPlay();
}

//function for hard level
function hardLevel() {
  //remove splash screen
  document.querySelector(".levels").remove();
  document.querySelector(".button").remove();
  document.querySelector("input").focus();
  //set values in top
  document.querySelector(".level span").innerHTML = "Hard";
  document.querySelector(".second span").innerHTML = timerHard;
  document.querySelector(".score .current-score").innerHTML = 0;
  document.querySelector(".score .total-score").innerHTML = numberOfWords;

  //set random word into her own span
  fetchWord(hardWord);

  //to start the game
  startPlay();
}

//function to get random word then set it into span
function fetchWord(words) {
  //get random word
  let indexWord = Math.floor(Math.random() * words.length);
  let randomWord = words[indexWord];
  //set word in span
  document.querySelector(".word").append(randomWord);
  words.splice(indexWord, 1);

  //set all words into her own box
  let allWords = document.querySelector(".all-words");
  words.forEach((word) => {
    let span = document.createElement("span");
    span.append(word);
    span.classList.add("words");
    allWords.appendChild(span);
  });

  //to save remander of words into her own array
  if (document.querySelector(".level span").innerHTML == "Easy") {
    easyWord = words;
  } else if (document.querySelector(".level span").innerHTML == "Normal") {
    normalWord = words;
  } else if (document.querySelector(".level span").innerHTML == "Hard") {
    hardWord = words;
  }
}

//funtion to start the game
function startPlay() {
  //specific to levels
  if (document.querySelector(".level span").innerHTML == "Easy") {
    matched(timerEasy, easyWord);
  } else if (document.querySelector(".level span").innerHTML == "Normal") {
    matched(timerNormal, normalWord);
  } else if (document.querySelector(".level span").innerHTML == "Hard") {
    matched(timerHard, hardWord);
  }
}

//function to end the game if user loses
function gameOver() {
  let div = document.createElement("div");
  div.innerHTML = "Game Over";
  div.classList.add("game-over");
  document.body.appendChild(div);
}

//function to end the game if user wins
function winner() {
  let div = document.createElement("div");
  div.innerHTML = "Congrats";
  div.classList.add("winner");
  document.body.appendChild(div);
}

//function to check word with correct word and take actions
function matched(secondAvailable, words) {
  document.querySelector(".counter span").innerHTML = secondAvailable;
  let counter = setInterval(function () {
    document.querySelector(".counter span").innerHTML--;
    if (
      document.querySelector(".word").innerHTML.toLowerCase() ==
      document.querySelector("input").value.toLowerCase()
    ) {
      document.querySelector("input").value = "";
      document.querySelector(".word").innerHTML = "";
      document.querySelector(".all-words").innerHTML = "";
      document.querySelector(".score .current-score").innerHTML++;
      if (
        document.querySelector(".score .current-score").innerHTML ==
        numberOfWords
      ) {
        winner();
        clearInterval(counter);
      } else {
        fetchWord(words);
        clearInterval(counter);
        startPlay();
      }
    } else if (document.querySelector(".counter span").innerHTML == "0") {
      gameOver();
      clearInterval(counter);
    }
  }, 1000);
}
