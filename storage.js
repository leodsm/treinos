function saveWorkout(workout) {
    const currentDate = new Date().toISOString().substring(0, 10);
    const storedWorkouts = getStoredWorkouts();
  
    storedWorkouts[currentDate] = workout;
    localStorage.setItem("workouts", JSON.stringify(storedWorkouts));
  }
  
  function getStoredWorkouts() {
    const storedWorkouts = localStorage.getItem("workouts");
    return storedWorkouts ? JSON.parse(storedWorkouts) : {};
  }
  
  function getWorkoutByDate(date) {
    const storedWorkouts = getStoredWorkouts();
    return storedWorkouts[date] || null;
  }
  
  function displayWorkoutHistory() {
    const workoutHistoryContainer = document.getElementById("workoutHistory");
    const storedWorkouts = getStoredWorkouts();
  
    for (const [date, workout] of Object.entries(storedWorkouts)) {
      const historyItem = document.createElement("div");
      historyItem.classList.add("historyItem");
  
      const historyDate = document.createElement("h4");
      historyDate.textContent = date;
      historyItem.appendChild(historyDate);
  
      const historyDetails = document.createElement("p");
      historyDetails.textContent = workout.details; // Adapte isso de acordo com a estrutura de dados do seu treino
      historyItem.appendChild(historyDetails);
  
      workoutHistoryContainer.appendChild(historyItem);
    }
  }
  
  // Exemplo de uso:
  // saveWorkout({ details: "Treino de força realizado" });
  // displayWorkoutHistory();
  