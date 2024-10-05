const cards = document.querySelectorAll(".card");
const showTimer = document.querySelector("#show-timer");
const userScore = document.querySelector("#user-score");
const refreshButton = document.querySelector("#refresh-button");

let cardOne, cardTwo;
let disableDesk = false;
let matchedCard = 0;
let score = 0;


async function shuffleCard(){

    let matchV;

    score = 0;
    userScore.innerHTML = score;

    
    refreshButton.style.display = "none";
    
    matchedCard = 0;
    cardOne = cardTwo = "";
    
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.floor(Math.random() * 7) > 0.5 ? 1 : -1);
    
    disableDesk = false;

    let timeRemaining = 60;

    let countdownInterval = setInterval(function() {
            
        timeRemaining--;
        if (timeRemaining < 0) {
    
            clearInterval(countdownInterval);
            refreshButton.style.display = "block";
            timeRemaining = 60;
            cards.forEach((card) => {
               card.removeEventListener("click", flipCard);
            })
    
        } else {

            showTimer.innerHTML = timeRemaining + "s";
                            
          }
    }, 1000);

    

        cards.forEach(async (card, i) => {
        
            card.classList.remove("flip");
            
            let imgTag = card.querySelector("img");
            imgTag.src = `https://prajin-kamble.github.io/Matching-Card-Game/Images/img${arr[i]}.png`;
            card.addEventListener("click",flipCard);
        })

        if(matchV === false){
            clearInterval(countdownInterval);
        }

}

async function flipCard(e){
    let clickedCard = e.target;
    if(clickedCard !== cardOne && !disableDesk){
        clickedCard.classList.add("flip");

        if(!cardOne){
            cardOne = clickedCard
            return cardOne;
        } 
    }

    cardTwo = clickedCard;
    disableDesk = true;
    let cardOneImg = cardOne.querySelector("img").src;
    let cardTwoImg = cardTwo.querySelector("img").src;

    let [mv, ds] = await matchCards(cardOneImg, cardTwoImg);

    return mv;
}

async function matchCards(img1, img2){

    let mhv = true;

    if(img1 === img2){

        matchedCard += 1;

        if(matchedCard === 8){
            mhv = false;
            refreshButton.style.display = "block";
        }


        score += 1;
        userScore.innerHTML = score;

        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);

        cardOne = cardTwo = "";
        return [mhv,disableDesk = false];

    }

    setTimeout(() =>{

        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");

    }, 400)

    setTimeout(() =>{
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDesk = false;
    }, 1200)
}

shuffleCard();
