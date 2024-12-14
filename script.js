let num = document.getElementById("number");
let buttons = document.querySelectorAll('button');
let mobileScreen = document.querySelector(".mobileScreen"); 
let resultsContainer = document.querySelector(".resultsContainer");
let greaterThan = document.querySelector(".greaterthan");
let lessThan = document.querySelector(".lessthan"); 
let circle;
let attemptsContainer = document.querySelector(".attemptsContainer");
let attemptCount = 1;
let isLess = [];
let isGreater = [];
let currentLavel = {};
let string = "";
let arr = Array.from(buttons);
let demoMobileWrapper = document.querySelector(".demoMobileWrapper");
let inputContainer = document.querySelector(".inputContainer");
let demoLevel = document.querySelector(".demoLevel");
let mainContainer = document.querySelector(".mainContainer");
let demoContainer = document.querySelector(".demoContainer");
let instructionsContainer = document.querySelector(".instructionsContainer");
let checkBtnWrapper = document.querySelector(".checkBtnWrapper"); 
let levelSelect = document.querySelector(".levelSelect");
let reactionContainer = document.querySelector(".reaction-container");
let levels = {
    easy: {
        randomNumber: randomNumber1TO10(),
        maxAttempts: 5 ,
        range :10
    },
    medium: {
        randomNumber: randomNumber1TO50(),
        maxAttempts: 6 ,
        range :50
    },
    hard: {
        randomNumber: randomNumber1TO100(),
        maxAttempts: 8 ,
        range :100
    }
};
const bgImages = ["../images/bg-1.jpeg","../images/bg-2.jpeg","../images/bg- 3.jpeg",
    "../images/bg-4.jpeg","../images/bg-5.jpeg","../images/bg-6.jpeg"]
let bgImagesLength = bgImages.length;
arr.forEach(button => {
    button.addEventListener('click', (e) => {
        if (e.target.innerHTML == "DEL") {
            string = string.substring(0, string.length - 1);
            num.value = string;
        } else if (e.target.innerHTML == "AC") {
            string = '';
            num.value = string;
        } else if (e.target.innerHTML == "check") {
            GuessNumber();
        } else {
            string += e.target.innerHTML;
            num.value = string;
        }
    });
});
function randomNumber1TO10() {
    return Math.floor(Math.random() * 10) + 1;
}
function randomNumber1TO50(){
    return Math.floor(Math.random() * 50) + 1;
}
function randomNumber1TO100(){
    return Math.floor(Math.random() * 100) + 1;
}

function GuessNumber() {
    if (num.value == ''){
        return alert(`Please Enter a number between 1 and ${currentLavel.range} first !`);
    }
    else if (num.value > currentLavel.range || num.value < 1){
        return alert(`Please Enter a number between 1 and ${currentLavel.range} !`);
    }
    else if (attemptCount >= currentLavel.maxAttempts && num.value != currentLavel.randomNumber) {
        mobileScreen.innerHTML = `<div class="unlockMassage">LOCKED !</div>`;   
        resultsContainer.innerHTML = `
        <div class = "winMessageContainer">
        <div class = "winMessage"> YOU LOST!</div>
        <div class="levelSelect demoLevel" id="levelSelect">
            <div id="easyButton" onclick = "replay('easy')" class="levelBTN">
               <h4>EASY</h4>
               <h4 class="range">1 TO 10</h4> 
            </div>
            <div id="mediumButton" onclick = "replay('medium')" class="levelBTN">
                <h4>MEDIUM</h4>
                <h4 class="range">1 TO 50</h4>
            </div>
            <div id="hardButton" onclick = "replay('hard')" class="levelBTN">
                <h4>HARD</h4>
                <h4 class="range">1 TO 100</h4>
            </div>
        </div>   
        `;
        checkBtnWrapper.style.display = "none";
    }
    else if (num.value == currentLavel.randomNumber) {
        mobileScreen.innerHTML = `<div class="unlockMassage">UNLOCKED !</div>`;
        resultsContainer.innerHTML = `
        <div class = "winMessageContainer">
        <div class = "winMessage"> YOU WON!</div>
        <div class = "attemptsMessage">IN ${attemptCount} Tries!</div>
        <div class="levelSelect demoLevel" id="levelSelect">
            <div id="easyButton" onclick = "replay('easy')" class="levelBTN">
               <h4>EASY</h4>
               <h4 class="range">1 TO 10</h4> 
            </div>
            <div id="mediumButton" onclick = "replay('medium')" class="levelBTN">
                <h4>MEDIUM</h4>
                <h4 class="range">1 TO 50</h4>
            </div>
            <div id="hardButton" onclick = "replay('hard')" class="levelBTN">
                <h4>HARD</h4>
                <h4 class="range">1 TO 100</h4>
            </div>
        </div> 
        `;
        setTimeout(() => {
            const randomImageURL = `${ bgImages[Math.floor(Math.random() * bgImagesLength)]}`;
            mobileScreen.innerHTML = `<img src="${randomImageURL}" alt="Random Image" width="100%" height="100%">`;
        }, 1000);
        checkBtnWrapper.style.display = "none";
    } 
    else if (num.value > currentLavel.randomNumber) {
        isLess.push(num.value);
        setTimeout(()=>{
            reactionContainer.innerHTML = ``;
        },1500);
        reactionContainer.innerHTML = `<img src="../images/oops.png" alt="oops" width="60px" height="60px">`;
        lessThan.innerHTML = isLess.map((guess) => `<div> <i class="fa-solid fa-play less"></i> ${guess}</div>`).join('');
    } 
    else if (num.value < currentLavel.randomNumber) {
        isGreater.push(num.value);
        setTimeout(()=>{
            reactionContainer.innerHTML = ``;
        },1500);
        reactionContainer.innerHTML = `<img src="../images/oops.png" alt="oops" width="60px" height="60px">`;
        greaterThan.innerHTML = isGreater.map((guess) => `<div> <i class="fa-solid fa-play"></i> ${guess}</div>`).join('');
    }
    if (attemptCount <= currentLavel.maxAttempts) {
        circle[attemptCount - 1].style.backgroundColor = "grey";
        attemptCount++;
        string = '';
        num.value = string;
    }
}

