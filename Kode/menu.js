//Indeholder alle de variable som indgår i menuen
shopTing = []
levelsKnapper = []
chekBokse = []
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
      shopTing[i].hide()
      chekBokse[i][1].hide()
    }
}
  
function ShopShow(){
    for(let i = 0;i<shopTing.length;i++){
      shopTing[i].show()
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
    shopTing.push(createImg(billedeListe[i]))
    shopTing[i].size(width/8,height/8) 
    shopTing[i].position((i%4+1)*width/5-shopTing[i].width/2,floor((i+4)/4)*height/5)
    shopTing[i].hide()
    chekBokse.push([false,createCheckbox("Valgt",false)])
    chekBokse[i][1].position((i%4+1)*width/5-30,floor((i+4)/4)*height/5+height/10)
    chekBokse[i][1].hide()
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
