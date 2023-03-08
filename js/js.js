var cards = document.getElementsByClassName('cards')
var gameboard = document.getElementById('game')
var highScore = document.getElementById('highScore')
var player1ScoreHTML = document.getElementById('player1Score')
var player2ScoreHTML = document.getElementById('player2Score')
var turnText = document.getElementById('turntext')
var reset = document.getElementById('reset')
var highScoreHTML = document.getElementById('highScore')
var turnCountHTML = document.getElementById('tuncount');
var player
var player1Score = 0
var player2Score = 0
var imageArray = []
var finalArray = []
var turn = true
let hasFlippedCard = false
let lockboard = false
let firstCard
let secondCard
var storageKey = 'scoreKey'
var count = 0
const originalImageArray = 
[
    {name:'Brander_card',
    img:'img/Brander_card.png'
},
    {name:'character_card',
    img:'img/character_card.png'
},
    {name:'charactermiddlesister_card',
    img:'img/charactermiddlesister_card.png'
},
    {name:'charactersister_card',
    img:'img/charactersister_card.png'
},
    {name:'Gethlire_card',
    img:'img/Gethlire_card.png'
},
    {name:'Scathach_card',
    img:'img/Scathach_card.png'
},
];
console.log(originalImageArray)

function highScoreDisplay() {
    highScoreHTML.innerHTML = `higscore: ${localStorage.getItem(storageKey)}`;
}
highScoreDisplay();

function turncount() {
    turnCountHTML.innerHTML = `turn: ${count}`
}
turncount();

function arrayGeneration() {
    for (a = 0; a < originalImageArray.length; a++) {
        imageArray.push(originalImageArray[a]);
        imageArray.push(originalImageArray[a]);
    }
}
arrayGeneration();

function randomizeArray() {
    finalArray= []
    while (imageArray.length > 0) {
        let num = Math.random() * imageArray.length; //Generere et tilfældig tal i forhold til mit arrays længde 
        var numRoundedDown = Math.floor(num); //Runder tallet ned til nærmeste hele tal 
        finalArray.push(imageArray.splice(numRoundedDown, 1)[0]);//Putter tallet over i finalarray og gentager derefter processen indtil der ikke er flere tal tilbage i arrayet 
    }
}
randomizeArray()

function createcards(){
    finalArray.forEach(Element => {
        const cards = document.createElement('div')
        cards.classList.add('cards')
        cards.setAttribute("data-framework", Element.name)
        cards.innerHTML= `
        <img class="frontFace" src=${Element.img}>
        <img class="backSide" src="${'img/card_backside.png'}">
        `
        gameboard.appendChild(cards)
        cards.addEventListener("click",flipCard)
    })
}
createcards();

function flipCard() {
    if(lockboard) return;
    if(this === firstCard) return;
    this.classList.toggle('flip')

    if(!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
        hasFlippedCard = false
        secondCard = this
        checkForMatch();
    }

function checkForMatch() {
    let ismatch = firstCard.dataset.framework === secondCard.dataset.framework 
    /*Tjekker om de to kort har den samme data value*/

    ismatch ? correct() : wrong()
}

function correct() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    if (turn == true) {
        player1Score++
    }
    if (turn == false) {
        player2Score++
    }
    playerScore();
    highScoreCalculator();
    resetboard();
}
console.log(cards)
function wrong(){
    lockboard = true
    setTimeout(() => {
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')
        switchPlayer();
        resetboard();
    }, 1500);
}

function resetboard() {
    hasFlippedCard = false
    lockboard = false
    firstCard = null
    secondCard = null
}

function checkwin(){
    for(a = 0; a < cards.length; a++){
        if(cards[a].classList.contains('flip') == false){
            return false
         }
    }
    return true
}

function highScoreCalculator() {
    console.log(cards)
    if (checkwin()) {
        if (player1Score > player2Score) {
            localStorage.setItem(storageKey, `sidste spil vandt spiler 1 med ${player1Score} stik med ${count} ture`)
        } else if (player1Score == player2Score) {
            localStorage.setItem(storageKey, `sidste Spil belv ufagjordt med ${player1Score} stik med ${count} ture`)
        } else {
            localStorage.setItem(storageKey, `sidste spil vandt spiler 2 med ${player2Score} stik med ${count} ture`)
        }
    }
    highScoreDisplay()
}

function highScoreDisplay() {
    highScoreHTML.innerHTML = `higscore: ${localStorage.getItem(storageKey)}`;
}
highScoreDisplay()

function turncount() {
    turnCountHTML.innerHTML = `turn: ${count}`
}
turncount()

function playerScore() {
    player1ScoreHTML.innerHTML = `score: ${player1Score}`
    player2ScoreHTML.innerHTML = `score: ${player2Score}`
}
playerScore()
turnText.innerHTML = `player 1 turn`;
function switchPlayer() {
    if (!turn) {
        player = 'player1'
        turnText.innerHTML = `player 1 turn`;
        turn = !turn
        count++
    } else {
        player = 'player2'
        turnText.innerHTML = `player 2 turn`;
        turn = !turn
        count++
    }
    turncount()
}

function playerReset() {
    turnText.innerHTML = `player 1 turn`;
    turn = true
}

reset.addEventListener('click', resetbutton)
function resetbutton() {
    gameboard.innerHTML = ""
    count = 0
    player1Score = 0
    player2Score = 0
    playerScore()
    arrayGeneration()
    randomizeArray()
    createcards()
    playerReset()
    turncount()
}
