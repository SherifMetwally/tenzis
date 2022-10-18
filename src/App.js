import { useState , useEffect} from 'react';
import './App.css';
import Die from './components/Die';
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {

  const [dice,setDice] = useState(allNewDice())
  const [tenzies,setTenzies] = useState(false)



  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld) 
    const firstValue = dice[0].value 
    const allSameValue = dice.every(die => die.value === firstValue)
    if(allHeld && allSameValue) {
      setTenzies(true)
      
    }
  }, [dice]);

  function allNewDice(){
  return Array(10).fill().map(() => {
     return  generateNewDie() })
  }

  function generateNewDie() {
    return {
      num : Math.round(Math.random() * 5)+1 
           , isHeld : false  
           , id : nanoid()
    }
  }

  function resetGame() {
    setDice(allNewDice())
    setTenzies(false)
  }

  function changeNumber() {
    setDice(oldDice => oldDice.map(die => {
      return die.isHeld ? 
      die :
      generateNewDie()
    }))
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? 
      {...die , isHeld : !die.isHeld} :
      die
    }))  
  }

  return (
    <div className="App">
      <main>
        { tenzies && <Confetti/>  }
        
      <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className='diceContainer'>
          {dice.map(num => {
            return <Die Hold={()=>{holdDice(num.id)}} isHeld={num.isHeld} key={num.id} value={num.num}/>
          })}

        </div>
        <button className='btn'  onClick={ tenzies ? resetGame : changeNumber}> { tenzies ? "Reset" : "Roll"}  </button>
      </main>
    </div>
  );
}

export default App;
