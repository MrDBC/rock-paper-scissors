// let userScore=0, pcScore =0;

// localStorage.removeItem('userScore')
// localStorage.removeItem('pcScore')

// try to get the user & pc score from the local storage
// if the "getItem" returns null, it means they arent in local storage
// so push to them localStorage with score =0 each
// IF THEY ARE ALREADY IN LOCAL STORAGE, get their scores
let userVal = localStorage.getItem('userScore');
localStorage.setItem( 'userScore' , userVal===null ? 0: userVal );

let pcVal = localStorage.getItem('pcScore')
localStorage.setItem('pcScore', pcVal===null? 0: pcVal);

resetBtn = document.getElementsByClassName('reset')[0]

userScore = document.getElementById('user-score')
pcScore = document.getElementById('pc-score')

// contains everything except the celebration page
const mainContainer = document.getElementsByClassName('main-container')[0]
const scoreArea = document.getElementsByClassName('score-area')[0]
const gameArea = document.getElementsByClassName('game-area')[0]
const hurrayContainer = document.getElementsByClassName('hurray-container')[0]


let rulesOpenBtn = document.getElementById('rules-button')
let rulesCard = document.getElementsByClassName('rules-card')[0]
let rulesCloseBtn = document.getElementsByClassName('cross')[0]

// 3 choices icons
let rock = document.getElementById('rock')
let scissors = document.getElementById('scissors')
let paper = document.getElementById('paper')


const iconImage = {
    r: "/assets/rock.svg",
    p: "/assets/paper.svg",
    s: "/assets/scissors.svg"
}

const iconColors = {
    r: "#0074B6",
    p: "#FFA943",
    s: "#BD00FF"
}

const circles={
    1: "#03ad0341",
    2: "#2f9a25c3",
    3: "#008400a7"
}

const userChoice= document.getElementById('user-choice')
const pcChoice= document.getElementById('pc-choice')


const level = document.querySelectorAll('.level') // targets all levels
const level1 = document.getElementsByClassName('level1')
const level2 = document.getElementsByClassName('level2')
const level3 = document.getElementsByClassName('level3')

let playground = document.getElementsByClassName('playground')[0]
let iconChoiceBtns = document.querySelectorAll('.play-icons')


// display the user & the pc choices
let userIcon = document.getElementById('user-icon')
let pcIcon = document.getElementById('pc-icon')

// each round msg
userMsg = document.getElementsByClassName('user-msg')[0]

// each round result display msg
let eachRoundResult = document.getElementsByClassName('each-round-result')[0]
let playAgain = document.getElementsByClassName('play-again')[0]


// each round icon iconColors
userIconDiv = document.getElementsByClassName('user-icon-div')[0]
pcIconDiv = document.getElementsByClassName('pc-icon-div')[0]


// next button 
const next = document.getElementById('next')
const hurrayPlayAgain = document.getElementById('hurray-play-again')

// ------------------------------------------------------
// for opening & closing the rules popup
rulesOpenBtn.addEventListener('click', ()=>{
    rulesCard.classList.remove('inactive')
})

// for closing the rules book, when i click 'X' button
rulesCloseBtn.addEventListener('click', ()=>{
    rulesCard.classList.add('inactive')
})


// whenever we click 1 of the play icons, that playgound container
// should disappear and result container should appear
iconChoiceBtns.forEach(button =>{
    button.addEventListener('click', ()=>{
        playground.classList.add('inactive')
        eachRoundResult.classList.remove('inactive')
    })
})


// play again button functionality
playAgain.addEventListener('click', ()=>{

    // reset the 3 level concentric circles color to transparent
    // after each round
    level.forEach((lvl)=>{
        lvl.style.borderColor= "transparent";
    })
    
    next.classList.add('inactive')
    eachRoundResult.classList.add('inactive')
    playground.classList.remove('inactive')
})


// next button functionality
next.addEventListener('click', ()=>{
    mainContainer.classList.add('inactive')
    next.classList.add('inactive')
    hurrayContainer.classList.remove('inactive')
    
})

hurrayPlayAgain.addEventListener('click', ()=>{


    // reset the 3 level concentric circles color to transparent
    // after each round
    level.forEach((lvl)=>{
        lvl.style.borderColor= "transparent";
    })

    mainContainer.classList.remove('inactive')
    next.classList.add('inactive')
    hurrayContainer.classList.add('inactive')
    eachRoundResult.classList.add('inactive')
    playground.classList.remove('inactive')
})



// -----------main game functionality ----------------

const userWins= ()=>{
    userMsg.innerHTML = "YOU WON"
    localStorage.userScore =Number(localStorage.userScore) + 1;

    // next button should only be visible when user wins
    next.classList.remove('inactive')

    // user icon concentric circles
    level1[0].style.borderColor = circles[1]
    level2[0].style.borderColor = circles[2]
    level3[0].style.borderColor = circles[3]
}

const userLoses= ()=>{
    userMsg.innerHTML = "YOU LOST"
    // localStorage.userScore =0;
    localStorage.pcScore = Number(localStorage.pcScore)+ 1;

    // pc icon concentric circles
    level1[1].style.borderColor = circles[1]
    level2[1].style.borderColor = circles[2]
    level3[1].style.borderColor = circles[3]
}

const userDraws= ()=>{
    userMsg.innerHTML= "TIE UP"
   
}

const playGame=(userChoice)=>{
    const options = ['r', 'p', 's']
    let pcChoice = options[ Math.floor(Math.random() * 3) ]

    userIcon.src=  iconImage[userChoice]
    pcIcon.src = iconImage[pcChoice]

    switch(userChoice+pcChoice){
        case "rs":
        case "sp":
        case "pr":
            // console.log('user won')
            userWins();
            break;
        case "sr":
        case "ps":
        case "rp":
            // console.log('user lost');
            userLoses();
            break;
        case "rr":
        case "ss":
        case "pp":
            // console.log('draw');
            userDraws();
            break;
    }

    // set every win or lose by user
    userScore.innerHTML= localStorage.userScore;
    pcScore.innerHTML = localStorage.pcScore;
    
    userIconDiv.style.borderColor = iconColors[userChoice]
    pcIconDiv.style.borderColor = iconColors[pcChoice]
}

const startGame= ()=>{
    rock.addEventListener('click', ()=>{
        playGame('r')
    })
    scissors.addEventListener('click', ()=>{
        playGame('s');
    })
    paper.addEventListener('click', ()=>{
        playGame('p');
    })
}

// start the game . lets go!!!
startGame()



//reset scores

resetBtn.addEventListener('click', ()=>{
    window.location.reload()
    localStorage.setItem( 'userScore' ,0);
    localStorage.setItem( 'pcScore' ,0)
})

// set once every reload
userScore.innerHTML= localStorage.getItem( 'userScore');
pcScore.innerHTML = localStorage.getItem('pcScore');