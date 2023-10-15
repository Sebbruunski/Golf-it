//Indeholder alle de variable som indgår i menuen
shopTing = []
levelsKnapper = []
chekBokse = []
let hat = [0,0];
let spilKnap;
let shopKnap;
let settingKnap;
let tilbageKnap;

function LevelsKnapper(){
    for(let i =0; i<bane.length;i++){
      levelsKnapper.push(createButton(i+1))
      levelsKnapper[i].position((i%4+1)*width/5-levelsKnapper[i].width/2,floor((i+4)/4)*height/5)
      levelsKnapper[i].mousePressed(Level)
      levelsKnapper[i].hide()
    }
}

function SettingShow(){
    tilbageKnap.show()
    spilKnap.hide()
    settingKnap.hide()
    shopKnap.hide()
}
  

function StartScreen(){
    tilbageKnap.hide()
    spilKnap.show()
    settingKnap.show()
    shopKnap.show()
    for(let i =0; i<levelsKnapper.length;i++){
      levelsKnapper[i].hide()
    }
    for(let i =0; i<shopTing.length;i++){
      shopTing[i][1].hide()
      chekBokse[i][1].hide()
    }
}
  
function ShopShow(){
    for(let i = 0;i<shopTing.length;i++){
      shopTing[i][1].show()
      chekBokse[i][1].show()
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
    shopTing[i][1].position((i%4+1)*width/5-shopTing[i][1].width/2,floor((i+4)/4)*height/5)
    shopTing[i][1].hide()
    chekBokse.push([false,createCheckbox("Valgt",false)])
    chekBokse[i][1].position((i%4+1)*width/5-30,floor((i+4)/4)*height/5+height/10)
    chekBokse[i][1].changed(TjekBoks)
    chekBokse[i][1].hide()
  }
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

function MenuSetup(){
  tilbageKnap = createButton("Tilbage")
  shopKnap = createButton("Shop")
  spilKnap = createButton("Spil")
  settingKnap = createButton("Indstilling")
  tilbageKnap.position(0,7*height/8)
  shopKnap.position((width-shopKnap.width)/2,height/3+1.5*settingKnap.height)
  spilKnap.position((width-spilKnap.width)/2,height/3)
  settingKnap.position((width-settingKnap.width)/2,height/3+3*settingKnap.height)
  spilKnap.mousePressed(levelsShow)
  shopKnap.mousePressed(ShopShow)
  tilbageKnap.mousePressed(StartScreen)
  settingKnap.mousePressed(SettingShow)
  tilbageKnap.hide()
  shopTing = []
  ShopSetup(["billeder/CowboyHat.webp","billeder/Cap.png"])
  LevelsKnapper()
}

