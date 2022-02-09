const playerScore_span = document.getElementById("player-score-points");
const dealerScore_span = document.getElementById("dealer-score-points");
const playerCards_div = document.querySelector("#playerCards > p");
const dealerCards_div = document.getElementById("dealerCards");
const winner_div = document.getElementById("winner");
const looser_div = document.getElementById("looser");
const tie_div = document.getElementById("tie");

let money = 100;
let bet = 10;
let dealerCards = [];
let playerCards = [];
let dealerScore = 0;
let playerScore = 0;
let deck = [];
let ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "K", "Q", "A"];
let suits =  ["S", "C", "H", "D"];
let cardValues = {
    "2":2,
    "3":3,
    "4":4,
    "5":5,
    "6":6,
    "7":7,
    "8":8,
    "9":9,
    "10":10,
    "J":10,
    "K":10,
    "Q":10,
    "A": [1, 11]
}
 // shuffle Deck
let cards = createDeck();
shuffleDeck(cards);

let gameEnds = false;


function createDeck(){
    for (let i = 0; i < suits.length; i++){
        for (let j=0; j < ranks.length; j++){
            deck.push(ranks[j] + suits[i]);
        }
    }
    return deck;
}


function shuffleDeck(deck){
    for(let i = 0; i < ranks.length; i++){
        let temp = deck[i];
        let randomIndex = Math.floor(Math.random() * deck.length);
        deck[i] = deck[randomIndex];
        deck[randomIndex] = temp;
    }
}


function play(){
    document.getElementById("btn").style.visibility="hidden";
    // Get 2 first cards from shuffle deck
    let n = 2;
    for(let i = 0; i < n; i++){
        let twoFirstCardsPlayer = cards.slice(i, i+1);
        twoFirstCardsPlayer.forEach(card => playerCards.push(card));
        }
    for(let i = 0; i < n; i++){
        let twoFirstCardsComputer = cards.slice(i+n, i+1+n);
        twoFirstCardsComputer.forEach(card => dealerCards.push(card));
    }

    console.log('Player Hand: ' + playerCards);
    console.log('Dealer Hand: ' + dealerCards);

    playerCards_div.innerHTML= playerCards;
    dealerCards_div.innerHTML= dealerCards;

    getScore();
    ifBlackJackAtfirst();
}

function ifBlackJackAtfirst(){
     if(playerScore == 21 && dealerScore != 21){
        playerScore_span.innerHTML = "BLACKJACK!";
        winner_div.innerHTML = "You win the game. Congratulations!"
        gameEnds = true;
    }
    else if(playerScore == 21 && dealerScore == 21){
        playerScore_span.innerHTML = "BLACKJACK!";
        dealerScore_span.innerHTML = "BLACKJACK!";
        tie_div.innerHTML = "Both you and the dealer have BlackJack. There is a tie. Try again!"
        gameEnds = true;
    }
}

function determineWinner(){
    if(playerScore == 21 && dealerScore != 21){
        playerScore_span.innerHTML = "BLACKJACK!";
        winner_div.innerHTML = "You win the game. Congratulations!"
        gameEnds = true;
    }
    else if(playerScore == 21 && dealerScore == 21){
        playerScore_span.innerHTML = "BLACKJACK!";
        dealerScore_span.innerHTML = "BLACKJACK!";
        tie_div.innerHTML = "Both you and the dealer have BlackJack. There is a tie. Try again!"
        gameEnds = true;
    }
    else if(playerScore > 21){
        looser_div.innerHTML = "You lost. The dealer is the winner!";
        gameEnds = true;
    }
    else if(dealerScore > 21 && playerScore <= 21){
        winner_div.innerHTML = "You win the game. Congratulations!";
        gameEnds = true;
    }
    else if(dealerScore == playerScore){
        tie_div.innerHTML = "You have the same score. It is a tie!";
        gameEnds = true;
    }
    else if(playerScore > dealerScore && playerScore <=21){
        winner_div.innerHTML = "You win the game. Congratulations!";
        gameEnds = true;
    }
    else if(dealerScore > playerScore && dealerScore <=21){
        looser.innerHTML = "You lost. The dealer is the winner!";
        gameEnds = true;
    }
}

function hit(){
    if(playerScore != 0 && playerScore != 21 && gameEnds == false){
        playerCards.push(addCard())
        getScore();
        if(playerScore < 21){
            playerScore_span.innerHTML = playerScore;
            playerCards_div.innerHTML= playerCards;
            console.log(`The player cards are: ${playerCards}`)
        }
        else if(playerScore > 21){
            playerCards_div.innerHTML= playerCards;
            playerScore_span.innerHTML = "BUSTS!";
            determineWinner();
        }
        else{
            playerCards_div.innerHTML = playerCards;
            playerScore_span.innerHTML = "BLACKJACK!";
            determineWinner();
        }
    }

}


function stand(){
    if(dealerScore != 0 && gameEnds == false){
       while(dealerScore <= 16){
            dealerCards.push(addCard())
            getScore();
            dealerScore_span.innerHTML = dealerScore;
            dealerCards_div.innerHTML= dealerCards;
            console.log(`The dealer cards are: ${dealerCards}`)}
            if(dealerScore>21){
                dealerScore_span.innerHTML= "BUSTS!"
            }
    }
    determineWinner()
}


function getScore(){
    playerScore = 0;
    dealerScore = 0;

    playerCards.forEach(function (card){
        if(card.includes("A"))
        {
            if(playerScore + cardValues['A'][1] <=21)
            {
                playerScore += cardValues['A'][1];
            }
            else{
                playerScore += cardValues['A'][0];
            }
        }
        else{
            playerScore += cardValues[card.slice(0, -1)];
        }
    });


    console.log(`The player score is: ${playerScore}`);

    dealerCards.forEach(function (card){
        if(card.includes("A"))
        {
            if(dealerScore + cardValues['A'][1] <=21)
            {
                dealerScore += cardValues['A'][1];
            }
            else{
                dealerScore += cardValues['A'][0];
            }
        }
        else{
            dealerScore += cardValues[card.slice(0, -1)];
        }
    });

    console.log(`The dealer score is: ${dealerScore}`);

    playerScore_span.innerHTML = playerScore;
    dealerScore_span.innerHTML = dealerScore;
}

function addCard(){
    return cards.pop();
}

function reset(){
    let cards = createDeck();
    shuffleDeck(cards);
    dealerCards = [];
    playerCards = [];
    dealerScore = 0;
    playerScore = 0;
    deck = [];
    gameEnds = false;

    playerScore_span.innerHTML = playerScore;
    dealerScore_span.innerHTML = dealerScore;
    playerCards_div.innerHTML = playerCards;
    dealerCards_div.innerHTML = dealerCards;
    winner_div.innerHTML = "";
    looser_div.innerHTML = "";
    tie_div.innerHTML = "";
    play();
}






