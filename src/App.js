import { useState } from 'react';
import './App.css';
import Die from './components/Die';
import { nanoid } from 'nanoid'

function App() {

  const [dice,setDice] = useState(allNewDice())

  function allNewDice(){
  return Array(10).fill().map(() => {
     return {num : Math.round(Math.random() * 5)+1 
           , isHeld : false  
           , id : nanoid()
          }})
  }

  function changeNumber() {
    setDice(allNewDice())
  }

  function holdDice() {
    
  }

  return (
    <div className="App">
      <main>
        <div className='diceContainer'>
          {dice.map(num => {
            return <Die isHeld={num.isHeld} key={num.id} value={num.num}/>
          })}

        </div>
        <button className='btn' onClick={changeNumber}> Roll </button>
      </main>
    </div>
  );
}

export default App;
