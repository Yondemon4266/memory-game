localStorage.setItem(
  "times",
  JSON.stringify([
    {
      mode: "easy",
      time: 504,
      date: Date.now(),
    },
    {
      mode: "medium",
      time: 605,
      date: Date.now(),
    },
    {
      mode: "hard",
      time: 809,
      date: Date.now(),
    },
    {
      mode: "hard",
      time: 194,
      date: Date.now(),
    },
    {
      mode: "hard",
      time: 100,
      date: Date.now(),
    },
    {
      mode: "easy",
      time: 300,
      date: Date.now(),
    },
    {
      mode: "easy",
      time: 312,
      date: Date.now(),
    },
    {
      mode: "easy",
      time: 295,
      date: Date.now(),
    },
    {
      mode: "easy",
      time: 264,
      date: Date.now(),
    },
    {
      mode: "medium",
      time: 204,
      date: Date.now(),
    },
    {
      mode: "medium",
      time: 192,
      date: Date.now(),
    },
    {
      mode: "medium",
      time: 150,
      date: Date.now(),
    },
  ])
);

let bestTimes = getTimeRecords();

// MODE

// FONCTION QUI RETOURNE LE MEILLEUR TEMPS DE TEL MODE
function returnBestTimeOfDifficulty(difficulty) {
  const filteredTimes = bestTimes.filter((el) => el.mode === difficulty);
  if (filteredTimes.length === 0) {
    return null; // Aucun enregistrement pour cette difficulté
  }
  return filteredTimes.reduce((best, current) => {
    return current.time < best.time ? current : best;
  });
}

function putTimeRecord(time) {
  if (bestTimes) {
    const newTimes = bestTimes.push(time);
    localStorage.setItem("times", JSON.stringify(newTimes));
  }
}

function getTimeRecords() {
  return localStorage.getItem("times")
    ? JSON.parse(localStorage.getItem("times"))
    : null;
}

console.log(returnBestTimeOfDifficulty("hard"));