function startGame(level) {
    currentLavel = levels[level];
    attemptCount = 1;
    isLess = [];
    isGreater = [];
    string = '';
    num.value = string;
    lessThan.innerHTML = '';
    greaterThan.innerHTML = '';
    demoContainer.style.display = "none";
    mainContainer.style.display = "block";
    attemptsContainer.innerHTML = Array(currentLavel.maxAttempts).fill('<div class="circle"></div>').join('');
    circle = document.querySelectorAll(".circle");
    instructionsContainer.innerHTML = `
    <p>GUESS THE NUMBER TO UNLOCK THE PHONE!</p>
    <p>GUESS A NUMBER BETWEEN 1 AND ${currentLavel.range}.</p>
    <p>YOU HAVE 5 CHANCES.</p>
    `;
}
function replay(level){
    currentLavel = levels[level];
    attemptCount = 1;
    isLess = [];
    isGreater = [];
    string = '';
    num.value = string;
    lessThan.innerHTML = '';
    greaterThan.innerHTML = '';
    demoContainer.style.display = "none";
    mainContainer.style.display = "block";
    let arr = Array.from(buttons);
    arr.forEach(button => {
        button.addEventListener('click', (e) => {
            if (e.target.innerHTML == "DEL") {
                string = string.substring(0, string.length - 1);
                num.value = string;
            } else if (e.target.innerHTML == "AC") {
                string = '';
                num.value = string;
            } else if (e.target.innerHTML == "check") {
                GuessNumber();
            } else {
                string += e.target.innerHTML;
                num.value = string;
            }
        });
    });
    resultsContainer.innerHTML = `
    <div class = "instructionsContainer">
    <p>GUESS THE NUMBER TO UNLOCK THE PHONE!</p>
    <p>GUESS A NUMBER BETWEEN 1 AND ${currentLavel.range}.</p>
    <p>YOU HAVE 5 CHANCES.</p>
    <div>
            <h2>HINTS</h2>
            <div class="guessHistory">
                <div class="Box">
                    <h3>LESS THAN!</h3>
                        <div class="lessthan"></div>
                </div>
                <div class="Box">
                    <h3>GREATER THAN!</h3>
                        <div class="greaterthan"></div>
                </div>
            </div>  
    `;
    mobileScreen.innerHTML = `
                    <div class="attemptsContainer">
                        <div class="circle"></div>
                        <div class="circle"></div>
                        <div class="circle"></div>
                        <div class="circle"></div>
                        <div class="circle"></div>
                    </div>
                    
                        <div class="inputWrapper">
                            <input type="text" placeholder="0" id="number">
                            <div class="reaction-container"></div>
                        </div>
                        
                        <div class="buttonsWrapper">
                            <div class="buttonsRow">
                                <button>1</button>
                                <button>2</button>
                                <button>3</button>
                            </div>
                            <div class="buttonsRow">
                                <button>4</button>
                                <button>5</button>
                                <button>6</button>
                            </div>
                            <div class="buttonsRow">
                                <button>7</button>
                                <button>8</button>
                                <button>9</button>
                            </div>
                            <div class="buttonsRow">
                                <button>DEL</button>
                                <!-- <i class="fa-solid fa-delete-left"></i> -->
                                <button>0</button>
                                <button>AC</button>
                            </div>
                        </div>`;
                checkBtnWrapper.style.display = ""; 
}
function loadGame(){
    demoMobileWrapper.style.display = "block";
    demoContainer.style.display = "block";
    mainContainer.style.display = "none";
    levelSelect.style.position = "relative";
    levelSelect.style.top = "0px";
}

document.addEventListener('DOMContentLoaded', loadGame);


document.getElementById('easyButton').addEventListener('click', () => startGame('easy'));
document.getElementById('mediumButton').addEventListener('click', () => startGame('medium'));
document.getElementById('hardButton').addEventListener('click', () => startGame('hard')); 

