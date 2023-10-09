state = "startScreen"
pindMidt = 8
hul = []
ball = []
bane = []
levels = []
let levelNummer = 0;
let spilKnap;
let settingKnap;
function setup() {
  createCanvas(400, 400);
  spilKnap = createButton("Spil")
  settingKnap = createButton("Indstilling")
  spilKnap.position((width-spilKnap.width)/2,height/3)
  settingKnap.position((width-settingKnap.width)/2,height/3+2*settingKnap.height)
  spilKnap.mousePressed(LevelsShow)
  bane = [[{form:"rect",x:(width/2)-6,y:0,b:12,h:height,col:[139,69,19]},
          {form:"rect",x:50,y:200,b:100,h:12,col:[139,69,19]}]]
  hul = [
    {form:"cir",x:width/4+pindMidt/4,y:50,d:25,col:[0]},
    {form:"cir",x:3*width/4+3*pindMidt/4,y:50,d:25,col:[0]}
  ]
  ball = [
    {form:"cir",x:width/4+pindMidt/4,y:height-25,d:15,col:[255,0,0],speed:0,dir:0},
    {form:"cir",x:3*width/4+3*pindMidt/4,y:height-25,d:15,col:[255],speed:0,dir:0}
  ]
  Levelknapper()
  skyd = false 
  ref=0
}
function LevelsShow(){
  for(let i =0; i<levels.length;i++){
    levels[i].show()
  }
  spilKnap.hide()
  settingKnap.hide()
}

function Levelknapper(){
  for(let i =0; i<bane.length;i++){
    levels.push(createButton(i+1))
    levels[i].position((i%4+1)*width/5-levels[i].width/2,floor((i+4)/4)*height/5)
    levels[i].mousePressed(Level)
    levels[i].hide()
  }
}

function Level(){
  levelNummer = floor((mouseX-levels[0].width)*(5/width))+floor(mouseY*(5/height))*4-4
  for(let i =0; i<levels.length;i++){
    levels[i].hide()
  }
  state = "play"
}


function draw() {
  if (state == "play"){
    
    ball[0].x+=cos(ball[0].dir)*ball[0].speed
    ball[1].x+=cos(ball[1].dir)*ball[1].speed
    ball[0].y+=sin(ball[0].dir)*ball[0].speed
    ball[1].y+=sin(ball[1].dir)*ball[1].speed
    if(skyd == false){
      ball[0].dir =atan2((ball[ref].y-mouseY),(ball[ref].x-mouseX))
      ball[1].dir =atan2((ball[ref].y-mouseY),(ball[ref].x-mouseX))
      if(mouseIsPressed){
        if(sqrt((mouseX-ball[0].x)**2+(mouseY-ball[0].y)**2)<=(ball[0].d*0.5)){
          ref=0
          ball[0].col=[255,0,0]
          ball[1].col=[255]
        }else if(sqrt((mouseX-ball[1].x)**2+(mouseY-ball[1].y)**2)<=(ball[1].d*0.5)){
          ref=1
          ball[1].col=[255,0,0]
          ball[0].col=[255]
        }else{
        skyd = true
        ball[1].speed =4
        ball[0].speed =4
        }
      }
    }
    if(ball[1].speed>0.1 &ball[0].speed>0.1){
      ball[1].speed -=0.01
      ball[0].speed -=0.01
    }
    else{ 
      ball[1].speed =0
      ball[0].speed =0
      skyd =false
    }
  }
  strokeWeight(1)
  if(state == "startScreen"){
  
  }
  
  Kollison(ball,bane[levelNummer],hul)
  noStroke()
  Grid(40)
  stroke(100)
  Tegn(ball)
  Tegn(hul)
  Tegn(bane[levelNummer])
  //tegn pil
  if(skyd==false){
    strokeWeight(5)
    stroke(255,150,50)
    fill(255,150,50)
    endX=ball[ref].x+cos(ball[ref].dir)*50
    endY=ball[ref].y+sin(ball[ref].dir)*50
    line(ball[ref].x,ball[ref].y,endX,endY)
    triangle(endX,endY,endX-cos(ball[ref].dir+120)*10,endY-sin(ball[ref].dir+120)*10,endX-cos(ball[ref].dir-120)*10,endY-sin(ball[ref].dir-120)*10)
    strokeWeight(2)
    endX=ball[(ref+1)%2].x+cos(ball[(ref+1)%2].dir)*50
    endY=ball[(ref+1)%2].y+sin(ball[(ref+1)%2].dir)*50
    line(ball[(ref+1)%2].x,ball[(ref+1)%2].y,endX,endY)
    triangle(endX,endY,endX-cos(ball[(ref+1)%2].dir+120)*10,endY-sin(ball[(ref+1)%2].dir+120)*10,endX-cos(ball[(ref+1)%2].dir-120)*10,endY-sin(ball[(ref+1)%2].dir-120)*10)
  }
}

