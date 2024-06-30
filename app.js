const p1Button = document.querySelector('#p1Button');
const p2Button = document.querySelector('#p2Button');
const resetButton = document.querySelector('#reset');
const p1Display = document.querySelector('#p1Display');
const p2Display = document.querySelector('#p2Display');
const winningScoreSelect = document.querySelector('#winningScore');

let p1Score = 0;
let p2Score = 0;
let winningScore = 3;
let isGameOver = false;
let duce = false;

const p1 = {
    score: 0,
    button: p1Button,
    display: p1Display
};

const p2 = {
    score: 0,
    button: p2Button,
    display: p2Display
};
//デュース機能の追加

const duceDivisor = () => {
    if(p1.score === p2.score && p1.score === winningScore-1){
        duce = true;
        p1.display.textContent = "Deuce";
        p2.display.textContent = "Deuce";
    }else{
        duce = false;
    }
}

function updateScores(player,opponent){
    if(!isGameOver){
        if(duce && (player.display.textContent === "Deuce" && opponent.display.textContent === "Deuce")){
            player.display.textContent = "Adv";
        }else if(duce && (opponent.display.textContent === "Adv"&& player.display.textContent === "Deuce")){
            opponent.display.textContent = "Deuce";
        }else{
            player.score += 1;
            player.display.textContent = player.score;
        }
        if(player.score === winningScore){
            isGameOver = true;
            player.display.classList.add('has-text-success');
            opponent.display.classList.add('has-text-danger');
            player.button.disabled = true;
            opponent.button.disabled = true;
            duce = false;
            player.display.textContent = player.score;
        }
        
    }
}

p1Button.addEventListener('click', () => {
    if(!duce){
        updateScores(p1,p2);
        duceDivisor();
    }else{
        updateScores(p1,p2);
    }
});

p2Button.addEventListener('click', ()=>{
    if(!duce){
        updateScores(p2,p1);
        duceDivisor();
    }else{
        updateScores(p2,p1);
    }
});

resetButton.addEventListener('click',reset);

winningScoreSelect.addEventListener('change',()=>{
    winningScore = parseInt(winningScoreSelect.value);
    reset();
});

function reset(){
    isGameOver = false;
    for(let p of [p1,p2]){
        p.score = 0;
        p.display.textContent = 0;
        p.display.classList.remove('has-text-success','has-text-danger');
        p.button.disabled = false;
        duce = false;
    }
}

