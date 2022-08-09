
import './App.css';
import Worldle from './components/Worldle';

import {useEffect, useState} from "react";

function App() {

  const [solution, setSolution] = useState(null);

  useEffect( () => {
     fetch('http://localhost:30001/solutions')
     .then(res => res.json())
     .then(json => {
            const randomSolution = json[Math.floor(Math.random() * json.length)]
            console.log(randomSolution);

            setSolution(randomSolution.word)
     })
     .catch((err)=> console.log("errror hapedd"))
     

  }, [] );


  return (
    <div className="App">
      <h1> world game</h1>
        <Worldle  solution={solution} />
    </div>
  );
}

export default App;
