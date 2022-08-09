import { useState } from "react";



const useWorldle = (solution) => {
    const [turn, seturn] = useState(0); // user turn
    const [currentGuess, setcurrentGuess] = useState(''); // his current guess
    const [guesses, setguesses] = useState([...Array(6)]); // number of gueesss
    const [history, sethistory] = useState([]);
    const [isCorrect, setisCorrect] = useState(false);

// format a guess into an arry of letter objects
const formatGuess = () => {
    let solutionArray = [...solution];
    let formattedGuess = [...currentGuess].map((l) =>
    {
      return { key:l, color:'grey'}
    });

    //check for exactly matches with index and make it green color
    formattedGuess.forEach((l,i)=> {
                if(solutionArray[i]===l.key) {
                    formattedGuess[i].color='green';
                    solutionArray[i]=null;
                }
            });


    //check if the guess included and make it yellow
    formattedGuess.forEach((l,i)=> {
        if(solutionArray[i] !== null) {
         if(solutionArray.includes(l.key) && l.color !=='green') {
            formattedGuess[i].color='yellow';
            solutionArray[i]=null;
           
         }
        
              
        } 
    
       
        });

return formattedGuess;

}




// add  a new guess to the guesss state
// update the incorrect state if the guest is correct
// add one to the  turn state

const addNewGuess = (oldformatedguess) => {

    // check if the user alredy guess righ think
    //add the new guess
    //add in the history
    // increment the turn
    if(currentGuess === solution){
        setisCorrect(true);
        console.log("yes guess is corrent");
    }

    setguesses( (previousguesss) => {

        let newGuesses = [...previousguesss];
        newGuesses[turn] = oldformatedguess;
        return newGuesses;
    });
 
    sethistory( (previousHistroy)  => {
       return [...previousHistroy, currentGuess]
    })
    
    seturn((prevturn)=> {
        return prevturn + 1;
    })

    setcurrentGuess('');

}

// handle keyup event & track current guess
// if the user presese  enter, add the new guess
//acesssing event object from the keypu event

const handleKeyUP= ({ key }) => {
     //if key is enter;
    if( key ==="Enter") {
         if( turn > 5) { return ; }
         if(history.includes(currentGuess)) { return; } 
         if(currentGuess.length !=5) { return; }

         //get the formated list
        const finalFormattedguess = formatGuess();
        /// allow for the new guess
        addNewGuess(finalFormattedguess);


    }
     //if key is backspace
    if( key === "Backspace" ){
        setcurrentGuess( (prev) => {
            return prev.slice(0,-1);
        }) 
    }

    //doen't make guess more then 5 and a- to z keyboard only

      if(/^[A-Za-z]$/.test(key))  {
        if(currentGuess.length < 5) {
            setcurrentGuess( (prev) => {
                return prev + key;
    
            })
          }

      }
}

return { turn,currentGuess,guesses,isCorrect,handleKeyUP}

}

export default   useWorldle;