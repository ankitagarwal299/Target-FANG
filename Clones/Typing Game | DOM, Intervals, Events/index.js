const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');


//List of words
const words = [
    "hello",
    "goodmorning",
    "apple",
    "arjun"
]

let randomWord;

let score = 0;

let time =10;

let difficulty = localStorage.getItem('difficulty') !== null ?
localStorage.getItem('difficulty'): 'hard';

//set difficulty select value
difficultySelect.value = difficulty;

text.focus();



function getRandomWord(){
    return words[Math.floor(Math.random()* words.length)];
}

function updateTime(){
    time--;
    timeEl.innerHTML = time + 's';

    if(time ==0){
        clearInterval(timeInterval);

        //end game
        gameOver()
    }
}

function gameOver(){
    endgameEl.innerHTML = `
        <h1>Time ran out </h1>
        <p>Your final score is ${score}</p>
        <button onclick="location.reload()">Reload</button>
    `;

    endgameEl.style.display ='flex';
}


function addWordToDOM(){
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

function updateScore(){
    score++;
    scoreEl.innerHTML =score;
}

addWordToDOM();
const timeInterval = setInterval(updateTime,1000);

//Typing
text.addEventListener('input',function(e){
    const insertedText = e.target.value;
    if (insertedText === randomWord)    {
        addWordToDOM();
        updateScore();

        e.target.value = '';

        if (difficulty == 'hard'){
            time+=2;
        }else if(difficulty == 'medium'){
            time+=3;
        }else{
            time+=5;
        }
        
    }
})

//Setting btn click
settingsBtn.addEventListener('click',()=>{
    settings.classList.toggle('hide');
})

//settings select
settingsForm.addEventListener('change',e=>{
    difficulty = e.target.value;
    localStorage.setItem('difficulty',difficulty);
    
});






