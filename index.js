//初始化成绩面板
var score = 0;
scoreDiv = document.querySelector('.score')
//更新得分数据
function updateScore(){
  scoreDiv.innerText = `得分:${score}`
}
//初始化困难选择面板
var difficultyFlag = 1000
const difficulty = [
  {time:1000, active:true},
  {time:800, active:false},
  {time:500, active:false}
]
const difficultyDiv = document.querySelectorAll('.difficulty > div')
//点击后改变难度
difficultyDiv[0].onclick = () => {
  difficulty.forEach(element => {
    element.active = false
  });
  difficultyDiv.forEach(element => {
    element.style.color = 'black'
  });
  difficulty[0].active = true
  if(difficulty[0].active) difficultyDiv[0].style.color = 'red'
  else difficultyDiv[0].style.color = 'black'
  difficultyFlag = difficulty[0].time
}
difficultyDiv[1].onclick = () => {
  difficulty.forEach(element => {
    element.active = false
  });
  difficultyDiv.forEach(element => {
    element.style.color = 'black'
  });
  difficulty[1].active = true
  if(difficulty[1].active) difficultyDiv[1].style.color = 'red'
  else difficultyDiv[1].style.color = 'black'
  difficultyFlag = difficulty[1].time
}
difficultyDiv[2].onclick = () => {
  difficulty.forEach(element => {
    element.active = false
  });
  difficultyDiv.forEach(element => {
    element.style.color = 'black'
  });
  difficulty[2].active = true
  if(difficulty[2].active) difficultyDiv[2].style.color = 'red'
  else difficultyDiv[2].style.color = 'black'
  difficultyFlag = difficulty[2].time
}
//游戏结束
function gameOver(){
  if(gameOn){
    clearInterval(timer)
    tip.innerText = "游戏暂停中...";
    gameOn = false
    alert(`游戏结束\n您的得分:${score}`)
  }
}
//开始与暂停按钮
startBtn = document.querySelector(".start");
pauseBtn = document.querySelector(".pause");
tip = document.querySelector(".tip");
var timer
startBtn.onclick = () => {
  tip.innerText = "游戏进行中...";
  gameOn = true
  main()
  timer = setInterval(() => {
    snakeMove()
  },difficultyFlag)
};
pauseBtn.onclick = () => {
  tip.innerText = "游戏暂停中...";
  gameOn = false
  clearInterval(timer)
};
//游戏初始化
var gameOn = false;
//初始化地图
const map = [];
for (let i = 0; i < 20; i++) {
  for (let j = 0; j < 20; j++) {
    map.push({ x: i, y: j });
  }
}
//蛇移动相关配置
var directionNum = {
  left:{x:-1, y:0, flag:'left'},
  right:{x:1, y:0, flag:'right'},
  up:{x:0, y:-1, flag:'up'},
  down:{x:0, y:1, flag:'down'}
}
//初始化蛇
var snake = {
  direction:directionNum.right,
  snakePos: [
    { x: 0, y: 0, flag: "b", doc: "" },
    { x: 1, y: 0, flag: "b", doc: "" },
    { x: 2, y: 0, flag: "b", doc: "" },
    { x: 3, y: 0, flag: "h", doc: "" },
  ],
};
//初始化食物
var food = {
  x: 0,
  y: 0,
  doc: "",
};
//生成食物的方法
function generateFood () {
  while (true) {
    var repeat
    food.x = Math.floor(Math.random() * 20);
    food.y = Math.floor(Math.random() * 20);
    for (let i = 0; i < snake.snakePos[i], length; i++) {
      if (snake.snakePos[i].x === food.x && snake.snakePos[i].y === food.y) {
        repeat = true
        break;
      }
    }
    if(!repeat){
      break
    }
  }
  if(!food.doc){
    food.doc = document.createElement('div')
    food.doc.style.background = 'pink'
    food.doc.style.position = 'absolute'
    food.doc.style.width = 30 + 'px'
    food.doc.style.height = 30 + 'px'
    document.querySelector('.container').appendChild(food.doc)
  }
  food.doc.style.left = food.x * 30 + 'px'
  food.doc.style.top = food.y * 30 + 'px'
};
//碰撞检测函数
function isCollite (newHead){
  var collideInfo = {
    isCollite: false,
    isEat: false
  }
  //是否碰壁
  if(newHead.x < 0 || newHead.x > 20 || newHead.y < 0 || newHead.y > 20){
    collideInfo.isCollite = true
    return collideInfo
  }
  //是否碰到自己
  for(let i = 0;i < snake.snakePos.length;i++){
    if(snake.snakePos[i].x === newHead.x && snake.snakePos[i].y === newHead.y){
      collideInfo.isCollite = true
    }
  }
  //是否进食
  if(newHead.x == food.x && newHead.y == food.y){
    collideInfo.isEat = true
    return collideInfo
  }
  return collideInfo
}
//生成蛇的方法
function generateSnake (snake) {
  for (let i = 0; i < snake.snakePos.length; i++) {
    if (!snake.snakePos[i].doc) {
      snake.snakePos[i].doc = document.createElement("div");
      snake.snakePos[i].doc.style.position = "absolute";
      snake.snakePos[i].doc.style.width = 30 + "px";
      snake.snakePos[i].doc.style.height = 30 + "px";
      snake.snakePos[i].doc.style.left = snake.snakePos[i].x * 30 + "px";
      snake.snakePos[i].doc.style.top = snake.snakePos[i].y * 30 + "px";
      if (snake.snakePos[i].flag == "h") {
        snake.snakePos[i].doc.style.background = "black";
      } else {
        snake.snakePos[i].doc.style.background = "yellow";
      }
    }
    document.querySelector(".container").appendChild(snake.snakePos[i].doc);
  }
};
//蛇移动方法
function snakeMove(){
  var oldHead = snake.snakePos[snake.snakePos.length - 1]
  var newHead = {
    doc:'',
    x:snake.snakePos[snake.snakePos.length - 1].x + snake.direction.x,
    y:snake.snakePos[snake.snakePos.length - 1].y + snake.direction.y,
    flag:'h'
  }
  //碰撞检测
  if(isCollite(newHead).isCollite){
    //碰撞
    gameOver()
  }
  oldHead.flag = 'b'
  oldHead.doc.style.background = "yellow"
  snake.snakePos.push(newHead)
  if(isCollite(newHead).isEat){//进食了
    //得分增加
    score++
    //生成新食物
    generateFood()
  }else{//未进食
    document.querySelector('.container').removeChild(snake.snakePos[0].doc)
    snake.snakePos.shift()
  }
  //更新蛇位置
  generateSnake(snake)
  //更新得分
  updateScore()
}
//键盘事件
function bindEvent (){
  document.onkeydown = (e) => {
    //判断游戏是否进行中
    if(gameOn){
      if(e.key === 'ArrowUp'){
        snake.direction = directionNum.up
      }
      if(e.key === 'ArrowDown'){
        snake.direction = directionNum.down
      }
      if(e.key === 'ArrowLeft'){
        snake.direction = directionNum.left
      }
      if(e.key === 'ArrowRight'){
        snake.direction = directionNum.right
      }
      snakeMove()
    }
  }
}
function main(){
  generateSnake(snake);
  generateFood()
  bindEvent()
}
