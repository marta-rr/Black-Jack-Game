const playerScore_span = document.getElementById("player-score-points");
const dealerScore_span = document.getElementById("dealer-score-points");
const playerCards_div = document.querySelector("#playerCards > p");
const dealerCards_div = document.querySelector("#dealerCards > p");
const winner_div = document.getElementById("winner");
const loser_div = document.getElementById("loser");
const tie_div = document.getElementById("tie");
const cardImagePlayer_span = document.getElementById("card-image-player");
const cardImageDealer_span = document.getElementById("card-image-dealer");
const play_button = document.getElementById("btn");
const totalMoney_span = document.getElementById("total-money");
const betMade_p = document.getElementById("bet-made");
const betMade_span = document.getElementById("total-bet");
const bet10_button = document.getElementById("btn-bet10");
const bet20_button = document.getElementById("btn-bet20");
const bet50_button = document.getElementById("btn-bet50");

let totalMoney = 100;
let userBet = 0;
let bet10 = 10;
let bet20 = 20;
let bet50 = 50;
let winner = false;
let tie = false;
let dealerCards = [];
let playerCards = [];
let dealerScore = 0;
let playerScore = 0;
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
let gameEnds = false;
let cards = shuffleDeck(createDeck());

function createDeck(){
    let deck = []
//Create deck made of mixing ranks and suits
    for (let i = 0; i < suits.length; i++){
        for (let j=0; j < ranks.length; j++){
            deck.push(ranks[j] + suits[i]);
        }
    }
    return deck;
}


function shuffleDeck(deck){
//Shuffling the deck
    for(let i = 0; i < ranks.length; i++){
        let temp = deck[i];
        let randomIndex = Math.floor(Math.random() * deck.length);
        deck[i] = deck[randomIndex];
        deck[randomIndex] = temp;
    }
    return deck;
}

function main(){
    bet10_button.addEventListener("click",function(){
        bet10_button.style.visibility="hidden";
        bet20_button.style.visibility="hidden";
        bet50_button.style.visibility="hidden";
        betMade_p.style.visibility ="visible";
        betMade_span.innerHTML = bet10;
        if(totalMoney >= bet10){
        updateBetAmount(bet10);
        play(userBet);
        betMade_p.innerHTML = `Your bet: $${bet10}`; 
        loser_div.innerHTML = "";
        }
        else{
            loser_div.innerHTML = "GAME OVER!";
            betMade_p.innerHTML="NO MONEY";
            play_button.style.visibility="visible";
        }
    })
    bet20_button.addEventListener("click", function(){
        bet10_button.style.visibility="hidden";
        bet20_button.style.visibility="hidden";
        bet50_button.style.visibility="hidden";
        betMade_p.style.visibility ="visible";
        betMade_span.innerHTML = bet20;
        if(totalMoney >= bet20){
        updateBetAmount(bet20);
        play(userBet);
        betMade_p.innerHTML = `Your bet: $${bet20}`;     
        loser_div.innerHTML = "";
        }
        else if(totalMoney == 0) {
            loser_div.innerHTML = "GAME OVER!";
            betMade_p.innerHTML="NO MONEY";
            play_button.style.visibility="visible";
        }
        else{
            loser_div.innerHTML = "Not enough money. Choose another amount";
            betMade_p.style.visibility="hidden";
            bet10_button.style.visibility="visible";
            bet20_button.style.visibility="visible";
            bet50_button.style.visibility="visible";
        }
    })
    bet50_button.addEventListener("click", function(){
        bet10_button.style.visibility="hidden";
        bet20_button.style.visibility="hidden";
        bet50_button.style.visibility="hidden";
        betMade_p.style.visibility ="visible";
        betMade_span.innerHTML = bet50;
        if(totalMoney >= bet50){
        updateBetAmount(bet50);
        play(userBet);
        betMade_p.innerHTML = `Your bet: $${bet50}`;
        loser_div.innerHTML = "";
        }
        else if(totalMoney == 0) {
            loser_div.innerHTML = "GAME OVER!";
            betMade_p.innerHTML="NO MONEY";
            play_button.style.visibility="visible";
        }
        else{
            loser_div.innerHTML = "Not enough money. Choose another amount";
            betMade_p.style.visibility="hidden";
            bet10_button.style.visibility="visible";
            bet20_button.style.visibility="visible";
            bet50_button.style.visibility="visible";
        }
    })
}

