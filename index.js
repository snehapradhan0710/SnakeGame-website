console.log("Sneha");
let inputDir={x:0,y:0};
const foodSong=new Audio('food.mp3');
const gameOverSong=new Audio('gameOver.wav');
const moveSong=new Audio('move.wav');
const musicSong=new Audio('music.wav');


let speed=5;
let score=0;
let lastPaintTime=0;
let snakeArr=[
    {x:13,y:15}
]
let food={x:6 , y:10};

function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime-lastPaintTime)/1000< 1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}



function isCollide(snake){
    ///IF YOU COLLIDE TO YOURSELF
    for(let i=1;i<snakeArr.length;i++){
        if(snake[i].x ==snake[0].x && snake[i].y==snake[0].y){
            return true;
        }
    }
    ///BUMP INTO THE  WALL.....................
    if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0 ){
        return true;
    }
}
function gameEngine(){
    //////UPDATING THE SNAKE ARRAY AND FOOD ..........
    //////IF THE SNAKE GETS COLLIDED, THEN ................  
    
    if(isCollide(snakeArr)){
        gameOverSong.play();
        musicSong.pause();
        inputDir={x:0 , y:0};
        alert("Game Over . Please Enter any key to Play Again");
        snakeArr=[{x:13,y:15}]
        score=0;
         // musicSong.play();

    }
    //////IF THE FOOD IS EATEN REGENERATE THE FOOD AGAIN
    if(snakeArr[0].y ==food.y && snakeArr[0].x==food.x){
        foodSong.play();
        score++;
        if(score>highScoreVal){
            highScoreVal=score;
            localStorage.setItem("highScore",JSON.stringify(highScoreVal));
            highScoreBox.innerHTML="HighScore : "+highScoreVal;
        
        }
        scoreBox.innerHTML="Score: "+score;
        snakeArr.unshift({x:snakeArr[0].x+ inputDir.x , y:snakeArr[0].y + inputDir.y});
        let a=1;
        let b=18;
        food={x: Math.round(a+(b-a)*Math.random()),y: Math.round(a+(b-a)*Math.random())};
        
        
    }

    for(let i=snakeArr.length-2;i>=0;i--){
        // const element=array[i];
        snakeArr[i+1]={...snakeArr[i]};
    }
    snakeArr[0].x +=inputDir.x;
    snakeArr[0].y +=inputDir.y;
    
    
//INORDER TO CHECK IF THE THERE IS ANY SNAKE IS THERE OR NOT 
///DISPLAYING THE SNAKE..........................................
    board.innerHTML="";
    snakeArr.forEach((e,index) => {
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if (index==0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        
        board.appendChild(snakeElement);
    });
    ///////DISPLAYING THE FOOD.............................
    foodElement=document.createElement('div');
        foodElement.style.gridRowStart=food.y;
        foodElement.style.gridColumnStart=food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);


}
////LOGIC BEGINS FROM HERE........................
let highScore=localStorage.getItem("highScore");
if(highScore==null){
     highScoreVal=0;
    localStorage.setItem("highScore",JSON.stringify(highScoreVal));
}
else {
    highScoreVal=JSON.parse(highScore);
    highScoreBox.innerHTML="HighScore : "+highScore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:0 , y: 1}////To START THE GAME ..............
    moveSong.play();
    switch(e.key){
        case 'ArrowUp':
            console.log("Arrow Up");
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case 'ArrowDown':
            console.log("Arrow Down");
            inputDir.x=0;
            inputDir.y=1;
            break;
        case 'ArrowLeft':
            console.log("Arrow Left");
            inputDir.x=-1;
            inputDir.y=0;
            break;
        case 'ArrowRight':
            console.log("Arrow Right");
            inputDir.x=1;
            inputDir.y=0;
            break;
        default:
            break;
    }
})