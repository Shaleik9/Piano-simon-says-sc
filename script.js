const pianoKeys = document.querySelectorAll('.key');
const commence = document.getElementsByClassName('start')[0];
const levelDisplay = document.getElementsByClassName('level-display')[0];
let ready = false;
let playerSequence = [];
let sequence = [];
let level = 0;
if (level == 0) {
  displayWelcome()
}

pianoKeys.forEach(key => {
  key.addEventListener('click', () => {
    const note = key.dataset.note;
    const audio = new Audio(`keys2/${note}.mp3`);
    audio.play();
    key.classList.add('active');
    setTimeout(() => key.classList.remove('active'), 175)
    setTimeout(() => audio.pause(), 800);
  });
});

function flashKeys(key) {
  const note = key.dataset.note;
  const audio = new Audio(`keys2/${note}.mp3`);
  key.classList.add('active');
  audio.play();
  setTimeout(() => {
    key.classList.remove('active');
    audio.pause();
    audio.currentTime = 0;
  }, 800 - 100 * (level / 2));
}

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
    i++
  }, 1000 - 100 * (level / 2));
}

function addSequence() {
  const randomFlash = Math.floor(Math.random() * pianoKeys.length);
  const randomKey = pianoKeys[randomFlash];
  sequence.push(randomKey.dataset.note);
  if (level === 10) {
    displayWin();
    restart();
    return;
  }
  level++;
  levelDisplay.textContent = `Level: ${level}`;
  levelMessages();
  displaySequence();
}

function handleClick() {
  if (ready == false) return;
  if (document.querySelector('.lossMessage')) return;
  if (document.querySelector('.winMessage')) return;
  const key = this;
  const note = key.dataset.note;
  flashKeys(key);
  playerSequence.push(note);
  if (playerSequence.every((id, index) => id === sequence[index])) {
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

function start() {
  const messageWin = document.querySelector('win');
  if (messageWin) {
    messageWin.remove();
  }
  const messageLoss = document.querySelector('loss');
  if (messageLoss) {
    messageLoss.remove();
  }
  const messageWelcome = document.querySelector('welcome');
  if (messageWelcome) {
    messageWelcome.remove();
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
  const messageWin = document.createElement('win');
  messageWin.textContent = "Congrats, you're built different!";
  messageWin.classList.add('winMessage');
  document.body.appendChild(messageWin);
}

function displayLoss() {
  const messageLoss = document.createElement('loss');
  messageLoss.textContent = `Nice try! you made it to level ${level}.`;
  messageLoss.classList.add('lossMessage');
  document.body.appendChild(messageLoss);
}

function displayWelcome() {
  const messageWelcome = document.createElement('welcome');
  messageWelcome.textContent = `Welcome to Simon Says`;
  messageWelcome.classList.add('welcomeMessage');
  document.body.appendChild(messageWelcome);
}

function levelMessages() {
  if (ready == false) return;
  const levelMessage = document.getElementById('level-message');
  switch (true) {
    case level == 1:
      levelMessage.textContent = 'Simon challenges you';
      break;
    case level == 2:
      levelMessage.textContent = "We're just getting started";
      break;
    case level == 3:
      levelMessage.textContent = "Not bad";
      break;
    case level == 4:
      levelMessage.textContent = "Are you warmed up now?";
      break;
    case level == 5:
      levelMessage.textContent = "You're pretty good, stay focused";
      break;
    case level == 6:
      levelMessage.textContent = "Don't let me distract you";
      break;
    case level == 7:
      levelMessage.textContent = 'Simon says look up here!';
      break;
    case level == 8:
      levelMessage.textContent = 'Prepare for lightspeed';
      break;
    case level == 9:
      levelMessage.textContent = 'How did you get here?';
      break;
    case level == 10:
      levelMessage.textContent = 'Simon challenges you';
      break;
  }
  setTimeout(function () {
    levelMessage.textContent = "";
  }, 1500);
}