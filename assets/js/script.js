// Creazione elementi DOM

const counterContainer = document.createElement(`div`);
const displayCounter = document.createElement(`span`);
const plusBtn = document.createElement(`button`);
const minusBtn = document.createElement(`button`);
const resetBtn = document.createElement(`button`);
const title = document.createElement(`h1`);

const styles = document.createElement(`style`);

// CSS

styles.textContent = `
body {
    background-color: #151515; 
    margin: 0; 
    padding: 0; 
    box-sizing: border-box; 
    font-family: monospace;
}

.container {
    max-width: 70%; 
    flex-wrap: wrap; 
    background-color: #282828; 
    height: 20rem; 
    width: 20rem; 
    display: flex; 
    border: 3px solid #ffd500; 
    justify-content: center; 
    align-items: flex-end; 
    margin: auto; 
    border-radius: 0.5rem; 
    position: relative; 
    box-shadow: 0 0 5px #ffd500;
}

.title {
    text-align: center; 
    font-size: 2.5rem; 
    text-transform: uppercase; 
    color: #ffd500; 
    text-shadow: 0 0 3px #ffd500; 
    margin-top: 5rem;
}

.display {
    max-width: 70%;
    width: 200px;
    height: 50px;
    background-color: #151515;
    text-shadow: 0 0 5px #ffd500;
    position: absolute;
    top: 2rem;
    border: 3px solid #ffd500;
    border-top: 1px solid #877000;
    border-bottom: 2px solid #877000;
    border-radius: 0.5rem;
    font-size: 2.4rem;
    text-align: right;
    color: #ffd500;
    padding: 0.5rem 0.25rem;
    padding-bottom: 0;
}

.btn-main {
    max-width: 70%; 
    height: 4rem; 
    width: 4rem; 
    margin: 4rem 1rem;
    font-family: monospace; 
    font-size: 2.5rem; 
    color: #151515; 
    background-color: #ffd500; 
    border: 4px solid #877000; 
    border-radius: 0.5rem; 
    border-top: none; 
    transition: all 0.3s ease;
}

.btn-reset {
    position: absolute; 
    bottom: 1rem; 
    font-family: monospace;
    text-transform: uppercase; 
    height: 2rem; 
    width: 10rem; 
    font-size: 1.25rem; 
    color: #ffd500; 
    background-color: #151515;
    border: 4px solid #151515; 
    border-top: none; 
    border-radius: 0.5rem; 
    transition: all 0.3s ease;
}

button:hover {
    box-shadow: 0 0 5px #ffd500;
}

.pressed {
    transform: translateY(4px) scale(0.97);
    box-shadow: 0 2px 3px rgba(15, 15, 15, 0.4);
    transition: transform 0.08s ease, box-shadow 0.08s ease;
}

@keyframes shake {
    0%   { transform: translateX(0) rotate(0deg); }
    20%  { transform: translateX(-6px) rotate(-1deg); }
    40%  { transform: translateX(6px) rotate(1deg); }
    60%  { transform: translateX(-4px) rotate(-1deg); }
    80%  { transform: translateX(4px) rotate(1deg); }
    100% { transform: translateX(0) rotate(0deg); }
}
    
.shake {
    animation: shake 0.3s ease-in-out;
}
`;

counterContainer.classList.add("container");
plusBtn.classList.add("btn-main");
minusBtn.classList.add("btn-main");
resetBtn.classList.add("btn-reset");
title.classList.add("title");
displayCounter.classList.add("display");

// textContent Elementi

title.textContent = `Count on Me!`;
plusBtn.textContent = `+`;
minusBtn.textContent = `-`;
resetBtn.textContent = `Reset`;

// Aggiunta elementi creati

document.head.append(styles);

document.body.append(title);
document.body.append(counterContainer);

counterContainer.append(plusBtn);
counterContainer.append(minusBtn);
counterContainer.append(resetBtn);
counterContainer.append(displayCounter);

// Counter

let counter = 0;
const maxCounter = 999999999;
const minCounter = -999999999;

displayCounter.textContent = counter;

function increase() {
  if (counter < maxCounter) {
    counter++;
    displayCounter.textContent = counter;
    console.log(counter);
    saveCounter();
  } else if (counter === maxCounter) {
    counterShake(counterContainer);
  }
}

function decrease() {
  if (counter > minCounter) {
    counter--;
    displayCounter.textContent = counter;
    saveCounter();
  } else if (counter === minCounter) {
    counterShake(counterContainer);
  }
}

function reset() {
  counter = 0;
  displayCounter.textContent = counter;
  localStorage.setItem("counterValue", 0);
}

function saveCounter() {
  localStorage.setItem("counterValue", counter);
}

function retrieveCounter() {
  const storedCounter = localStorage.getItem("counterValue");
  if (storedCounter !== null) {
    counter = Number(storedCounter);
    displayCounter.textContent = counter;
  }
}

// Funzioni di Animazione

function btnPressed(btn) {
  btn.classList.remove("pressed");
  btn.classList.add("pressed");
  setTimeout(() => {
    btn.classList.remove("pressed");
  }, 100);
}

function counterShake(container) {
  container.classList.add("shake");
  setTimeout(() => {
    container.classList.remove("shake");
  }, 300);
}

// Event Listener (Mouse + Keyboard)

document.addEventListener("DOMContentLoaded", retrieveCounter);

plusBtn.addEventListener(`click`, () => {
  increase();
  btnPressed(plusBtn);
});
minusBtn.addEventListener(`click`, () => {
  decrease();
  btnPressed(minusBtn);
});
resetBtn.addEventListener(`click`, () => {
  reset();
  btnPressed(resetBtn);
});

document.addEventListener(`keydown`, (e) => {
  if (e.key === `+` || e.code === `NumpadAdd`) {
    increase();
    btnPressed(plusBtn);
  } else if (e.key === `-` || e.code === `NumpadSubtract`) {
    decrease();
    btnPressed(minusBtn);
  } else if (e.key === `0` || e.key === `r` || e.code === `Numpad0`) {
    reset();
    btnPressed(resetBtn);
  }
});
