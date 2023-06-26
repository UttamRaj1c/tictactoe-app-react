import './App.css';
import React, {useState, useEffect} from 'react';

function App() {

  const [hint, setHint] = useState("X Turn");

  // x=1, o=0
  const [turn, setTurn] = useState(1);
  const [isGameActive, setIsGameActive] = useState(true);
  const [gameState, setGameState] = useState(["","","","","","","","",""]);
  const winPosition=[ [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6] ];

  // turn 
  const boxClick = (index) => {

    if(isGameActive && gameState[index]=="")
    {
      if(turn==1)
      {
        setTurn(0);
        gameState[index]="X";
        setGameState(gameState);
        setHint("O Turn");
      }
      else if(turn==0)
      {
        setTurn(1);
        gameState[index]="O";
        setGameState(gameState);
        setHint("X Turn");
      }

      console.log(gameState)

    }
  }

  

  useEffect( () => {
    
    // check game over
    var status=true;
    for(var i=0; i<gameState.length; i++)
    {
      if(gameState[i]=="")
      {
        status=false;
        break;
      }
    }
    if(status)
    {
      setHint("Game Over");
      setIsGameActive(false);
    }

    // check game win
    var winStatus=false;
    winPosition.forEach(element => {
      if(gameState[element[0]] == gameState[element[1]] && gameState[element[1]] == gameState[element[2]] && gameState[element[1]]!="" )
      {
        winStatus=true;
      }
    });
    var winner=2;
    if(winStatus)
    {
      if(turn==1)
      {
        winner=0;
      }
      else if(turn==0)
      {
        winner=1;
      }
    }
    if(winner==1)
    {
      setHint("X WON the GAME");
      setIsGameActive(false);
      winAnimation();
    }
    else if(winner==0)
    {
      setHint("O WON the GAME");
      setIsGameActive(false);
      winAnimation();
    }

  } );

  // call animations
  const winAnimation = () => {
    var box=document.getElementsByClassName("board")[0];
    box.style.backgroundImage=" url('https://i.pinimg.com/originals/15/86/22/158622b81a98770610dc8eb22214a080.gif')";

    var box1=document.getElementsByClassName("outerBoard")[0];
    box1.style.backgroundImage=" url('https://i.pinimg.com/originals/15/86/22/158622b81a98770610dc8eb22214a080.gif')";
  }
  // remove animation
  const removeAnimation = () => {
    var box=document.getElementsByClassName("board")[0];
    box.style.backgroundImage=" url('')";

    var box1=document.getElementsByClassName("outerBoard")[0];
    box1.style.backgroundImage=" url('')";
  }

  // reset
  const resetGame = () => {
    setTurn(1);
    setHint("X Turn");
    setGameState(["","","","","","","","",""]);
    setIsGameActive(true);
    removeAnimation();
  }

  return (
    <div className="outerBoard">

    <h1 className="hint">{hint}</h1>
    <button onClick={resetGame} className="restartBtn" >Restart the Game</button>

    <div className="board">
      <div className="row">
        <div className="col" onClick={()=>boxClick(0)} > {gameState[0]} </div>
        <div className="col" onClick={()=>boxClick(1)} > {gameState[1]} </div>
        <div className="col" onClick={()=>boxClick(2)} > {gameState[2]} </div>
      </div>
      <div className="row">
        <div className="col" onClick={()=>boxClick(3)} > {gameState[3]} </div>
        <div className="col" onClick={()=>boxClick(4)} > {gameState[4]} </div>
        <div className="col" onClick={()=>boxClick(5)} > {gameState[5]} </div>
      </div>
      <div className="row">
        <div className="col" onClick={()=>boxClick(6)} > {gameState[6]} </div>
        <div className="col" onClick={()=>boxClick(7)} > {gameState[7]} </div>
        <div className="col" onClick={()=>boxClick(8)} > {gameState[8]} </div>
      </div>
      
    </div>

    </div>
  );
}

export default App;