function updateBetAmount(betAmount){
    userBet = betAmount;
}

function play(betAmount){
    //Get 2 first cards from shuffle deck for both dealer and player
    let n = 2;
    for(let i = 0; i < n; i++){
        let twoFirstCardsPlayer = cards.slice(i, i+1);
        twoFirstCardsPlayer.forEach(card => playerCards.push(card));
        showCard();
        let twoFirstCardsComputer = cards.slice(i+n, i+1+n);
        twoFirstCardsComputer.forEach(card => dealerCards.push(card));
        showCardDealer();
    }
    getScore();
    ifBlackJackAtfirst(betAmount);
}

function ifBlackJackAtfirst(betAmount){
    //Handling case blackjack as soon as pressing play
     if(playerScore == 21 && dealerScore != 21){
        playerScore_span.innerHTML = "BLACKJACK!";
        dealerScore_span.innerHTML = dealerScore;
        winner_div.innerHTML = "YOU WIN!"
        gameEnds = true;
        winner = true;
        cardsFaceUP();
        bet(betAmount);
    }
    else if(playerScore == 21 && dealerScore == 21){
        playerScore_span.innerHTML = "BLACKJACK!";
        dealerScore_span.innerHTML = "BLACKJACK!";
        tie_div.innerHTML = "IT IS A TIE"
        gameEnds = true;
        cardsFaceUP();
        bet(betAmount);
    }
}

function determineWinner(betAmount){
    //Different scenarios win/lose
    if(playerScore == 21 && dealerScore != 21){
        playerScore_span.innerHTML = "BLACKJACK!";
        winner_div.innerHTML = "YOU WIN!"
        gameEnds = true;
        winner = true;
    }
    else if(dealerScore == 21 && playerScore != 21){
        dealerScore_span.innerHTML = "BLACKJACK!";
        loser.innerHTML = "YOU LOST...";
        gameEnds = true;
    }
    else if(playerScore == 21 && dealerScore == 21){
        playerScore_span.innerHTML = "BLACKJACK!";
        dealerScore_span.innerHTML = "BLACKJACK!";
        tie_div.innerHTML = "IT IS A TIE"
        gameEnds = true;
        tie = true;
    }
    else if(playerScore > 21){
        loser_div.innerHTML = "YOU LOST...";
        gameEnds = true;
    }
    else if(dealerScore > 21 && playerScore <= 21){
        winner_div.innerHTML = "YOU WIN!";
        gameEnds = true;
        winner = true;
    }
    else if(dealerScore == playerScore){
        tie_div.innerHTML = "IT IS A TIE";
        gameEnds = true;
        tie = true;
    }
    else if(playerScore > dealerScore && playerScore <=21){
        winner_div.innerHTML = "YOU WIN!";
        gameEnds = true;
        winner = true;
    }
    else if(dealerScore > playerScore && dealerScore <=21){
        loser.innerHTML = "YOU LOST...";
        gameEnds = true;
    }
    bet(betAmount);
     //Show dealer's score when the game is over
    showingDealerScore();
}

function showingDealerScore(){
    if(dealerScore < 21){
        dealerScore_span.innerHTML = dealerScore;
        gameEnds = true;
    }
    else if(dealerScore == 21){
        dealerScore_span.innerHTML = "BLACKJACK!";
        gameEnds = true;
    }
    else if(dealerScore > 21){
        dealerScore_span.innerHTML = "BUSTS!";
        gameEnds = true;
    }
    cardsFaceUP();
}

function hit(){
    let betAmount = userBet;
    //Giving extra card for the player
    if(playerScore != 0 && playerScore != 21 && gameEnds == false){
        playerCards.push(addCard())
        getScore();
        showCard();
        if(playerScore < 21){
            playerScore_span.innerHTML = playerScore;
        }
        else if(playerScore > 21){
            playerScore_span.innerHTML = "BUSTS!";
            determineWinner(betAmount);
        }
        else{
            playerScore_span.innerHTML = "BLACKJACK!";
            determineWinner(betAmount);
        }
    }
}


function stand(){
    let betAmount = userBet;
    //Giving cards to the dealer till it has more than 16 points
    if(dealerScore != 0 && gameEnds == false){
       while(dealerScore <= 16){
            dealerCards.push(addCard())
            showCardDealer();
            getScore();
        }
            if(dealerScore>21){
                dealerScore_span.innerHTML= "BUSTS!"
            }
            determineWinner(betAmount);
    }
}


