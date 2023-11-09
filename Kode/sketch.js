state = "startScreen" //Har to tilstande play og startScreen
let coins = 0;        //coins bruges i shoppen
bane = []             //Indholder alle bane designs index er udtryk for level nummer
let levelNummer = 0;  //levelnummer refferer til et objekti i bane
let cnv;              //Indeholder canvas div
let levelCoins = [1,1,2,2,3,3,4]
let levelMaxStroke = [2,2,2,2,2,2]
let skud = 0;
function setup() {
  cnv = createCanvas(450, 450);
  screenHeight = windowHeight/2-canvas.height/4             //Beskrive hjørnepos af canvas iforhold til bredde.
  screenWidth = windowWidth/2-canvas.width/4                //Beskrive hjørnepos af canvas iforhold til højde.
  cnv.position(screenWidth,screenHeight)                    //Placere canvas i midten af vinduet
  
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
      {form:"line",xcent:width/2,ycent:height/2,length:width/4,angle:PI/4,t:50,angvel:PI/120, col:[139,69,19]},
      {form:"rect",x:0,y:height/8,b:width/5,h:6*height/8,col:[30,144,255]},
      {form:"rect",x:4*width/5,y:height/8,b:width/5,h:6*height/8,col:[30,144,255]}
    ],
    hul:[
      {form:"cir",x:width/4,y:width/8,d:width/16,col:[0]},{form:"cir",x:3*width/4,y:width/8,d:width/16,col:[0]}],
    ball:[
      {form:"cir",x:width/4,y:15*height/16,d:1.5*width/40,col:[255],speed:0,dir:0},
      {form:"cir",x:3*width/4,y:15*height/16,d:1.5*width/40,col:[255],speed:0,dir:0}]
    },
    //bane index 4
    {obs:[
      {form:"rect",x:0,y:0,b:width/10,h:height,col:[30,144,255]},
      {form:"rect",x:9*width/10,y:0,b:width/10,h:height,col:[30,144,255]},
      {form:"line",xcent:width/5,ycent:height/2,length:width/8,angle:PI,t:15,angvel:PI/120, col:[139,69,19]},
      {form:"line",xcent:4*width/5,ycent:height/2,length:width/8,angle:PI,t:15,angvel:-PI/120, col:[139,69,19]},
      {form:"line",xcent:width/2,ycent:height/5,length:width/5,angle:PI,t:20,angvel:0, col:[139,69,19]}
    ],
    hul:[
      {form:"cir",x:4*width/5,y:width/8,d:width/16,col:[0]},{form:"cir",x:width/5,y:width/8,d:width/16,col:[0]}],
    ball:[
      {form:"cir",x:3*width/4,y:15*height/16,d:1.5*width/40,col:[255],speed:0,dir:0},
      {form:"cir",x:width/4,y:15*height/16,d:1.5*width/40,col:[255],speed:0,dir:0}]
    },
    //bane index 5
    {
      obs:[
        {form:"booster",x:width/4,y:2*height/5,b:width/10,h:height/10,boost:[width/1000,0],col:[139,69,19],col2:[255,0,255]},
        {form:"booster",x:3*width/4,y:3*height/5,b:width/10,h:height/10,boost:[-width/1000,-width/3000],col:[139,69,19],col2:[255,0,255]}
      ],
      hul:[
        {form:"cir",x:4*width/5,y:width/8,d:width/16,col:[0]},
        {form:"cir",x:width/5,y:width/8,d:width/16,col:[0]}
      ],
      ball:[
        {form:"cir",x:width/4,y:15*height/16,d:1.5*width/40,col:[255],speed:0,dir:0},
        {form:"cir",x:3*width/4,y:15*height/16,d:1.5*width/40,col:[255],speed:0,dir:0}
      ]
    }
  ]

  //ball listen indenholder de to bolde der skydes til som et objekt
  ball = [
    {form:"cir",x:width/4,y:15*height/16,d:1.5*width/40,col:[255],speed:0,dir:0,hat:0},
    {form:"cir",x:3*width/4,y:15*height/16,d:1.5*width/40,col:[255],speed:0,dir:0,hat:0}
  ]
  //sørger for man ikke kan skyde med det samme
  skyd = false 
  //ref er en refference til den bold man har trykket på og vil skyde til
  ref=0
  //Kalder MenuSetup som er under menu.js
  MenuSetup()
}


