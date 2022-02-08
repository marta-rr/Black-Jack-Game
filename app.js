// const playerGlobalScore_div = document.querySelector(".playerScorePoints");
// const dealerGlobalScore_div = document.querySelector(".dealerScorePoints");
const playerScore_span = document.getElementById("player-score-points");
const dealerScore_span = document.getElementById("dealer-score-points");
const playerCards_div = document.querySelector("#playerCards > p");
const dealerCards_div = document.getElementById("dealerCards");
const winner_div = document.querySelector(".winner > p");

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
    // shuffle Deck
    let ranks = createDeck();
    shuffleDeck(ranks);
    // Get 2 first cards from shuffle deck
    let n = 2;
    for(let i = 1; i < n; i++){
        let twoFirstCardsPlayer = ranks.slice(i, i+n);
        twoFirstCardsPlayer.forEach(card => playerCards.push(card))
        }
    for(let i = 1; i < n; i++){
        let twoFirstCardsComputer = ranks.slice(i+n, i+n+n);
        twoFirstCardsComputer.forEach(card => dealerCards.push(card))
    }
    console.log('Player Hand: ' + playerCards);
    console.log('Dealer Hand: ' + dealerCards);

    playerCards_div.innerHTML= playerCards;
    dealerCards_div.innerHTML= dealerCards;

    getScore();
    if(playerScore == 21){
        playerScore_span.innerHTML = "BLACKJACK!";
    }

}

// function determineWinner(){
//     if(playerScore < dealerScore){
//             winner_div.innerHTML = "The winner is YOU"
//     }
//     else if (dealerScore  > playerScore){
//         winner_div.innerHTML = "The winner is the dealer"
//     }
//     else {
//         winner_div.innerHTML = "There is a tie"
//     }
// }

function hit(){

    if(playerScore != 0 && playerScore != 21){
        playerCards.push(addCard())
        getScore();
        if(playerScore < 21){
            playerScore_span.innerHTML = playerScore;
            playerCards_div.innerHTML= playerCards;
            console.log(`The player cards are: ${playerCards}`)
        }
        else if(playerScore > 21){
            playerScore_span.innerHTML = "BUSTS!";
            // gameOver();
        }
        else{
            playerCards_div.innerHTML= playerCards;
            playerScore_span.innerHTML = "BLACKJACK!";
        }
    }

    }


function stand(){
    // Dealer gets one card if overall score is less than 16, otherwise game ends and we need to compare scored for player and dealer
    if(dealerScore != 0){
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
    }




function getScore(){
    playerScore = 0;
    dealerScore = 0;

    //need to double check
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

    // dealerCards.forEach(card => dealerScore += cardValues[card.slice(0, -1)])
    // console.log(`The dealer score is: ${dealerScore}`);

    // playerCards.forEach(card => playerScore += cardValues[card.slice(0, -1)])
    // console.log(playerScore);

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
    let ranks = createDeck();
    shuffleDeck(ranks);
    return ranks.shift();
}








// splice method for giving two cards to player and dealer? (make sure they get removed from the deck;)
// Make the score update depending on the value of the cards: compare arrays and return values
// make 1 card for the dealer  faced down
// make the cards to be images
// if player Score is not 21, hit or Stand
// if player score is 21 -> blackjack
// if hit, another card is given
// if stand, dealer gets one card if score is less then 16 and so on
// compare player and dealer values to determine winner
// Add bet options