function getScore(){
    playerScore = 0;
    dealerScore = 0;

    playerCards.forEach(function (card){
    //handling Aces situation: 1 or 11 points
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
        //If not Ace included
        else{
            playerScore += cardValues[card.slice(0, -1)];
        }
    });

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
    playerScore_span.innerHTML = playerScore;
}

function addCard(){
//Taking a card from the end of the pile
    return cards.pop();
}

function reset(){
//Restart the game
    if(gameEnds == true){
        bet10_button.style.visibility="visible";
        bet20_button.style.visibility="visible";
        bet50_button.style.visibility="visible";
        betMade_p.style.visibility ="hidden";
        cards = shuffleDeck(createDeck());
        dealerCards = [];
        playerCards = [];
        dealerScore = 0;
        playerScore = 0;
        gameEnds = false;
        winner = false;
        tie = false;

        playerScore_span.innerHTML = playerScore;
        dealerScore_span.innerHTML = "?";
        playerCards_div.innerHTML = playerCards;
        dealerCards_div.innerHTML = dealerCards;
        cardImagePlayer_span.innerHTML = "";
        cardImageDealer_span.innerHTML = "";
        winner_div.innerHTML = "";
        loser_div.innerHTML = "";
        tie_div.innerHTML = "";
    }
}


function playAgain(){
        bet10_button.style.visibility="visible";
        bet20_button.style.visibility="visible";
        bet50_button.style.visibility="visible";
        play_button.style.visibility="hidden";
        cards = shuffleDeck(createDeck());
        dealerCards = [];
        playerCards = [];
        dealerScore = 0;
        playerScore = 0;
        gameEnds = false;
        winner = false;
        tie = false;
        totalMoney = 100;
        betMade_p.style.visibility ="hidden";
        totalMoney_span.innerHTML = totalMoney;
        playerScore_span.innerHTML = playerScore;
        dealerScore_span.innerHTML = "?";
        playerCards_div.innerHTML = playerCards;
        dealerCards_div.innerHTML = dealerCards;
        cardImagePlayer_span.innerHTML = "";
        cardImageDealer_span.innerHTML = "";
        winner_div.innerHTML = "";
        loser_div.innerHTML = "";
        tie_div.innerHTML = "";
}

function showCard(card){
//Showing poker images for player
    let pokerImage = document.createElement("img");
    playerCards.forEach(function(card){
        pokerImage.style = 'width: 140px; height:200px; margin:20px'
        pokerImage.src = `images/PNG-cards-1.3/${card}.png`;
        cardImagePlayer_span.appendChild(pokerImage);
    })
}

function showCardDealer(card){
//Showing poker images for dealer
    let pokerImageDealer = document.createElement("img");
    dealerCards.forEach(function(card, i){
        if(i == 0){
        //1st card faced down
            pokerImageDealer.style = 'width: 140px; height:200px; margin:20px'
            pokerImageDealer.src = 'images/reverse.png';
            cardImageDealer_span.appendChild(pokerImageDealer);
            }
        else{
        pokerImageDealer.style = 'width: 140px; height:200px; margin:20px'
        pokerImageDealer.src = `images/PNG-cards-1.3/${card}.png`;
        cardImageDealer_span.appendChild(pokerImageDealer);
        }
    })
}

function cardsFaceUP(card){
//Revealing all dealer cards
    cardImageDealer_span.innerHTML ="";
    let pokerImageDealer = document.createElement("img");
    dealerCards.forEach(function(card){
        let pokerImageDealer = document.createElement("img");
        pokerImageDealer.style = 'width: 140px; height:200px; margin:20px'
        pokerImageDealer.src = `images/PNG-cards-1.3/${card}.png`;
        cardImageDealer_span.appendChild(pokerImageDealer);
        })
}

function bet(betAmount){
    console.log("I am in bet")
    // betAmount = bet10;
    //Double check there is a moment it stop summing up or down
    if (gameEnds == true){
        console.log("I am in IF bet10")
             if(winner == true && tie == false){
                totalMoney += betAmount * 2;
                console.log("I am in 1t case")
            }
            else if(winner == false && tie == false){
                totalMoney -= betAmount;
                console.log("I am in 2nd case")
            }
            else if(winner == false && tie == true){
                totalMoney = totalMoney;
                console.log("I am in 3rd case")
            }
    }

    totalMoney_span.innerHTML = totalMoney;
}

main()