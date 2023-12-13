import { useState } from "react";
import "./App.css";
import Header from './components/Header'

function App() {
  const [mediaValue, setMediaValue] = useState(0)
  const [rankValue, setRankValue] = useState(0)
  const [showTeams, setShowTeams] = useState(false);
  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);
  const [jugadores, setJugadores] = useState([]);

  /* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
}

// Submits a player into Players Array.
const handleSubmitPlayers = (event) => {
  event.preventDefault();
  console.log(event.target.newPlayer.value, event.target.newRanking.value)
  let np = event.target.newPlayer.value;
  let nr = parseInt(event.target.newRanking.value);
  let newPlayer = { jugador: (np), rank: (nr) }
  setJugadores(
    [...jugadores, newPlayer]    
  )
  event.target.newPlayer.value = '';
  event.target.newRanking.value = '';
  console.log(jugadores)
};
// Shows the shuffled teams.
  const handleShowTeams = () => {
    setShowTeams(true);
  };

  // Resets the teams.
  const resetTeams = () => {
    setTeam1([]);
    setTeam2([]);
    setShowTeams(false)
    shuffleArray(jugadores)
  };

  // Function that makes the shuffling of the teams.

  const shuffleTeams = () => {
    // Calculate the sum of ranks.
    shuffleArray(jugadores)
    let number = 0;
    jugadores.forEach((jugador) => {
      number = number + jugador.rank;
    });
  
    // Set Rank Values to determine which is the rank level for the match you are shuffling.
    setRankValue(number);
    setMediaValue(number / 2);
  
    // Setting the players into the arrays.
    let ranking1 = 0;
    const updatedTeam1 = [];
    const updatedTeam2 = [];
    
    jugadores.forEach((jugador) => {
      ranking1 = ranking1 + jugador.rank;  
      if (ranking1 >= 9.5 && updatedTeam1.length < 5) {
        updatedTeam1.push(jugador);
        return jugador; // Return the player object for updatedTeam2
      } else {
        updatedTeam2.push(jugador);
        return jugador;
      }
    });
  
    // Update the state with the correct teams
    setTeam1(updatedTeam1);
    setTeam2(updatedTeam2);
  
    // Logging for debugging
    console.log("Equipo 1", updatedTeam1);
    console.log("Equipo 2", updatedTeam2);
  };

  return (
    <div className=" max-w-[1060px] m-auto">
      <Header />
      <section className="PlayerInput p-4">
        <h1>Jugadores</h1>
        <br />
        <form action="\" onSubmit={handleSubmitPlayers}>
        <div className="gap-4 p-4">          
          <div className=" flex gap-5">
          <input type="text" name="newPlayer" id="newPlayer" className="w-2/3 p-2 rounded-md" placeholder="Nombre del jugador" />
          <input type="text" name="newRanking" id="newRanking" className="w-1/3 p-2 rounded-md" placeholder="Puntaje (1 a 5)" />        </div>
        </div>        
        <button type="Submit" className=" bg-slate-900"> Agregar jugador </button>
          </form>
      </section>
      <section className="h-48 bg-transparent tran">

      </section>
      <div className="h-80 w-full bg-zinc-900 rounded-lg gap-4 flex flex-col">
        <h1>Equipos</h1>
        <div className=" w-full grid grid-cols-2 gap-2 p-2">
        {jugadores && jugadores.map((jug, index) => (
            <h3
              key={index}
              className="bg-slate-500 font-semibold rounded-lg w-full p-1"
            >
              {jug.jugador}
            </h3>
          ))}
          </div>
      </div>
      <br />

      <div className="flex w-full cancha h-60 justify-center items-center">
        <div className="flex flex-col gap-2 w-full justify-center items-center">
        {showTeams &&
          team1.map((jug, index) => (
            <h3
              key={index}
              className="bg-slate-500 font-semibold rounded-lg w-2/3 p-1"
            >
              {jug.jugador}
            </h3>
          ))}
          </div>

        <h2 className="font-bold text-1xl rounded-full p-2 bg-red-400">Vs.</h2>
        <div className="flex flex-col gap-2 w-full justify-center items-center">
        {showTeams &&
          team2.map((jug, index) => (
            <h3
              key={index}
              className="bg-slate-500 font-semibold rounded-lg w-2/3 p-1"
            >
              {jug.jugador}
            </h3>
          ))}
          </div>
      </div>
      <br />

      <div className="w-full flex flex-col gap-4 justify-center items-center">
        <div className="w-full flex gap-4">
          <button className=" w-48" onClick={shuffleTeams}>
            Shufflear equipos
          </button>
          <button className=" w-48" onClick={handleShowTeams}>
            Mostrar equipos
          </button>
        </div>
        <button className="w-38 bg-red-800" onClick={resetTeams}>
          Reiniciar
        </button>
      </div>
    </div>
  );
}

export default App;