function Tegn(liste){
  for (let i = 0; i<liste.length;i++) {
    if (liste[i].col.length<2){
     fill(liste[i].col[0])
    }
    else{
     fill(liste[i].col[0],liste[i].col[1],liste[i].col[2]) 
    }
    if(liste[i].form =="cir"){
      circle(liste[i].x,liste[i].y,liste[i].d)
    }
    if(liste[i].form =="rect"){
      rect(liste[i].x,liste[i].y,liste[i].b,liste[i].h)
    }
  }
}

function Kollison(Spiller,bane,Hul){
  for(let i = 0;i<Spiller.length;i++){
    if(Spiller[i].x-Spiller[i].d/2<0||Spiller[i].x+Spiller[i].d/2>400){
      Spiller[i].dir =90*(PI/2)-Spiller[i].dir
    }
    if(Spiller[i].y-Spiller[i].d/2<0||Spiller[i].y+Spiller[i].d/2>400){
      ball[i].dir =Spiller[i].dir*(-1)
    }
    for(let j = 0;j<bane.length;j++){
      if(bane[j].form=="rect"){
        if (Spiller[i].x + Spiller[i].d/2 + cos(Spiller[i].dir)*Spiller[i].speed > bane[j].x && 
            Spiller[i].x + cos(Spiller[i].dir)*Spiller[i].speed  < bane[j].x + bane[j].b && 
            Spiller[i].y + Spiller[i].d/2 > bane[j].y && 
            Spiller[i].y < bane[j].y + bane[j].h) {
          Spiller[i].dir =90*(PI/2)-Spiller[i].dir
        }
        if (Spiller[i].x + Spiller[i].d/2 > bane[j].x && 
            Spiller[i].x < bane[j].x + bane[j].b && 
            Spiller[i].y + Spiller[i].d/2 + sin(Spiller[i].dir)*Spiller[i].speed > bane[j].y && 
            Spiller[i].y + sin(Spiller[i].dir)*Spiller[i].speed < bane[j].y + bane[j].h) {
          Spiller[i].dir =Spiller[i].dir*(-1)
       }
      }
      if(bane[j].form=="cir"){
        
      }
    }
    for(let j = 0;j<Hul.length;j++){
      if(Hul[j].d/2+Spiller[i].d/2>sqrt((Spiller[i].x-Hul[j].x)**2+(Spiller[i].y-Hul[j].y)**2)){
        Spiller[i].d=0
        ref=(i+1)%2
        Spiller[ref].col=[255,0,0]
      }
    }
  } 
}


function Grid(Antal=10) {
  for (i = 0; i < Antal; i++) {
    for (k = 0; k < Antal; k++) {
      if ((k % 2 == 1) & (i % 2 == 1)) {
        fill(60, 120, 60);
      } else if ((k % 2 == 0) & (i % 2 == 0)) {
        fill(60, 120, 60);
      } else {
        fill(0,255,0);
      }
      rect((width/Antal) * i, (height/Antal) * k, 50, 50);
    }
  }
}