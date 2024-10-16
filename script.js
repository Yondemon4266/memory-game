const cardURLS = [
  { id: 0, animal: "aigle", url: "./images/aigle.png" },
  { id: 1, animal: "aigle", url: "./images/aigle.png" },
  { id: 2, animal: "cat", url: "./images/cat.png" },
  { id: 3, animal: "cat", url: "./images/cat.png" },
  { id: 4, animal: "cheval", url: "./images/cheval.png" },
  { id: 5, animal: "cheval", url: "./images/cheval.png" },
  { id: 6, animal: "kangaroo", url: "./images/kangaroo.png" },
  { id: 7, animal: "kangaroo", url: "./images/kangaroo.png" },
  { id: 8, animal: "koala", url: "./images/koala.png" },
  { id: 9, animal: "koala", url: "./images/koala.png" },
  { id: 10, animal: "lapin", url: "./images/lapin.png" },
  { id: 11, animal: "lapin", url: "./images/lapin.png" },
  { id: 12, animal: "lion", url: "./images/lion.png" },
  { id: 13, animal: "lion", url: "./images/lion.png" },
  { id: 14, animal: "monkey", url: "./images/monkey.png" },
  { id: 15, animal: "monkey", url: "./images/monkey.png" },
  { id: 16, animal: "panda", url: "./images/panda.png" },
  { id: 17, animal: "panda", url: "./images/panda.png" },
  { id: 18, animal: "phoque", url: "./images/phoque.png" },
  { id: 19, animal: "phoque", url: "./images/phoque.png" },
  { id: 20, animal: "poule", url: "./images/poule.png" },
  { id: 21, animal: "poule", url: "./images/poule.png" },
  { id: 22, animal: "rhino", url: "./images/rhino.png" },
  { id: 23, animal: "rhino", url: "./images/rhino.png" },
];

class MemoryGame {
  constructor(cardURLS) {
    this.cardURLS = cardURLS;
    this.cardArray = [];
    this.difficulty = "easy";
    this.cardList = document.getElementById("cardList");
    this.timeDisplay = document.getElementById("timeDisplay");
    this.modal = document.getElementById("myModal");
    this.modalButton = document.getElementById("start");
    this.resetButton = document.getElementById("reset");
    this.timeRecord = document.getElementById("recordTime");
    this.chronoTime = 0;
    this.counter = 0;
    this.firstSelection = null;
    this.secondSelection = null;
    this.foundCards = [];
    this.changeDifficulty();
    //
    // PENSER A ENREGISTRER LE BEST TIME DANS LOCAL STORAGE.
    this.bestTimes = this.getTimeRecords();
    this.displayBestTime(this.returnBestTimeOfDifficulty(this.difficulty).time);
    //
    this.chronoInterval = null;
    this.modalButton.addEventListener("click", () => {
      this.modal.style.display = "none";
      this.startGame();
    });
  }

  getTimeRecords() {
    return localStorage.getItem("times")
      ? JSON.parse(localStorage.getItem("times"))
      : [];
  }
  putTimeRecord(time, difficulty) {
    this.bestTimes.push({
      mode: difficulty,
      time: time,
      date: Date.now(),
    });
    const newTimes = this.bestTimes;
    console.log(newTimes);

    localStorage.setItem("times", JSON.stringify(newTimes));
  }
  returnBestTimeOfDifficulty(difficulty) {
    if (this.bestTimes) {
      const filteredTimes = this.bestTimes.filter(
        (el) => el.mode === difficulty
      );

      if (filteredTimes.length === 0) {
        return { time: 0 }; // Aucun enregistrement pour cette difficulté
      }

      return filteredTimes.reduce((best, current) => {
        return current.time < best.time ? current : best;
      });
    } else {
      return { time: 0 };
    }
  }

  displayBestTime(time) {
    this.timeRecord.innerHTML = `<p>Record : <span style="font-weight: 800">${this.formatTime(
      time
    )}</span></p>`;
  }
  //

  // general
  startGame() {
    this.resetGame();
    this.shuffleCards();
    this.generateCards();
  }

  resetGame() {
    this.resetClock();
    this.startClock();
    this.cardList.innerHTML = "";
    this.cardList.className = this.difficulty;
  }
  changeDifficulty() {
    // Sélectionne tous les boutons radio
    const radios = document.querySelectorAll("input[type='radio']");

    // Parcourt les boutons radio et trouve celui qui est coché
    radios.forEach((radio) => {
      // Ajoute un listener pour chaque changement de sélection
      radio.addEventListener("change", () => {
        this.difficulty = radio.id;
        // Mets à jour `this.difficulty` quand le bouton change
        const bestTime = this.startGame();
        // Démarre le jeu avec la nouvelle difficulté
        this.displayBestTime(
          this.returnBestTimeOfDifficulty(this.difficulty).time
        );
      });
    });
  }

  // END general

