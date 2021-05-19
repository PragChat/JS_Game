const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerHeight;
canvas.height = window.innerHeight;
var rowcol = 10;
var brickdim = (window.innerHeight * 10) / 121;
var brickpad = window.innerHeight / 121;
var offset = (window.innerHeight * 6) / 121;
var bricks = [];
var flags = 10;
var xblock;
var yblock;
var hasStarted = 0;
var winstate = 0;
var bgAudio = new Audio('./sounds/Rondo_Alla_Turka.ogg');
var boom =  new Audio('./sounds/Shotgun_Blast-Jim_Rogers-1914772763.wav');
var winn =  new Audio('./sounds/156515__jobro__hockey-fanfare-1.wav');
var crack = new Audio('./sounds/164472__deleted-user-2104797__crack-of-branch-3.wav');
var plop = new Audio('./sounds/447910__breviceps__plop.wav');
var countDownDate = new Date().getTime();
var leadobj;

var playername = window.prompt("Enter your name");
console.log(playername);
var x = setInterval(function() {
  var now = new Date().getTime();
  var distance = now-countDownDate;
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
  document.getElementById("time").innerHTML = '🕑 ' + minutes + "m " + seconds + "s ";
}, 1000);
bgAudio.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
if(playername!=undefined){
bgAudio.play();}
function reset() {
  for (var i = 0; i < rowcol; i++) {
    bricks[i] = [];
    for (var j = 0; j < rowcol; j++) {
      bricks[i][j] = { x: 0, y: 0, bomb: -2, flag: 0, state: 0 };
    }
  }
  
}
reset();
function drawBricks() {
  document.getElementById("flag").innerHTML = '🚩 ' + flags;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < rowcol; i++) {
    for (var j = 0; j < rowcol; j++) {
      bricks[i][j].x = i * (brickdim + brickpad) + offset;
      bricks[i][j].y = j * (brickdim + brickpad) + offset;
      if(bricks[i][j].state!=0){
        bricks[i][j].flag=0;
          switch(bricks[i][j].bomb)
          {
            case -2:
                ctx.beginPath();
                ctx.rect(bricks[i][j].x, bricks[i][j].y, brickdim, brickdim);
                if (bricks[i][j].flag == 0) {
                    ctx.fillStyle = "lime";
                } else if(bricks[i][j].flag == 1) {
                    ctx.fillStyle = "red";
                }
                ctx.fill();
                ctx.closePath();
                break;
            case 1:
                ctx.font = '48px serif';
                ctx.fillStyle = 'white';
                ctx.fillText('1', bricks[i][j].x + (brickdim/4.2), bricks[i][j].y + (brickdim/1.1));
                break;
            case 2:
                ctx.font = '48px serif';
                ctx.fillStyle = 'white';
                ctx.fillText('2', bricks[i][j].x + (brickdim/4.2), bricks[i][j].y + (brickdim/1.1));
                break;
            case 3:
                ctx.font = '48px serif';
                ctx.fillStyle = 'white';
                ctx.fillText('3', bricks[i][j].x + (brickdim/4.2), bricks[i][j].y + (brickdim/1.1));
                break;
            case 4:
                ctx.font = '48px serif';
                ctx.fillStyle = 'white';
                ctx.fillText('4', bricks[i][j].x + (brickdim/4.2), bricks[i][j].y + (brickdim/1.1));
                break;
            case 5:
                ctx.font = '48px serif';
                ctx.fillStyle = 'white';
                ctx.fillText('5', bricks[i][j].x + (brickdim/4.2), bricks[i][j].y + (brickdim/1.1));
                break;
            case 6:
                ctx.font = '48px serif';
                ctx.fillStyle = 'white';
                ctx.fillText('6', bricks[i][j].x + (brickdim/4.2), bricks[i][j].y + (brickdim/1.1));
                break;
            case 7:
                ctx.font = '48px serif';
                ctx.fillStyle = 'white';
                ctx.fillText('7', bricks[i][j].x + (brickdim/4.2), bricks[i][j].y + (brickdim/1.1));
                break;
            case 8:
                ctx.font = '48px serif';
                ctx.fillStyle = 'white';
                ctx.fillText('8', bricks[i][j].x + (brickdim/4.2), bricks[i][j].y + (brickdim/1.1));
                break;
            case -1:
                ctx.font = '40px serif';
                ctx.fillStyle = 'white';
                ctx.fillText('💣', bricks[i][j].x, bricks[i][j].y + (brickdim/1.1));
                break;
            }
            if(bricks[i][j].flag==1)
            {
              ctx.beginPath();
                ctx.rect(bricks[i][j].x, bricks[i][j].y, brickdim, brickdim);
                if (bricks[i][j].flag == 0) {
                    ctx.fillStyle = "lime";
                } else if(bricks[i][j].flag == 1) {
                    ctx.fillStyle = "red";
                }
                ctx.fill();
                ctx.closePath();
            }
        }
        else
        {
            ctx.beginPath();
                ctx.rect(bricks[i][j].x, bricks[i][j].y, brickdim, brickdim);
                if (bricks[i][j].flag == 0) {
                    ctx.fillStyle = "lime";
                } else {
                    ctx.fillStyle = "red";
                }
                ctx.fill();
                ctx.closePath();
        }
  }
}}
function flagger(e) {
  e.preventDefault();
  if(hasStarted==1){
  var xPosition = e.clientX;
  var yPosition = e.clientY;
  console.log(xPosition);
  console.log(yPosition);
  if (xPosition > offset || yPosition > offset) {
    xblock = Math.floor(
      (xPosition - offset - (window.innerWidth - window.innerHeight) / 2) /
        (brickdim + brickpad)
    );
    yblock = Math.floor((yPosition - offset) / (brickdim + brickpad));
    console.log(xblock);
    console.log(yblock);
    drawBricks();
  }
  console.log(xblock);
  console.log(yblock);
  if(bricks[xblock][yblock].state==0){
  if (bricks[xblock][yblock].flag == 0) {
    if (flags > 0) {
      bricks[xblock][yblock].flag = 1;
      flags--;
      console.log(xblock, yblock, flags)
    }
  } else {
    if (flags < 10) {
      bricks[xblock][yblock].flag = 0;
      flags++;
    }}
  }
  drawBricks();
  plop.play();
}}
for (var i = 0; i < 10; i++) {
  console.log(bricks[i]);
}
canvas.addEventListener("contextmenu", flagger, false);
canvas.addEventListener("click", stateBlock, false);
function detectBlock() {
  if (xPosition > offset || yPosition > offset) {
    xblock = Math.floor((xPosition - offset) / (brickdim + brickpad));
    yblock = Math.floor((yPosition - offset) / (brickdim + brickpad));
    console.log(xblock);
    console.log(yblock);
  }
  console.log(xblock);
  console.log(yblock);
  bricks[xblock][yblock].flag = 1;
}
function stateBlock(e) {
var xPosition = e.clientX;
  var yPosition = e.clientY;
  if (hasStarted != 0) {
    if (xPosition > offset || yPosition > offset) {
      xblock = Math.floor(
        (xPosition - offset - (window.innerWidth - window.innerHeight) / 2) /
          (brickdim + brickpad)
      );
      yblock = Math.floor((yPosition - offset) / (brickdim + brickpad));
      console.log(xblock);
      console.log(yblock);
    }
    console.log(xblock);
    console.log(yblock);
    miner(xblock, yblock);
  } else {
    if (xPosition > offset || yPosition > offset) {
        xblock = Math.floor(
          (xPosition - offset - (window.innerWidth - window.innerHeight) / 2) /
            (brickdim + brickpad)
        );
        yblock = Math.floor((yPosition - offset) / (brickdim + brickpad));
        console.log(xblock);
        console.log(yblock);
      }
      console.log(xblock);
      console.log(yblock);
    while (bricks[xblock][yblock].bomb != 0) {
        reset();
      planter();
      checker();
      console.log(bricks);
    }
    flags=10;
    hasStarted = 1;
    miner(xblock, yblock);
  }
  drawBricks();
  crack.play();
  losschk();
  winchk();
  alerter();
}
drawBricks();
showHighScores();
function planter() {
  for (var i = 0; i <= 9; i++) {
    var xbomb = Math.floor(Math.random() * 10);
    var ybomb = Math.floor(Math.random() * 10);

    if (bricks[xbomb][ybomb].bomb != -1) {
      bricks[xbomb][ybomb].bomb = -1;
    } else {
      i--;
    }
  }
}
function checker() {
  var num;
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      num = 0;
      if (bricks[i][j].bomb != -1) {
        if (i == 0 && j == 0) {
          for (var k = 0; k <= 1; k++) {
            for (var l = 0; l <= 1; l++) {
              if (bricks[k][l].bomb == -1) {
                num++;
              }
            }
          }
          bricks[i][j].bomb = num;
        } else if (i == 0 && j == 9) {
          for (var k = 0; k <= 1; k++) {
            for (var l = 9; l >= 8; l--) {
              if (bricks[k][l].bomb == -1) {
                num++;
              }
            }
          }
          bricks[i][j].bomb = num;
        } else if (i == 9 && j == 0) {
          for (var k = 9; k >= 8; k--) {
            for (var l = 0; l <= 1; l++) {
              if (bricks[k][l].bomb == -1) {
                num++;
              }
            }
          }
          bricks[i][j].bomb = num;
        } else if (i == 9 && j == 9) {
          for (var k = 9; k >= 8; k--) {
            for (var l = 9; l >= 8; l--) {
              if (bricks[k][l].bomb == -1) {
                num++;
              }
            }
          }
          bricks[i][j].bomb = num;
        } else if (i == 0) {
          for (var k = 0; k <= 1; k++) {
            for (var l = j - 1; l <= j + 1; l++) {
              if (bricks[k][l].bomb == -1) {
                num++;
              }
            }
          }
          bricks[i][j].bomb = num;
        } else if (i == 9) {
          for (var k = 9; k >= 8; k--) {
            for (var l = j - 1; l <= j + 1; l++) {
              if (bricks[k][l].bomb == -1) {
                num++;
              }
            }
          }
          bricks[i][j].bomb = num;
        } else if (j == 0) {
          for (var k = i - 1; k <= i + 1; k++) {
            for (var l = 0; l <= 1; l++) {
              if (bricks[k][l].bomb == -1) {
                num++;
              }
            }
          }
          bricks[i][j].bomb = num;
        } else if (j == 9) {
          for (var k = i - 1; k <= i + 1; k++) {
            for (var l = 9; l >= 8; l--) {
              if (bricks[k][l].bomb == -1) {
                num++;
              }
            }
          }
          bricks[i][j].bomb = num;
        } else {
          for (var k = i - 1; k <= i + 1; k++) {
            for (var l = j - 1; l <= j + 1; l++) {
              if (bricks[k][l].bomb == -1) {
                num++;
              }
            }
          }
          bricks[i][j].bomb = num;
        }
      }
    }
  }
}
function miner(xblock, yblock)
{if(bricks[xblock][yblock].flag!=1){
  if(bricks[xblock][yblock].state==0 && bricks[xblock][yblock].flag==0){
  bricks[xblock][yblock].state=1;
  crack.play();
  if(bricks[xblock][yblock].bomb==0 && bricks[xblock][yblock].flag==0)
  {
    if(xblock==0 && yblock==0)
    {
      miner(0,1);
      miner(1,0);
    }
    else if(xblock==9 && yblock==9)
    {
      miner(9,8);
      miner(8,9);
    }
    else if(xblock==0 && yblock==9)
    {
      miner(1,9);
      miner(0,8);
    }
    else if(xblock==9 && yblock==0)
    {
      miner(9, 1);
      miner(8, 0);
    }
    else if(xblock==0)
    {
      miner(0, yblock-1);
      miner(0, yblock+1);
      miner(1, yblock);
    }
    else if(yblock==0)
    {
      miner(xblock-1, 0);
      miner(xblock+1, 0);
      miner(xblock, 1);
    }
    else if(xblock==9)
    {
      miner(9, yblock-1);
      miner(9, yblock+1);
      miner(8, yblock);
    }
    else if(yblock==9)
    {
      miner(xblock-1, 9);
      miner(xblock+1, 9);
      miner(xblock, 8);
    }
    else
    {
      miner(xblock, yblock-1);
      miner(xblock, yblock+1);
      miner(xblock-1, yblock);
      miner(xblock+1, yblock);
    }
  }
  else if(bricks[xblock][yblock].flag==0)
  {
    bricks[xblock][yblock].state=1;
    crack.play();
  }}}
  drawBricks();
}
function winchk() {
  var statecount=0;
  for(var i=0; i<10; i++)
  {
    for(var j=0; j<10; j++)
    {
      if(bricks[i][j].state==0)
      {
        statecount++;
      }
    }
  }
  if(statecount==10 && winstate==0)
  {
    winstate=1;
    console.log(finaltime);
    checkHighScore((finalm*60)+finals); 
  }
}
function losschk()
{
  var brkchk=0;
  for(var i=0; i<10; i++)
  {
    for(var j=0; j<10; j++)
    {
      if(bricks[i][j].state==1 && bricks[i][j].bomb==-1)
      {
        winstate=-1;
        brkchk=1;
        break;
      }
    }
    if(brkchk)
    {
      break;
    }
  }
}
function alerter()
{
  if(winstate==1)
  {
    bgAudio.pause();
    winn.play();
    let myElement = document.querySelector(".reset");
    myElement.style.visibility = "visible";
    document.getElementById("loc").innerHTML = "Congratulations " + playername + "<br>You Win! 🥳";
  }
  else if(winstate==-1)
  {
    for(var i=0; i<10; i++)
    {
      for(var j=0; j<10; j++)
      {
        if(bricks[i][j].bomb==-1)
        {
          bricks[i][j].state=1;
        }
      }
    }
    drawBricks();
    bgAudio.pause();
    boom.play();
    let myElement = document.querySelector(".reset");
    myElement.style.visibility = "visible";
    document.getElementById("loc").innerHTML = "Sorry " + playername + "<br>You Lose! 😭";
    showHighScores();
  }
}
var countDownDate = new Date().getTime();
var finaltime;
var finalm;
var finals;
// Update the count down every 1 second
var x = setInterval(function() {
  var now = new Date().getTime();
  if(winstate==0){
  var distance = now-countDownDate;}
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  if(distance!=undefined)
  {
    finaltime=distance;
    finalm=minutes;
    finals=seconds;
    score = finalm + 'm ' + finals + 's'
  }
  else
  {
    leadobj = {Name: playername, time: finaltime, string: score}
    console.log(leadobj);
  }
  
  document.getElementById("time").innerHTML = '🕑 ' + finalm + "m " + finals + "s ";
}, 1000);
console.log(leadobj);
const NO_OF_HIGH_SCORES = 3;
const HIGH_SCORES = 'highScores';
const highScoreString = localStorage.getItem(HIGH_SCORES);
const highScores = JSON.parse(highScoreString) ?? [];
function checkHighScore(score) {
  const highScores = JSON.parse(localStorage.getItem(HIGH_SCORES)) ?? [];
  const lowestScore = highScores[NO_OF_HIGH_SCORES - 1]?.score ?? 0;
  
  if (score < lowestScore || lowestScore==undefined) {
    saveHighScore(score, highScores);
    showHighScores();
  }
}
function saveHighScore(score, highScores) {
  const newScore = { score, playername };
  
  // 1. Add to list
  highScores.push(newScore);

  // 2. Sort the list
  highScores.sort((a, b) => a.score - b.score);
  
  // 3. Select new list
  highScores.splice(NO_OF_HIGH_SCORES);
  
  // 4. Save to local storage
  localStorage.setItem(HIGH_SCORES, JSON.stringify(highScores));
}
function showHighScores()
{
  const highScores = JSON.parse(localStorage.getItem(HIGH_SCORES)) ?? [];
  const highScoreList = document.getElementById("zer");
  
  highScoreList.innerHTML = highScores
    .map((score) => `<li>${score.score}`)
    .join('');
}