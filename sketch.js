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
  createCanvas(600, 600);
  spilKnap = createButton("Spil")
  settingKnap = createButton("Indstilling")
  spilKnap.position((width-spilKnap.width)/2,height/3)
  settingKnap.position((width-settingKnap.width)/2,height/3+2*settingKnap.height)
  spilKnap.mousePressed(LevelsShow)
  bane = [
    //index 0
    {obs: [{form:"rect",x:(width/2)-1.5*width/100,y:0,b:3*width/100,h:height,col:[139,69,19]}],
    hul: [{form:"cir",x:width/4,y:width/8,d:width/16,col:[0]},{form:"cir",x:3*width/4,y:width/8,d:width/16,col:[0]}]
    },
    //index 1
    {obs:[{form:"rect",x:(width/2)-1.5*width/100,y:0,b:3*width/100,h:height,col:[139,69,19]}, {form:"rect",x:width/8,y:height/2,b:width/4,h:3*height/100,col:[139,69,19]}],
    hul:[{form:"cir",x:width/4,y:width/8,d:width/16,col:[0]},{form:"cir",x:3*width/4,y:width/8,d:width/16,col:[0]}]
    },
    //index 2
    {obs:[{form: "line",xcent:width/2,ycent:height/2,length:width/6,angle:PI/4, col:[139,69,19]}],
    hul:[{form:"cir",x:width/4,y:width/8,d:width/16,col:[0]},{form:"cir",x:3*width/4,y:width/8,d:width/16,col:[0]}]
    }
  ]
  ball = [
    {form:"cir",x:width/4,y:15*height/16,d:1.5*width/40,col:[255],speed:0,dir:0},
    {form:"cir",x:3*width/4,y:15*height/16,d:1.5*width/40,col:[255],speed:0,dir:0}
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
          ball[0].col=[255,250,0]
          ball[1].col=[255]
        }else if(sqrt((mouseX-ball[1].x)**2+(mouseY-ball[1].y)**2)<=(ball[1].d*0.5)){
          ref=1
          ball[1].col=[255,250,0]
          ball[0].col=[255]
        }else if(ball[1].col.length>2||ball[0].col.length>2){
        skyd = true
        ball[1].speed =width/100
        ball[0].speed =width/100
        }
      }
    }
    if(ball[1].speed>width/4000 &ball[0].speed>width/4000){
      ball[1].speed -=width/40000
      ball[0].speed -=width/40000
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
  
  Kollison(ball,bane[levelNummer].obs,bane[levelNummer].hul)
  noStroke()
  Grid(40)
  stroke(100)
  Tegn(ball)
  Tegn(bane[levelNummer].hul)
  Tegn(bane[levelNummer].obs)
  //tegn pil
  if(skyd==false){
    if(ball[1].col.length>2||ball[0].col.length>2){
    strokeWeight(width/100)
    stroke(255,250,0)
    fill(255,250,0)
    endX=ball[ref].x+cos(ball[ref].dir)*width/8
    endY=ball[ref].y+sin(ball[ref].dir)*width/8
    line(ball[ref].x,ball[ref].y,endX,endY)
    triangle(endX,endY,endX-cos(ball[ref].dir+120)*width/40,endY-sin(ball[ref].dir+120)*width/40,endX-cos(ball[ref].dir-120)*width/40,endY-sin(ball[ref].dir-120)*width/40)
    strokeWeight(width/200)
    endX=ball[(ref+1)%2].x+cos(ball[(ref+1)%2].dir)*width/8
    endY=ball[(ref+1)%2].y+sin(ball[(ref+1)%2].dir)*width/8
    line(ball[(ref+1)%2].x,ball[(ref+1)%2].y,endX,endY)
    triangle(endX,endY,endX-cos(ball[(ref+1)%2].dir+120)*width/40,endY-sin(ball[(ref+1)%2].dir+120)*width/40,endX-cos(ball[(ref+1)%2].dir-120)*width/40,endY-sin(ball[(ref+1)%2].dir-120)*width/40)
    }
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
      strokeWeight(width/200)
      stroke(255-255*i,100,255*i)
      circle(liste[i].x,liste[i].y,liste[i].d)
      stroke(100)
      strokeWeight(1)
    }
    if(liste[i].form =="rect"){
      rect(liste[i].x,liste[i].y,liste[i].b,liste[i].h)
    }
    if(liste[i].form =="line"){
      strokeWeight(10)
      stroke(liste[i].col)
      line(liste[i].xcent+cos(liste[i].angle)*liste[i].length, liste[i].ycent+sin(liste[i].angle)*liste[i].length, liste[i].xcent-cos(liste[i].angle)*liste[i].length, liste[i].ycent-sin(liste[i].angle)*liste[i].length)
      stroke(100)
      strokeWeight(1)
    }
  }
}

function Kollison(Spiller,bane,Hul){
  for(let i = 0;i<Spiller.length;i++){
    //bounce on horizontal edges
    if(Spiller[i].x-Spiller[i].d/2<0||Spiller[i].x+Spiller[i].d/2>width){
      Spiller[i].dir =90*(PI/2)-Spiller[i].dir
    }
    //bounce on vertical edges
    if(Spiller[i].y-Spiller[i].d/2<0||Spiller[i].y+Spiller[i].d/2>height){
      ball[i].dir =Spiller[i].dir*(-1)
    }

    for(let j = 0;j<bane.length;j++){
      //bounce on rectangular obstacles
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
      //bounce on line
      if(bane[j].form=="line"){
        xproj = Spiller[i].x - cos(bane[j].angle+PI/2)*(cos(bane[j].angle+PI/2)*(Spiller[i].x-bane[j].xcent) + sin(bane[j].angle+PI/2)*(Spiller[i].y-bane[j].ycent))
        yproj = Spiller[i].y - sin(bane[j].angle+PI/2)*(cos(bane[j].angle+PI/2)*(Spiller[i].x-bane[j].xcent) + sin(bane[j].angle+PI/2)*(Spiller[i].y-bane[j].ycent))
        if(sqrt((xproj-Spiller[i].x)**2 + (yproj-Spiller[i].y)**2) <Spiller[i].d/2){
          if(sqrt((xproj-bane[j].xcent)**2 + (yproj-bane[j].ycent)**2) <bane[j].length){
            Spiller[i].dir=2*bane[j].angle - Spiller[i].dir
          }
        }
      }

    }
    
    //skyd i hul
    if(Hul[i].d/2+Spiller[i].d/2>sqrt((Spiller[i].x-Hul[i].x)**2+(Spiller[i].y-Hul[i].y)**2)){
      Spiller[i].d=0
      ref=(i+1)%2
      Spiller[ref].col=[255,250,0]
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