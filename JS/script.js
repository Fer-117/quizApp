const questionTitle = document.getElementById('title');
const optionContainer = document.getElementById('optionContainer');
const buttons = document.querySelectorAll('.question');
const answerMessage = document.getElementById('answerMessage');

const landingPage = document.querySelector('.landingPageSection');
const questionSection = document.querySelector('.questionSection');
const finalScore = document.querySelector('.finalScore');
const highScoreSection = document.querySelector('.highScoreSection');
const startQuizBtn = document.getElementById('startQuiz');

let scoreText = document.querySelector('.score');

let showTimer = document.querySelector('.timer');
let countDown = document.querySelector('.timerCountdown');
let secondsLeft = 50;
var timerInterval;

const inputInitials = document.getElementById('inputInitials');
const submitBtn = document.getElementById('submitBtn');

const goBack = document.getElementById('goBack');

let questionArrayCounter = 0;

let questionCounter = 0;

let answersArray = [];

var highscoresarray =
  JSON.parse(window.localStorage.getItem('highscoresarray')) || [];

if (optionContainer) {
  optionContainer.addEventListener('click', (event) => {
    const element = event.target;
    // console.log(element);
    if (element.matches('button')) {
      const option = element.innerHTML;
      // console.log("inside the if of the optionContainer event listener");
      // console.log(`the current question counter is: ${questionCounter}`);
      // console.log(
      //   `The correct answer is: ${questionArray[questionCounter].answer}`
      // );
      // console.log(`The option you selected is: ${option}`);

      if (option === questionArray[questionCounter].answer) {
        // show the message for congratulations and continue to the next set of questions
        showAnswerMessage('Congratulations! Your answered correctly.');
      } else {
        //show the message for the wrong answer
        // reduce 10 seconds from the timer
        showAnswerMessage();
      }
    } else {
      endQuiz();
    }
  });
}
// cycles to the next question from the questionArray and
// calls the setNextQuestion function to set the message.
function nextQuestion() {
  // event.stopPropagation();
  if (questionCounter < 4) {
    questionCounter++;
    answerMessage.setAttribute('style', 'display: none');
    setNextQuestion();
  } else {
    answerMessage.setAttribute('style', 'display: none');
    setNextQuestion();
    endQuiz();
  }
}

function showAnswerMessage(message) {
  if (message) {
    // set a timer to change to the next question.
    answerMessage.innerHTML = message;
    answerMessage.setAttribute('style', 'display: block');
    setTimeout(nextQuestion, 2000);
  } else {
    answerMessage.innerHTML =
      'Sorry that answer is incorrect, better luck next time!';
    answerMessage.setAttribute('style', 'display: block');

    setTimeout(nextQuestion, 2000);
  }
}

//Todo: loop throught the object array and display the text on the screen
function setNextQuestion() {
  if (questionTitle) {
    questionTitle.innerHTML = questionArray[questionCounter].question;
  }
  if (buttons.length > 0) {
    for (let i = 0; i < questionArray[questionCounter].options.length; i++) {
      buttons[i].innerHTML = questionArray[questionCounter].options[i];
    }
  }
}

function startQuiz() {
  landingPage.setAttribute('style', 'display:none');
  questionSection.setAttribute('style', 'display:block');
  setNextQuestion();
  setTime();
}

function setTime() {
  if (questionCounter >= 4) {
    return;
  }
  showTimer.classList.remove('hide');

  // Sets interval in variable
  timerInterval = setInterval(function () {
    secondsLeft--;
    countDown.textContent = secondsLeft;

    if (secondsLeft === 0 || questionCounter > 4) {
      // Stops execution of action at set interval
      // Calls function to create and append image
      endQuiz();
    }
  }, 1000);
}

function endQuiz() {
  clearInterval(timerInterval);
  questionSection.setAttribute('style', 'display:none');
  finalScore.classList.remove('hide');
  let thisScore = (scoreText.innerHTML = secondsLeft);
}

function updateHighscore() {
  let initials = inputInitials.value;
  var newHighscore = {
    name: initials,
    score: scoreText.textContent,
  };

  highscoresarray.push(newHighscore);
  // console.log(highscoresarray);
  localStorage.setItem('highscoresarray', JSON.stringify(highscoresarray));
}

startQuizBtn.addEventListener('click', startQuiz);
submitBtn.addEventListener('click', updateHighscore);

goBack.addEventListener('click', () => {
  window.location.reload();
  // highScoreSection.setAttribute("style", "display:none");
  // questionSection.setAttribute("style", "display:none");
  // finalScore.setAttribute("style", "display:none");
  // landingPage.setAttribute("style", "display:block");
});
