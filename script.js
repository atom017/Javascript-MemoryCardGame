const score = document.getElementById('score');
const cards = document.querySelectorAll('.memory-card');
const startOver = document.getElementById("startover");
const musicBox = document.getElementById("on-off");

let scr = 0;
let hasFlippedCard = false;
let firstCard,secondCard;
let lockBoard = false;

const audio = new Audio('audio/got-audio.mp3');

musicBox.addEventListener('change',(e) =>{
    if(e.target.checked){
        audio.play();
        audio.loop = true;
    }
    else{
        audio.pause();
        audio.currentTime = 0;
    }
})




startOver.addEventListener('click',() => {location.reload()});
cards.forEach(card => card.addEventListener('click',flipCard));


const refreshPage = (() =>{
    location.reload();
})
function flipCard(){
    if(lockBoard) return;
    if(this === firstCard){
        return;
    }
    this.classList.toggle('flip');
    if(!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this;
    }
    else{
        hasFlippedCard = false;
        secondCard = this;
        checkForMatch();
    }
    
}

function checkForMatch(){
    if(firstCard.dataset.framework === secondCard.dataset.framework){
        disableCards();
        scr++;
        score.innerText = scr;
        if(scr === 6){
            score.innerText = "6 -- All completed!";
        }
    }
    else{
        unflipCards();
        
    }
}

function disableCards(){
    firstCard.removeEventListener('click',flipCard);
        secondCard.removeEventListener('click',flipCard);
        resetBoard();
}

function unflipCards(){
    lockBoard = true;
    setTimeout(()=>{
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    },900);
}

function resetBoard(){
    [hasFlippedCard,lockBoard] = [false,false];
    [firstCard,secondCard] = [null,null];
}

function flipAllCards(){
    cards.forEach(card => card.classList.toggle('flip'));
   
}

function unFlipAllCards(){
    cards.forEach(card => card.classList.toggle('flip'));
}


(function shuffle(){
    cards.forEach(card =>{
        let randomPos = Math.floor(Math.random() *12) ;
        card.style.order = randomPos;
    });
    audio.currentTime = 0;
    setTimeout(flipAllCards,1500);
     unFlipAllCards();
})();


