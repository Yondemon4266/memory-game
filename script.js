const cardURLS = [
  { id: 0, animal: "aigle", url: "./images/aigle.png" },
  { id: 1, animal: "cat", url: "./images/cat.png" },
  { id: 2, animal: "cheval", url: "./images/cheval.png" },
  { id: 3, animal: "kangaroo", url: "./images/kangaroo.png" },
  { id: 4, animal: "koala", url: "./images/koala.png" },
  { id: 5, animal: "lapin", url: "./images/lapin.png" },
  { id: 6, animal: "lion", url: "./images/lion.png" },
  { id: 7, animal: "monkey", url: "./images/monkey.png" },
  { id: 8, animal: "panda", url: "./images/panda.png" },
  { id: 9, animal: "phoque", url: "./images/phoque.png" },
  { id: 10, animal: "poule", url: "./images/poule.png" },
  { id: 11, animal: "rhino", url: "./images/rhino.png" },
  { id: 12, animal: "aigle", url: "./images/aigle.png" },
  { id: 13, animal: "cat", url: "./images/cat.png" },
  { id: 14, animal: "cheval", url: "./images/cheval.png" },
  { id: 15, animal: "kangaroo", url: "./images/kangaroo.png" },
  { id: 16, animal: "koala", url: "./images/koala.png" },
  { id: 17, animal: "lapin", url: "./images/lapin.png" },
  { id: 18, animal: "lion", url: "./images/lion.png" },
  { id: 19, animal: "monkey", url: "./images/monkey.png" },
  { id: 20, animal: "panda", url: "./images/panda.png" },
  { id: 21, animal: "phoque", url: "./images/phoque.png" },
  { id: 22, animal: "poule", url: "./images/poule.png" },
  { id: 23, animal: "rhino", url: "./images/rhino.png" },
];

class MemoryGame {
  constructor(difficulty) {
    this.difficulty = difficulty;
    this.numberOfCard = this.determineNumberOfCards(this.difficulty);
    this.cardList = document.getElementById("cardList");
    this.startButton = document.getElementById("start");
    this.resetButton = document.getElementById("reset");
    this.playing = false;
    // this.generateCards(this.numberOfCard, this.difficulty);
    this.counter = 0;
    this.firstSelection = null;
    this.secondSelection = null;
    this.foundCards = [];
    this.chronoTime = 300;
    this.chronoInterval = null;
    this.resetButton.addEventListener("click", this.resetGame);
    this.startButton.addEventListener("click", this.startGame);
  }
  //   POUR PALLIER DIFFICULTE AU NOMBRE DE CARTES.
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

  //   GENERER LES CARTES DANS LE DOM
  generateCards(nb, difficulty) {
    this.cardList.classList.add(difficulty);
    cardURLS.slice(0, nb).forEach((card) => {
      // CREE LA DIV CARTE ET AJOUTE CLASSE CARD
      const cardDOM = document.createElement("div");
      cardDOM.classList.add("card");
      cardDOM.id = card.id;
      // CREE IMG ET ATTRIBUE L'URL
      const image = document.createElement("img");
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
    // if (!this.playing) return;
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
        if (this.foundCards.length === this.numberOfCard / 2) {
          setTimeout(() => {
            alert("end");
            // END
          }, 1500);
        }
      } else {
        // Si elles ne correspondent pas, affiche temporairement un style de "mauvaise paire"
        selectedCards.forEach((c) => c.classList.add("wrong"));
        setTimeout(() => {
          selectedCards.forEach((c) => {
            c.classList.remove("clicked", "wrong");
          });
        }, 1000); // Attend 1 seconde avant de réinitialiser les cartes non correspondantes
      }

      // Réinitialise les sélections et le compteur après chaque comparaison
      this.firstSelection = null;
      this.secondSelection = null;
      this.counter = 0;
    }
  }

  startGame() {
    this.generateCards(this.numberOfCard, this.difficulty);
  }

  resetGame() {
    Array.from(document.getElementById("cardList").children).forEach(
      (child) => {
        child.classList.remove("match");
      }
    );
  }

  // difficultyButtonListener() {

  // }

  // changeDifficulty() {

  // }
}

const game = new MemoryGame("hard");

console.log(game);

// 8 10 12
