state = "startScreen"
pindMidt = 8
hul = []
ball = []
bane = []
let levelNummer = 0;

function setup() {
  createCanvas(600, 600);
  bane = [
    //index 0
    {obs: [
      {form:"rect",x:(width/2)-1.5*width/100,y:0,b:3*width/100,h:height,col:[139,69,19]}],
    hul: [
      {form:"cir",x:width/4,y:width/8,d:width/16,col:[0]},{form:"cir",x:3*width/4,y:width/8,d:width/16,col:[0]}],
    ball:[
      {form:"cir",x:width/4,y:15*height/16,d:1.5*width/40,col:[255],speed:0,dir:0},
      {form:"cir",x:3*width/4,y:15*height/16,d:1.5*width/40,col:[255],speed:0,dir:0}]
    },
    //index 1
    {obs:[{
      form:"rect",x:(width/2)-1.5*width/100,y:0,b:3*width/100,h:height,col:[139,69,19]}, {form:"rect",x:width/8,y:height/2,b:width/4,h:3*height/100,col:[139,69,19]}],
    hul:[
      {form:"cir",x:width/4,y:width/8,d:width/16,col:[0]},{form:"cir",x:3*width/4,y:width/8,d:width/16,col:[0]}],
    ball:[
      {form:"cir",x:width/4,y:15*height/16,d:1.5*width/40,col:[255],speed:0,dir:0},
      {form:"cir",x:3*width/4,y:15*height/16,d:1.5*width/40,col:[255],speed:0,dir:0}]
    },
    //index 2
    {obs:[
      {form: "line",xcent:width/2,ycent:height/2,length:width/6,angle:PI/4, col:[139,69,19]}],
    hul:[
      {form:"cir",x:width/4,y:width/8,d:width/16,col:[0]},{form:"cir",x:3*width/4,y:width/8,d:width/16,col:[0]}],
    ball:[
      {form:"cir",x:width/4+(random(width/8)-width/16),y:15*height/16,d:1.5*width/40,col:[255],speed:0,dir:0},
      {form:"cir",x:3*width/4+(random(width/8)-width/16),y:15*height/16,d:1.5*width/40,col:[255],speed:0,dir:0}]
    }
  ]
  ball=[
    {form:"cir",x:width/4,y:15*height/16,d:1.5*width/40,col:[255],speed:0,dir:0},
     {form:"cir",x:3*width/4,y:15*height/16,d:1.5*width/40,col:[255],speed:0,dir:0}
   ]
  skyd = false 
  ref=0
  MenuSetup()
}


//Bliver kaldt når der er trykket på et vilkårligt level.
function Level(){
  levelNummer = floor((mouseX-levelsKnapper[0].width)*(5/width))+floor(mouseY*(5/height))*4-4  //Finder det level man har trykket på.
  for(let i =0; i<levelsKnapper.length;i++){
    levelsKnapper[i].hide()
  }
  tilbageKnap.hide()
  ball[0].x=bane[levelNummer].ball[0].x
  ball[0].y=bane[levelNummer].ball[0].y
  ball[0].d=bane[levelNummer].ball[0].d
  ball[1].x=bane[levelNummer].ball[1].x
  ball[1].y=bane[levelNummer].ball[1].y
  ball[1].d=bane[levelNummer].ball[1].d
  ball[0].col= [255]
  ball[1].col= [255]
  ball[0].speed=0
  ball[1].speed=0
  state = "play"
}


function draw() {
  if (state == "play"){
    if(ball[0].d<1&&ball[1].d<1){
      state = "startScreen"
      skyd = false
      StartScreen()
      ref =0
    }
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
  
  Kollison(ball,bane[levelNummer].obs,bane[levelNummer].hul)
  TegnDraw()
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