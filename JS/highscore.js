const highScoreInitials = document.getElementById('highScoreInitials') || '';
const clearHighscore = document.getElementById('clearHighscore');

function renderMessage() {
  var lastGrade = JSON.parse(localStorage.getItem('highscoresarray')) || [];
  if (lastGrade) {
    for (let i = 0; i < lastGrade.length; i += 1) {
      var tag = document.createElement('li');

      tag.innerHTML = lastGrade[i].name + ' received a  ' + lastGrade[i].score;
      highScoreInitials.appendChild(tag);
    }
  } else return;
  console.log(tag.textContent);
}

clearHighscore.addEventListener('click', () => {
  console.log('cleared');
  highscoresarray = [];
  localStorage.setItem('highscoresarray', JSON.stringify(highscoresarray));
  window.location.reload();
});

renderMessage();
