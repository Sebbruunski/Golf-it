//Indeholder alle de variable som indgår i menuen
shopTing = []
levelsKnapper = []
chekBokse = [] //Har et på index et en plads hvor man gemmer checkboksen
buyKnapper = []
let hat = [0,0];
let spilKnap;
let shopKnap;
let settingKnap;
let tilbageKnap;
let nesteLevel;
let screenWidth;
let screenHeight;
let soundKnap;
function LevelsKnapper(){
  for(let i =0; i<bane.length;i++){
    levelsKnapper.push(createButton(i+1))
    levelsKnapper[i].position((i%4+1)*width/5-levelsKnapper[i].width/2+screenWidth,floor((i+4)/4)*height/5+screenHeight)
    levelsKnapper[i].mousePressed(Level)
    levelsKnapper[i].hide()
  }
}



function Buy(){
  knap = floor((mouseX-levelsKnapper[0].width)*(5/width))+floor(mouseY*(5/height))*4-4
  if(coins>=3){
    coins-=3
    chekBokse[knap][0] = true
    chekBokse[knap][1].show()
    buyKnapper[knap].hide()
  }
}

function SettingShow(){
    tilbageKnap.show()
    spilKnap.hide()
    settingKnap.hide()
    shopKnap.hide()
    soundKnap[0].show()
}


function MellemLevels(){
  tilbageKnap.position(width/2-tilbageKnap.width-10+screenWidth,height/2+screenHeight)
  tilbageKnap.show()
  nesteLevel.show()
}

function StartScreen(){
    state = "startscreen"
    skud = 0
    ref = 0 
    tilbageKnap.position(0+screenWidth,7*height/8+screenHeight)
    nesteLevel.hide()
    tilbageKnap.hide()
    spilKnap.show()
    settingKnap.show()
    shopKnap.show()
    soundKnap[0].hide()
    for(let i =0; i<levelsKnapper.length;i++){
      levelsKnapper[i].hide()
    }
    for(let i =0; i<shopTing.length;i++){
      shopTing[i][1].hide()
      chekBokse[i][1].hide()
      buyKnapper[i].hide()
    }
}
  
function ShopShow(){
    for(let i = 0;i<shopTing.length;i++){
      shopTing[i][1].show()
      if(chekBokse[i][0]){
        chekBokse[i][1].show()
      }
      else
      {
        buyKnapper[i].show()
      }
    }
    spilKnap.hide()
    shopKnap.hide()
    settingKnap.hide()
    tilbageKnap.show()
}

function levelsShow(){
    for(let i =0; i<levelsKnapper.length;i++){
      levelsKnapper[i].show()
    }
    spilKnap.hide()
    shopKnap.hide()
    settingKnap.hide()
    tilbageKnap.show()
}

function ShopSetup(billedeListe){
  for(let i = 0; i<billedeListe.length;i++){
    shopTing.push([billedeListe[i],createImg(billedeListe[i],"")])
    shopTing[i][1].size(width/8,height/8) 
    shopTing[i][1].position((i%4+1)*width/5-shopTing[i][1].width/2+screenWidth,floor((i+4)/4)*height/5+screenHeight)
    shopTing[i][1].hide()
    chekBokse.push([false,createCheckbox("Valgt",false)])
    chekBokse[i][1].position((i%4+1)*width/5-30+screenWidth,floor((i+4)/4)*height/5+height/10+screenHeight)
    chekBokse[i][1].changed(TjekBoks)
    chekBokse[i][1].hide()
    buyKnapper.push(createButton(3))
    buyKnapper[i].position((i%4+1)*width/5-buyKnapper[i].width/2+screenWidth,floor((i+4)/4)*height/5+screenHeight)
    buyKnapper[i].mousePressed(Buy)
    buyKnapper[i].hide()
  }
}

function NextLevel(){
  if(levelNummer<bane.length-1){
    levelNummer += 1
  }
  tilbageKnap.position(windowWidth-tilbageKnap.width-10,windowHeight-tilbageKnap.height-10)
  nesteLevel.hide()
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

function TjekBoks(){
  let a = hat
  for(let i =0;i<chekBokse.length;i++){
    if (chekBokse[i][1].checked()&hat[0]!=shopTing[i][0]){
      a = shopTing[i]
    } else {
      chekBokse[i][1].checked(false)
    }
  }
  if(hat == a){
    hat = [0,0]
  }else{
    hat = a
    ball[0].hat=createImg(hat[0],"")
    ball[0].hat.size(1.5*width/40,1.5*width/40)
    ball[1].hat=createImg(hat[0],"")
    ball[1].hat.size(1.5*width/40,1.5*width/40)
    ball[0].hat.hide()
    ball[1].hat.hide()
  }
}

function Sounds(){
  if (soundKnap[1]==false)
  {
    soundKnap[1] = true
  }
  else
  {
    soundKnap[1] = false
  }
  console.log(soundKnap[1])
}


function MenuSetup(){
  nesteLevel =createButton("Næste level")
  tilbageKnap = createButton("Tilbage")
  shopKnap = createButton("Shop")
  spilKnap = createButton("Spil")
  settingKnap = createButton("Indstilling")
  soundKnap = [createButton("Lyd"),true]
  tilbageKnap.position(0+screenWidth,7*height/8+screenHeight)
  shopKnap.position((width-shopKnap.width)/2+screenWidth,height/3+1.5*settingKnap.height+screenHeight)
  spilKnap.position((width-spilKnap.width)/2+screenWidth,height/3+screenHeight)
  settingKnap.position((width-settingKnap.width)/2+screenWidth,height/3+3*settingKnap.height+screenHeight)
  nesteLevel.position(width/2+10+screenWidth,height/2+screenHeight)
  soundKnap[0].position((width-soundKnap[0].width)/2+screenWidth,height/2+screenHeight)
  soundKnap[0].mousePressed(Sounds)
  spilKnap.mousePressed(levelsShow)
  shopKnap.mousePressed(ShopShow)
  tilbageKnap.mousePressed(StartScreen)
  settingKnap.mousePressed(SettingShow)
  nesteLevel.mousePressed(NextLevel)
  tilbageKnap.hide()
  nesteLevel.hide()
  soundKnap[0].hide()
  shopTing = []
  ShopSetup(
    ["billeder/CowboyHat.webp","billeder/Cap.png","billeder/TopHat.webp","billeder/ChefHat.webp",
    "billeder/FlotHat.png","billeder/skibber.png","billeder/GreenHat.png","billeder/TrylleHat.webp"])
  LevelsKnapper()

}

