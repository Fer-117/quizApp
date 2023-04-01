const questionTitle = document.getElementById("title");
const optionContainer = document.getElementById("optionContainer");
const buttons = document.querySelectorAll(".question");
const answerMessage = document.getElementById("answerMessage");

// TODO
// target the div, input and button for the name
// collect the value of the input on click of "save name" button
// on the same click event, remove the hide class from the questions container and add it to the nameInput container
// the colected name from the input should go in an object which will later have the timer value as well
// at the end of thequiz add the timer value with the time left, to the forementioned object
// push the object inside the highscores array from Local Storage
// redirect to the Highscores page and retrieve that array (highscores) from ls

let questionArrayCounter = 0;

let questionCounter = 0;

let answersArray = [];
localStorage.setItem("answers", answersArray);

if (buttons.length > 0) {
  console.log("here it is", buttons);
}
const highscoresarray = [
  {
    name: "",
    score: 0,
  },
  {
    name: "Fernndo",
    score: 0,
  },
  ,
];

if (optionContainer) {
  optionContainer.addEventListener("click", (event) => {
    const element = event.target;
    // console.log(element);
    if (element.matches("button")) {
      const option = element.innerHTML;
      // console.log("inside the if of the optionContainer event listener");
      // console.log(`the current question counter is: ${questionCounter}`);
      // console.log(
      //   `The correct answer is: ${questionArray[questionCounter].answer}`
      // );
      // console.log(`The option you selected is: ${option}`);

      if (option === questionArray[questionCounter].answer) {
        // show the message for congratulations and continue to the next set of questions
        showAnswerMessage("Congratulations! Your answered correctly.");
        answersArray.push(option);
        localStorage.setItem("answers", answersArray);
      } else {
        //show the message for the wrong answer
        // reduce 10 seconds from the timer
        showAnswerMessage();
        answersArray.push(option);
        localStorage.setItem("answers", answersArray);
      }
    } else {
      answerMessage.innerHTML = "you are finished";
      questionCounter = 4;
      endQuiz();
      return;
    }
  });
}
function nextQuestion() {
  // event.stopPropagation();
  if (questionCounter < 4) {
    questionCounter++;
    answerMessage.setAttribute("style", "visibility: hidden");
    console.log(
      `Inside the nextQuestion function, the counter is ${questionCounter}`
    );
    setNextQuestion();
  } else {
    answerMessage.innerHTML = "you are finished";
    return;
  }
}

function showAnswerMessage(message) {
  if (message) {
    console.log("Inside showAnswerMessage function");
    answerMessage.innerHTML = message;
    answerMessage.setAttribute("style", "visibility: visible");
    // set a timer to change to the next question.

    setTimeout(nextQuestion, 2000);
  } else {
    answerMessage.innerHTML =
      "Sorry that answer is incorrect, better luck next time!";
    answerMessage.setAttribute("style", "visibility: visible");
    setTimeout(nextQuestion, 2000);
  }
}

function setNextQuestion() {
  console.log("Entered loop question Array function");
  //Todo: loop throught the object array and display the text on the screen

  if (questionTitle) {
    questionTitle.innerHTML = questionArray[questionCounter].question;
  }
  if (buttons.length > 0) {
    for (let i = 0; i < questionArray[questionCounter].options.length; i++) {
      buttons[i].innerHTML = questionArray[questionCounter].options[i];
    }
  }
}

const endQuiz = () => {
  setTimeout(() => {}, 2000);
  // we're setting the ddress for our website -- redirecting to the highscore page
  window.location.href = "highScore.html";
};
setNextQuestion();
