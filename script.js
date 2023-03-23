// Constants and Variables
// const allPianoKeys = ["C4", "Db", "D4", "Eb", "E4", "F4", "Gb", "G4", "Ab", "A4", "Bb", "B4"];
// const whitePianoKeys = ["C4", "D4", "E4", "F4", "G4", "A4", "B4"];
const pianoKeys = document.querySelectorAll('.key');
const commence = document.getElementsByClassName('start')[0];
const levelDisplay = document.getElementsByClassName('level-display')[0];
let ready = false;
let playerSequence = [];
let sequence = [];
let level = 0;
// const difficulty = 1;
// const playerName = 'Player'
// const interval;



//play Audio w/ mouseclick
pianoKeys.forEach(key => {
  key.addEventListener('click', () => {
    const note = key.dataset.note;
    const audio = new Audio(`keys/${note}.mp3`);
    audio.play();
    key.classList.add('active');
    setTimeout(() => key.classList.remove('active'), 175)
    setTimeout(() => audio.pause(), 1000);
  });
});


// Simon Sequence

function flashKeys(key) {
  //console.log("verifying key", key)
  const note = key.dataset.note;
  const audio = new Audio(`keys/${note}.mp3`);
  key.classList.add('active');
  audio.play();
  // console.log("verifying the audio", audio);
  setTimeout(() => {
    key.classList.remove('active');
    audio.pause();
    audio.currentTime = 0;
  }, 800);
}

// Show random flash for user to input
function displaySequence() {
  let i = 0;
  const interval = setInterval(() => {
    if (i >= sequence.length) {
      clearInterval(interval);
      ready = true;
      return;
    }
    const key = document.querySelector(`[data-note=${sequence[i]}]`);
    flashKeys(key);
    //console.log('verifying display sequence after flashkey function');
    i++
  }, 1000);
}

// Add new sequence
function addSequence() {
  const randomFlash = Math.floor(Math.random() * pianoKeys.length);
  const randomKey = pianoKeys[randomFlash];
  // console.log('verifying flash sequence',randomKey);
  sequence.push(randomKey.dataset.note);
  if (level === 1) {
    displayWin();
    restart();
    return;
  }
  level++;
  levelDisplay.textContent = `Level: ${level}`;
  displaySequence();
}

// Check answer / incorrect inputs
function handleClick() {
  //console.log('handle click', ready);
  if (ready == false) return;
  if (document.querySelector('.lossMessage')) return;
  if (document.querySelector('.winMessage')) return;
  const key = this;
  const note = key.dataset.note;
  flashKeys(key);
  playerSequence.push(note);
  if (playerSequence.every((id, index) => id === sequence[index])) {
    //console.log('verifying sequence', playerSequence);
    //console.log('verifying sequence', sequence);
    if (playerSequence.length === level) {
      playerSequence = [];
      addSequence();
    }
  } else {
    displayLoss();
    restart();
    return;
  }
}
// function gameLoss() {
//   displayLoss();
//   restart();
// }

// function gameEnd() {
//   displayWin();
//   restart();
// }

function start() {
  const messageWin = document.querySelector('win');
  if (messageWin) {
    messageWin.remove();
  }
  const messageLoss = document.querySelector('loss');
  if (messageLoss) {
    messageLoss.remove();
  }
  level = 0;
  playerSequence = [];
  sequence = [];
  addSequence();
}

function restart() {
  level = 0;
  playerSequence = [];
  sequence = [];
}

commence.addEventListener('click', () => {
  start();
});

pianoKeys.forEach(key => {
  key.addEventListener('click', handleClick);
});


function displayWin() {
  //console.log('verifying display win')
  const messageWin = document.createElement('win');
  messageWin.textContent = "Congrats, you're built different!";
  messageWin.classList.add('winMessage');
  document.body.appendChild(messageWin);
}

function displayLoss() {
  console.log('verifying display loss');
  const messageLoss = document.createElement('loss');
  messageLoss.textContent = `Nice try! you made it to level ${level}.`;
  messageLoss.classList.add('lossMessage');
  document.body.appendChild(messageLoss);
}