let score=JSON.parse(localStorage.getItem('score')) || {
    wins:0,
    losses:0,
    ties:0
};

updateScoreElement();
//same as the below code null|| turly
//null means falsy value
/*
if(score === null)
{
score={
    wins:0,
    losses:0,
    ties:0
}
}*/

function reset()
{
score.wins=0;
score.losses=0;
score.ties=0;

updateScoreElement();
localStorage.removeItem('score');
}
//rock move button
document.querySelector('.js-rock-button')
.addEventListener('click',() =>{
pickMove('Rock');
});
//paper move button
document.querySelector('.js-paper-button')
.addEventListener('click',()=>{
    pickMove('PAPER');
});
//siccors move button
document.querySelector('.js-scissors-button')
.addEventListener('click',()=>{
    pickMove('SCISSORS');
});

//reset button
document.querySelector('.js-reset-button')
.addEventListener('click',()=>{
    reset()
});
//auto play button
document.querySelector('.js-autoplay-button')
.addEventListener('click',()=>{
    autoplay()
});
// keydown button
document.body.addEventListener('keydown',(event)=>{
    // console.log(event.key);
    if(event.key === 'r' || event.key === 'R')
    {
        pickMove('Rock');
    }
    if(event.key === 's' || event.key === 'S')
    {
        pickMove('SCISSORS');
    }
    if(event.key === 'p' || event.key === 'P')
    {
        pickMove('PAPER');
    }
});



function pickRandomNumber(){
const randomNumber=Math.random();
let computermove='';
 
    if(randomNumber>0 && randomNumber< 1/3)
    {
        computermove='Rock';
    }
    else if(randomNumber>1/3 && randomNumber <2/3)
    {
    computermove='SCISSORS';
    }
    else{
        computermove='PAPER';
    }
    console.log(computermove);
return computermove;
}
//auto play button
let isAutoPlaying=false;
let intervaleId;
function autoplay()
{
  if(!isAutoPlaying)
  {
    // intervaleId=setInterval(function(){
    //     const  playermove=pickRandomNumber();
    //     pickMove(playermove);
    //    },1000);
    intervaleId=setInterval( ()=>{
    const playermove=pickRandomNumber();
    pickMove(playermove);
    },1000);
       isAutoPlaying=true;
   }else{
     clearInterval(intervaleId);
     isAutoPlaying=false;
   }
  }
    
function pickMove(playermove) {
let result='';
const computermove=pickRandomNumber();
if(playermove === 'SCISSORS')
{
if(computermove === 'PAPER')
{
result='you win';
}
else if(computermove === 'Rock')
{
result='you loss';
}
else if(computermove === 'SCISSORS')
{
result='tie.';
}

}
else if(playermove === 'Rock')
{
// const computermove=pickRandomNumber();

   if(computermove === 'Rock'){
        result='tie.';
    }
    else if(computermove === 'PAPER')
    {
        result='you loss';
    }
    else if(computermove === 'SCISSORS')
    {
        result='you win';
    }

    
}
else if(playermove === 'PAPER')
{
// const computermove=pickRandomNumber();
if(computermove === 'PAPER')
{
result='tie.';
}
else if(computermove === 'Rock')
{
result='you win';
}
else if(computermove === 'SCISSORS')
{
result='you loss';
}
}

if(result  === 'you win')
{
score.wins++;
}
else if(result === 'you loss')
{
score.losses++;
}
else if(result === 'tie.')
{
score.ties++;
}
const obj=JSON.stringify(score);

localStorage.setItem('score',obj);

//updats the result
updateResultElement(result);
//updats the move element
updateMoveElements(playermove,computermove);
//updates the scors
updateScoreElement()
}

function updateScoreElement() {
document.querySelector('.js-score')
.innerHTML=`wins:${score.wins},  losses:${score.losses},  ties:${score.ties}`

} 

function updateResultElement(result) {
document.querySelector('.js-result')
.innerHTML=result
}

function updateMoveElements(playermove,computermove) {
document.querySelector('.js-move')
.innerHTML=`You 
<img src="images/${playermove}-emoji.png" alt="" class="move-icons">
<img src="images/${computermove}-emoji.png" alt="" class="move-icons">
Computer`;
}
