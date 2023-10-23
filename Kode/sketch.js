state = "startScreen"
pindMidt = 8
hul = []
ball = []
bane = []
let levelNummer = 0;

function setup() {
  createCanvas(600, 600);
  bane = [
    //bane index 0
    {obs: [
      {form:"rect",x:(width/2)-1.5*width/100,y:0,b:3*width/100,h:height,col:[139,69,19]}],
    hul: [
      {form:"cir",x:(width-1.5*width/100)/4,y:height/8,d:width/16,col:[0]},
      {form:"cir",x:3*(width-1.5*width/100)/4,y:width/8,d:width/16,col:[0]}],
    ball:[
      {form:"cir",x:(width-1.5*width/100)/4,y:15*height/16,d:1.5*width/40,col:[255],speed:0,dir:0},
      {form:"cir",x:3*(width-1.5*width/100)/4+1.5*width/100,y:15*height/16,d:1.5*width/40,col:[255],speed:0,dir:0}]
    },
    //bane index 1
    {obs:[{
      form:"rect",x:(width/2)-1.5*width/100,y:0,b:3*width/100,h:height,col:[139,69,19]}, {form:"rect",x:width/8,y:height/2,b:width/4,h:3*height/100,col:[139,69,19]}],
    hul:[
      {form:"cir",x:width/4,y:width/8,d:width/16,col:[0]},{form:"cir",x:3*width/4,y:width/8,d:width/16,col:[0]}],
    ball:[
      {form:"cir",x:width/4,y:15*height/16,d:1.5*width/40,col:[255],speed:0,dir:0},
      {form:"cir",x:3*width/4,y:15*height/16,d:1.5*width/40,col:[255],speed:0,dir:0}]
    },
    //bane index 2
    {obs:[
      {form: "line",xcent:width/2,ycent:height/2,length:width/6,angle:PI/4,t:50,angvel:PI/128, col:[139,69,19]}],
    hul:[
      {form:"cir",x:width/4,y:width/8,d:width/16,col:[0]},{form:"cir",x:3*width/4,y:width/8,d:width/16,col:[0]}],
    ball:[
      {form:"cir",x:width/4,y:15*height/16,d:1.5*width/40,col:[255],speed:0,dir:0},
      {form:"cir",x:3*width/4,y:15*height/16,d:1.5*width/40,col:[255],speed:0,dir:0}]
    },
    //bane index 3 
    {obs:[
      {form:"line",xcent:width/2,ycent:height/2,length:width/6,angle:PI/4,t:50,angvel:0, col:[139,69,19]},
      {form:"rect",x:200,y:200,b:100,h:100,col:[30,144,255]}],
    hul:[
      {form:"cir",x:width/4,y:width/8,d:width/16,col:[0]},{form:"cir",x:3*width/4,y:width/8,d:width/16,col:[0]}],
    ball:[
      {form:"cir",x:width/4,y:15*height/16,d:1.5*width/40,col:[255],speed:0,dir:0},
      {form:"cir",x:3*width/4,y:15*height/16,d:1.5*width/40,col:[255],speed:0,dir:0}]
    }
  ]
  ball = [
    {form:"cir",x:width/4,y:15*height/16,d:1.5*width/40,col:[255],speed:0,dir:0,hat:0},
    {form:"cir",x:3*width/4,y:15*height/16,d:1.5*width/40,col:[255],speed:0,dir:0,hat:0}
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
  if(hat[0]!=0){
    ball[0].hat.show()
    ball[1].hat.show()
  }
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
      MellemLevels()
      ref =0
    }


    ball[0].x+=cos(ball[0].dir)*ball[0].speed
    ball[1].x+=cos(ball[1].dir)*ball[1].speed
    ball[0].y+=sin(ball[0].dir)*ball[0].speed
    ball[1].y+=sin(ball[1].dir)*ball[1].speed
    if(hat[0]!=0){
      ball[0].hat.position(ball[0].x-ball[0].d/1.7,ball[0].y-ball[0].d)
      ball[1].hat.position(ball[1].x-ball[1].d/1.7,ball[1].y-ball[1].d)
    }
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
        
        if(sqrt((ball[ref].x-mouseX)**2+(ball[ref].y-mouseY)**2)>width/3){
          ball[1].speed =width/75
          ball[0].speed =width/75
        }
        else{
          ball[1].speed =(sqrt((ball[ref].x-mouseX)**2+(ball[ref].y-mouseY)**2)/25)
          ball[0].speed =(sqrt((ball[ref].x-mouseX)**2+(ball[ref].y-mouseY)**2)/25)
        }
        }
      }
    }
    if(ball[0].speed>width/4000 & ball[0].d>1){
      ball[0].speed -=width/20000
      skyd=true
    }else{ 
      ball[0].speed =0
    }
    if(ball[1].speed>width/4000 & ball[1].d>1){
      ball[1].speed -=width/20000
      skyd=true
    }else{ 
      ball[1].speed =0
    }
    if(ball[0].speed ==0 & ball[1].speed ==0){
      skyd=false
    }
  }
  strokeWeight(1)
  Kollison(ball,bane[levelNummer].obs,bane[levelNummer].hul)
  TegnDraw()
}