//Bliver kaldt når der er trykket på et vilkårligt level.
function Level(){
  //finder levelet der er trykket på via mussens position
  levelNummer = floor((mouseX-levelsKnapper[0].width)*(5/width))+floor(mouseY*(5/height))*4-4 
  //hider alle knapper da spillet skal starte
  for(let i =0; i<levelsKnapper.length;i++){
    levelsKnapper[i].hide()
  }
  //hvis en hat er aktiveret skal den vise
  if(hat[0]!=0){
    ball[0].hat.show()
    ball[1].hat.show()
  }
  //Søger for at ball objektet er ligmed banen 
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
  //sætter state til play
  state = "play"
  tilbageKnap.position(windowWidth-tilbageKnap.width-10,windowHeight-tilbageKnap.height-10)
}


function draw() {
  //tegner de ting der skal tegnes
  TegnDraw()
  //hvis spillet skal spilles er state play
  if (state == "play"){
    stroke(0)
    fill(255)
    text(skud,20,20)
    fill(255,0,0)
    text(levelMaxStroke[levelNummer],2,20)
    //Tjekker om man har brugt maks skud
    if(skud>levelMaxStroke[levelNummer]-1&&skyd==false){
      skud = 0
      ref =0
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
    }

    //Tjekker om diameteren af bolden er mindre end en og dermed om der har ramt hullet
    if(ball[0].d<1&&ball[1].d<1){
      //giver  coins for at klare et level
      coins+=levelCoins[levelNummer]
      //state er startScreen men dette er i teorien ligegyldigt den skal bare være alt andet en play
      state = "startScreen"
      //Man kan ikke skyde under startskrærmen
      skyd = false
      //Kalder mellemlevels menuen
      MellemLevels()
      //Sørger for der ikke er en refferece bold
      ref =0
      skud = 0
    }
    //Flytter bolden i x og y retningen alt efter retningen og farten
    ball[0].x+=cos(ball[0].dir)*ball[0].speed
    ball[1].x+=cos(ball[1].dir)*ball[1].speed
    ball[0].y+=sin(ball[0].dir)*ball[0].speed
    ball[1].y+=sin(ball[1].dir)*ball[1].speed
    //Hvis en hat er aktiveret skal den sættet oven på bolden
    if(hat[0]!=0){
      ball[0].hat.position(ball[0].x-ball[0].d/1.7+screenWidth,ball[0].y-ball[0].d+screenHeight)
      ball[1].hat.position(ball[1].x-ball[1].d/1.7+screenWidth,ball[1].y-ball[1].d+screenHeight)
    }
    //hvis skyd er false skal dir være den modsatte retning af musen og 
    //hvis man trykker skal længden af pilen være propotional til længden af pilen
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
        skud++
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
    //Friktion hvor farten under en værdi bliver sat ligmed nul
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
    //hvis begge bold står stille skal man kunne skyde igen
    if(ball[0].speed ==0 & ball[1].speed ==0){
      skyd=false
    }
  }
  strokeWeight(1)
  //kollisons funktion indeholder tre lister henholdsvis boldene, baneforhindringerne og hullerne
  Kollison(ball,bane[levelNummer].obs,bane[levelNummer].hul)
  //displayer altid coins oppe i højre hjørne
  fill(255,255,0)
  stroke(10)
  textSize(25)
  text(coins,width-20*(floor(coins/10)+1),20)
}




