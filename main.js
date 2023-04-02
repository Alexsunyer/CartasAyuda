"use strict";

const ul = document.querySelector("#Baraja");
const emojis = ["🥳", "🫨", "🤠", "🤖", "🤡", "🥶", "💩", "🥸"];

const generarMazo = () => {
  const mazoCartas = [...emojis, ...emojis];

  while (mazoCartas.length > 0) {
    const randomNum = Math.floor(Math.random() * mazoCartas.length);
    const card = mazoCartas[randomNum];
    const li = document.createElement("li");
    li.innerHTML = `<div class="content"><div class="front">❔</div><div class="back">${card}</div></div>`;
    li.classList.add("card");
    ul.append(li);
    mazoCartas.splice(randomNum, 1);
  }
};

generarMazo();

let attempts = 0;
const ganador = () => {
  const solvedCards = document.querySelectorAll(".solved");
  if (solvedCards.length === 16) {
    if (attempts === 8) {
      alert(`HAS GANADO! TE HA TOMADO ${attempts} INTENTOS! ERES UN MÁQUINA`);
    } else if (attempts <= 16) {
      alert(
        `HAS GANADO! TE HA TOMADO ${attempts} INTENTOS! PERO TAMPOCO ERES TAN MÁQUINA...`
      );
    } else
      alert(
        `HAS GANADO! TE HA TOMADO ${attempts} INTENTOS! PERO TIENES QUE PRACTICAR MÁS...`
      );
  }
};

const cards = document.querySelectorAll(".card");

const levantarPareja = () => {
  const flippedCards = document.querySelectorAll(".selected");
  if (flippedCards.length === 2) {
    attempts++;
    const [card1, card2] = flippedCards;
    // const card1 = flippedCards[0];
    // const card2 = flippedCards[1];
    if (card1.textContent === card2.textContent) {
      for (const card of flippedCards) {
        card.classList.add("solved");
        card.classList.remove("selected");
        card.removeEventListener("click", flip);
      }
      ganador();
    } else {
      card1.classList.remove("selected");
      card2.classList.remove("selected");
      setTimeout(() => {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
      }, 1000);
    }
  }
};

const flip = (e) => {
  const currentCard = e.currentTarget;
  const selectedCards = document.querySelectorAll(".selected");
  console.log(selectedCards);
  if (selectedCards.length < 2) {
    currentCard.classList.add("flipped", "selected");
  }

  // const icono = currentCard.querySelector(".back");
  levantarPareja();
};

for (const card of cards) {
  card.addEventListener("click", flip);
}