  // CARDS
  shuffleCards() {
    const numCards = this.determineNumberOfCards(this.difficulty);
    // Créer une copie du tableau des cartes pour éviter de modifier l'original
    const cardsToShuffle = this.cardURLS.slice(0, numCards);

    // Mélanger le tableau de cartes
    for (let i = cardsToShuffle.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [cardsToShuffle[i], cardsToShuffle[randomIndex]] = [
        cardsToShuffle[randomIndex],
        cardsToShuffle[i],
      ];
    }
    this.cardArray = cardsToShuffle;

    // Mettre à jour cardArray avec le tableau mélangé
  }

  determineNumberOfCards(difficulty) {
    if (difficulty === "easy") {
      return 16;
    } else if (difficulty === "medium") {
      return 20;
    } else if (difficulty === "hard") {
      return 24;
    } else {
      return 16;
    }
  }
  generateCards() {
    this.cardArray
      .slice(0, this.determineNumberOfCards(this.difficulty))
      .forEach((card) => {
        // CREE LA DIV CARTE ET AJOUTE CLASSE CARD
        const cardDOM = document.createElement("div");
        cardDOM.classList.add("card");
        cardDOM.id = card.id;
        // CREE IMG ET ATTRIBUE L'URL
        const image = document.createElement("img");
        image.setAttribute("draggable", false);
        image.src = card.url;
        // APPEND IMAGE A LA CARD
        cardDOM.appendChild(image);
        cardDOM.setAttribute("animal", card.animal);
        cardDOM.addEventListener("click", () => this.cardClick(cardDOM));
        this.cardList.appendChild(cardDOM);
      });
  }
  cardClick(card) {
    // Vérifie si la carte est déjà trouvée ou déjà cliquée
    if (
      this.foundCards.includes(card.getAttribute("animal")) ||
      card.classList.contains("clicked") ||
      card.classList.contains("match")
    ) {
      return; // Ignore les clics sur les cartes déjà trouvées ou déjà cliquées
    }

    // Si aucune carte n'est sélectionnée
    if (this.counter === 0) {
      card.classList.add("clicked");
      this.firstSelection = {
        id: card.id,
        animal: card.getAttribute("animal"),
      };
      this.counter++;
    }
    // Si une carte est déjà sélectionnée
    else if (this.counter === 1) {
      // Empêche de sélectionner la même carte deux fois
      if (this.firstSelection.id === card.id) {
        return;
      }

      card.classList.add("clicked");
      this.secondSelection = {
        id: card.id,
        animal: card.getAttribute("animal"),
      };
      this.counter++;
      // Vérifie si les deux cartes sont une correspondance
      const match = this.firstSelection.animal === this.secondSelection.animal;
      const selectedCards = document.querySelectorAll(".card.clicked");

      if (match) {
        this.foundCards.push(this.firstSelection.animal);

        selectedCards.forEach((c) => {
          c.classList.remove("clicked");
          c.classList.add("match"); // Ajoute la classe "match" aux paires trouvées
        });
        if (
          this.foundCards.length ===
          this.determineNumberOfCards(this.difficulty) / 2
        ) {
          this.foundCards = [];
          this.putTimeRecord(this.chronoTime, this.difficulty);
          this.displayBestTime(
            this.returnBestTimeOfDifficulty(this.difficulty).time
          );
          this.resetClock();
          setTimeout(() => {
            if (confirm("Félicitations ! Rejouer?")) {
              this.startGame();
            }
            // END
          }, 1500);
        }
        this.firstSelection = null;
        this.secondSelection = null;
        this.counter = 0;
      } else {
        // Si elles ne correspondent pas, affiche temporairement un style de "mauvaise paire"
        selectedCards.forEach((c) => c.classList.add("wrong"));
        setTimeout(() => {
          selectedCards.forEach((c) => {
            c.classList.remove("clicked", "wrong");
          });
          this.firstSelection = null;
          this.secondSelection = null;
          this.counter = 0;
        }, 1000); // Attend 1 seconde avant de réinitialiser les cartes non correspondantes
      }

      // Réinitialise les sélections et le compteur après chaque comparaison
    }
  }

  // END CARDS
  // CLOCK
  startClock() {
    this.timeDisplay.textContent = this.formatTime(this.chronoTime);
    this.chronoInterval = setInterval(() => {
      this.chronoTime++;
      this.timeDisplay.textContent = this.formatTime(this.chronoTime);
    }, 1000);
  }

  resetClock() {
    clearInterval(this.chronoInterval);
    this.chronoTime = 0;
    this.timeDisplay.textContent = this.formatTime(this.chronoTime);
  }
  formatTime(seconds) {
    return `${Math.floor(seconds / 60) < 10 ? "0" : ""}${Math.floor(
      seconds / 60
    )} : ${seconds % 60 < 10 ? "0" : ""}${seconds % 60}`;
  }
  // END CLOCK
}

const game = new MemoryGame(cardURLS);
