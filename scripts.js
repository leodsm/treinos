const dayOfWeekSelect = document.getElementById("dayOfWeek");
const exercisesContainer = document.getElementById("exercises");
const startTimerButton = document.getElementById("startTimer");
const resetTimerButton = document.getElementById("resetTimer");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

let timerInterval;
let timerRunning = false;

dayOfWeekSelect.addEventListener("change", displayExercises);
startTimerButton.addEventListener("click", toggleTimer);
resetTimerButton.addEventListener("click", resetTimer);

displayExercises();

function displayExercises() {
  const selectedDay = dayOfWeekSelect.value;
  const exercises = getExercisesForDay(selectedDay);

  exercisesContainer.innerHTML = "";

  exercises.forEach((exercise) => {
    const exerciseItem = document.createElement("li");
    exerciseItem.classList.add("exercise-item");

    const exerciseTitle = document.createElement("h3");
    exerciseTitle.textContent = exercise.name;
    exerciseItem.appendChild(exerciseTitle);

    const exerciseDescription = document.createElement("p");
    exerciseDescription.textContent = exercise.description;
    exerciseItem.appendChild(exerciseDescription);

    const timer = document.createElement("span");
    timer.classList.add("timer");
    timer.textContent = "00:00";
    exerciseItem.appendChild(timer);

    const finishedButton = document.createElement("button");
    finishedButton.classList.add("finished-button");
    finishedButton.textContent = "Finalizado";
    exerciseItem.appendChild(finishedButton);

    exerciseItem.addEventListener("click", (event) => {
      if (event.target !== finishedButton) {
        timer.classList.toggle("active");
        exerciseItem.classList.toggle("completed");
      }
    });

    finishedButton.addEventListener("click", (event) => {
      event.stopPropagation();
      exerciseItem.classList.remove("completed");
      exerciseItem.classList.add("finished");
    });

    exercisesContainer.appendChild(exerciseItem);
  });
}
function getExercisesForDay(day) {
    const weekExercises = {
      "segunda": [
        { name: "Agachamento com halteres", description: "3 séries x 12 repetições" },
        { name: "Flexão de braços", description: "3 séries x 12 repetições" },
        { name: "Remada curvada com halteres", description: "3 séries x 12 repetições" },
        { name: "Elevação lateral", description: "3 séries x 12 repetições" },
        { name: "Rosca direta com halteres", description: "3 séries x 12 repetições" },
        { name: "Tríceps mergulho", description: "3 séries x 12 repetições" },
        { name: "Panturrilha em pé", description: "3 séries x 15 repetições" },
      ],
      "terca": [
        { name: "Aquecimento", description: "5 minutos" },
        { name: "Treino intervalado", description: "20 minutos - 30 segundos de esforço máximo, 30 segundos de recuperação" },
        { name: "Desaquecimento", description: "5 minutos" },
      ],
      "quarta": [
        { name: "Polichinelo", description: "3 séries x 30 segundos" },
        { name: "Prancha", description: "3 séries x 30-60 segundos" },
        { name: "Burpees", description: "3 séries x 10 repetições" },
        { name: "Afundo com halteres", description: "3 séries x 12 repetições" },
        { name: "Mountain climbers", description: "3 séries x 30 segundos" },
        { name: "Flexão isométrica", description: "3 séries x 30 segundos" },
        { name: "Russian twist", description: "3 séries x 15 repetições" },
      ],
      "quinta": [
        { name: "Aquecimento", description: "5 minutos" },
        { name: "Treino de resistência", description: "35 minutos - Aumente gradualmente a resistência a cada 5 minutos, mantendo um ritmo constante" },
        { name: "Desaquecimento", description: "5 minutos" },
      ],
      "sexta": [
        { name: "Agachamento com halteres", description: "3 séries x 12 repetições" },
        { name: "Flexão de braços", description: "3 séries x 12 repetições" },
        { name: "Remada curvada com halteres", description: "3 séries x 12 repetições" },
        { name: "Elevação lateral", description: "3 séries x 12 repetições" },
        { name: "Rosca direta com halteres", description: "3 séries x 12 repetições" },
        { name: "Tríceps mergulho", description: "3 séries x 12 repetições" },
        { name: "Panturrilha em pé", description: "3 séries x 15 repetições" },
      ],
    };
  
   
  
  
    return weekExercises[day] || [];
  }
  

function toggleTimer() {
  if (timerRunning) {
    clearInterval(timerInterval);
    startTimerButton.textContent = "Iniciar";
  } else {
    timerInterval = setInterval(updateTimer, 1000);
    startTimerButton.textContent = "Parar";
  }
  timerRunning = !timerRunning;
}

function updateTimer() {
  const currentSeconds = parseInt(secondsElement.textContent, 10);
  const currentMinutes = parseInt(minutesElement.textContent, 10);

  if (currentSeconds === 59) {
    minutesElement.textContent = String(currentMinutes + 1).padStart(2, "0");
    secondsElement.textContent = "00";
  } else {
    secondsElement.textContent = String(currentSeconds + 1).padStart(2, "0");
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  timerRunning = false;
  startTimerButton.textContent = "Iniciar";
  minutesElement.textContent = "00";
  secondsElement.textContent = "00";
}

connectToBluetoothDevice();
displayWorkoutHistory();
