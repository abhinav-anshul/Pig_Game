// ------------------------------------------------------------------------------
/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// ------------------------------------------------------------------------------



// declaring variables all in one line below
var scores, roundScore, activePlayer, gamePlaying;

init();

// Now we have to generate random numbers for dice,
// we use a function called Math.random() which generates random number in decimal between 0 and 1. such as 0.29000000 or 0.993443 or 0.4588484
// the problem is we want number between 0 and 6 as its a dice
// so we can multiply the decimal number with 6 to get number between 0 and 5, and at 1 in the end, to eventually get number between 0 and 6
// such as (Math.random() * 6) + 1
// Again the problem is it still generates decimal numbers between 0 and 6 such as 2.36464000 or 1.378347474 or 5.36337000
// So we use a function called Math.floor() which simply converts the decimal number to a integer, For example, lets say the number 4.464383000 becomes only 4, or the number 0.93838383 becomes only 0
// Hence forth we combine this Math.floor function with Math.random
// And it becomes Math.floor(Math.random()*6) + 1   thus fetching this equation to the dice below




//document.querySelector('#current-' + activePlayer).textContent = dice;

// we can get read values from css and display in console as given below

//var x = document.querySelector('#score-0').textContent;
//console.log(x);


// we can also manipulate and change the css through DOM manipulation as given below
// Here are we are disabling the style options for the dice as defined in its css to none, so it wont display anything !!


// getElementById IS FASTER querySelector



//Now we are performing event listeners to listen to the change in any type of event
//The addEventListener has 2 arguments, first one is type of event, such as click/hover/zoom/load/unload ||| AND the second
// argument is any function we need to call, when that event triggers
// the 2nd argument would be a callback function, which means the function is not called by us but by event listeners, hence the second argument
// would be a function without (), because we dont wanna call it right there, but want the litener to call it
// CALLBACK FUNCTION :- A function which we pass to another function as an argument
// Here we are defining the function, and what should this function when the 'click' event is triggered. NOTE- the click event is through diceroll

document.querySelector('.btn-roll').addEventListener('click', function(){
    
    if(gamePlaying){

        // 1. Random number
        var dice = Math.floor(Math.random() * 6) + 1;    

        //2. Display the result
        var diceDOM = document.querySelector('.dice')
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        //3. Update the round score if the rolled number number was not 1
        if( dice !== 1){
            // add score
            roundScore = roundScore + dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
        else{
            // next player
            nextPlayer();
        }
        
    }
    

});


//adding event listeners to the hold button
document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
        //Add current score to global score
        scores[activePlayer] = scores[activePlayer] + roundScore; 
    
        //update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //check if player has won the game
        if (scores[activePlayer] >= 20) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        }

        else{
            //Next Player
            nextPlayer();
        }
    }
    
    

    
});


function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;  // it is using ternary operator
        roundScore = 0;

        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        //here we are removing and adding the active player class for the red dot as well as the grey background
        //document.querySelector('.player-0-panel').classList.remove('active');
        //document.querySelector('.player-1-panel').classList.add('active');
        //BUT THERE IS A BETTER WAY TO DO THIS ADD AND REMOVE, WHICH IS TOGGLE, WHICH WE ARE DOING IT below
        
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

        document.querySelector('.dice').style.display = 'none';
    
}

document.querySelector('.btn-new').addEventListener('click', init);



// init function resets everything, thats why we have used this above while new games would be pressed, also we have called init function in the starting of the code to reset everything
function init(){
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    //below we are using gamePlaying as a statevariabe
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.add('active');






}
