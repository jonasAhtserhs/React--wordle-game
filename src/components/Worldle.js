import React, { useEffect } from 'react'
import useWorldle from '../hooks/useWorldle'
import Grid from './Grid'


export default function Worldle({solution}) {
  const { currentGuess, handleKeyUP, guesses,isCorrect,turn} = useWorldle(solution)

  useEffect( () => {
    window.addEventListener("keyup", handleKeyUP)
     return () => window.removeEventListener("keyup",handleKeyUP);
  }, [handleKeyUP]
  )


  return (
    <div>
        <div> solution - { solution }</div>
        <div> current guesss - { currentGuess }</div>
        <Grid 
        currentGuess ={currentGuess}
        guesses= {guesses}
        turn = {turn}
        
        />
    </div>
  )
}
