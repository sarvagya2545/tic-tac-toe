var cell = document.querySelectorAll('.cell');
var turn = 0;
var i;
var moveArray = ['', '', '', '', '', '', '', '', ''];
var winPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
var won;

callOnLoad();

function callOnLoad() {
  for (i = 0; i < 9; i++) {
    click_listen(i);
  }
}

function click_listen(i) {

  var place = cell[i];
  place.addEventListener('click', function click() {
    callOnClick(place, i);
  });
}

function callOnClick(place, i) {
  if(!place.classList.contains('over'))
  {
    if (!place.classList.contains('taken')) {
      var token = (turn % 2 == 0) ? 'x' : 'o';
      var antiToken = (turn % 2 == 0) ? 'O' : 'X';
      place.innerHTML = "<img src='" + token + ".png' class='token' alt='" + token + "'>";
      turn++;
      place.classList.add('taken');
      moveArray[i] = token;
      var result = checkResult();
      if (turn == 9 && result == "not-end")
        document.querySelector('.statement').innerHTML = "The game is a Draw.<br>Thanks for playing."
      else if (result == 'not-end')
        document.querySelector('.statement').innerHTML = antiToken + " TO PLAY NEXT."
      else {
        var winner = checkResult();
        document.querySelector('.statement').innerHTML = "This game was won by " + winner + ".<br>Thanks for playing.";
        gameOver();
      }
    } else {
      alert("Please don't use filled spots");
    }
  }
  else
  alert("Game is over. Refresh page to start again.");
}

function checkResult() {
  var a, b, c, w = 0;
  for (var i = 0; i < 8; i++) {
    a = winPattern[i][0];
    b = winPattern[i][1];
    c = winPattern[i][2];
    if (moveArray[a] == '' || moveArray[b] == '' || moveArray[c] == '') {
      w = 0;
    } else if (moveArray[a] == moveArray[b] && moveArray[b] == moveArray[c] && moveArray[c] == moveArray[a]) {
      w = 1;
      won = i;
      gameOver();
      return moveArray[a];
    }
  }
  if (w == 0)
    return 'not-end';
}

function gameOver(){
  var place
  for( var i=0; i<9; i++)
  {
    place = cell[i]
    place.classList.add('over');
  }
}
