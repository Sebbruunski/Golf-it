//kollisons funktion indeholder tre lister henholdsvis boldene, baneforhindringerne og hullern
function Kollison(Spiller,Bane,Hul){
  //da alle kollisoner forgår mellem boldene og et eller andet køres et for-loop med spiller længden
    for(let i = 0;i<Spiller.length;i++){
      //Hvis man kolidere med y kanten
      if(Spiller[i].x-Spiller[i].d/2<0||Spiller[i].x+Spiller[i].d/2>width){
        Spiller[i].dir =90*(PI/2)-Spiller[i].dir
        Spiller[i].x+=cos(Spiller[i].dir)*Spiller[i].speed
        Spiller[i].y+=sin(Spiller[i].dir)*Spiller[i].speed
      }
      //Hvis man kolidere med x kanten 
      if(Spiller[i].y-Spiller[i].d/2<0||Spiller[i].y+Spiller[i].d/2>height){
        Spiller[i].dir =Spiller[i].dir*(-1)
        Spiller[i].x+=cos(Spiller[i].dir)*Spiller[i].speed
        Spiller[i].y+=sin(Spiller[i].dir)*Spiller[i].speed
      }
      //løber igennem alle forhindinger
      for(let j = 0;j<Bane.length;j++){
        //hvis forhindingen er en cirkel
        if(Bane[j].form=="cir"){
          if(sqrt((Bane[j].x-Spiller[i].x)**2+(Bane[j].y-Spiller[i].y)**2)<Bane[j].d/2+Spiller[i].d/2){
            ang=atan2(Spiller[i].y-Bane[j].y,Spiller[i].x-Bane[j].x)
            inangle=PI/2+ang
            Spiller[i].dir=2*inangle-Spiller[i].dir
          }
        }
        //Hvis forhindingen er en rektangel
        if(Bane[j].form=="rect"){
          if (Spiller[i].x + Spiller[i].d/2 + cos(Spiller[i].dir)*Spiller[i].speed > Bane[j].x && 
            Spiller[i].x + cos(Spiller[i].dir)*Spiller[i].speed  < Bane[j].x + Bane[j].b && 
            Spiller[i].y + Spiller[i].d/2 > Bane[j].y && 
            Spiller[i].y < Bane[j].y + Bane[j].h) 
            {
            //hvis det er en brun forhindring
            if(Bane[j].col[0]==139){
             Spiller[i].dir =90*(PI/2)-Spiller[i].dir
            }
            //hvis det er en blå forhindring aka vand
            if(Bane[j].col[0]==30){
              Spiller[i].x=bane[levelNummer].ball[i].x
              Spiller[i].y=bane[levelNummer].ball[i].y
              Spiller[i].d=bane[levelNummer].ball[i].d
              Spiller[i].speed=0
              skud++
            }
          }
          if (Spiller[i].x + Spiller[i].d/2 > Bane[j].x && 
            Spiller[i].x < Bane[j].x + Bane[j].b && 
            Spiller[i].y + Spiller[i].d/2 + sin(Spiller[i].dir)*Spiller[i].speed > Bane[j].y && 
            Spiller[i].y + sin(Spiller[i].dir)*Spiller[i].speed < Bane[j].y + Bane[j].h) 
          {
            //hvis det er en brun forhindring
            if(Bane[j].col[0]==139){
              Spiller[i].dir =Spiller[i].dir*(-1)
            }
            //hvis faven er blå er det vand
            if(Bane[j].col[0]==30){
              Spiller[i].x=bane[levelNummer].ball[i].x
              Spiller[i].y=bane[levelNummer].ball[i].y
              Spiller[i].d=bane[levelNummer].ball[i].d
              Spiller[i].speed=0
              skud++
            }
          }

        }
        //hvis man har en linje kollision
        if(Bane[j].form=="line"){
          xproj = Spiller[i].x - cos(Bane[j].angle+PI/2)*(cos(Bane[j].angle+PI/2)*(Spiller[i].x-Bane[j].xcent) + sin(Bane[j].angle+PI/2)*(Spiller[i].y-Bane[j].ycent))
          yproj = Spiller[i].y - sin(Bane[j].angle+PI/2)*(cos(Bane[j].angle+PI/2)*(Spiller[i].x-Bane[j].xcent) + sin(Bane[j].angle+PI/2)*(Spiller[i].y-Bane[j].ycent))
          x1=Bane[j].xcent+cos(Bane[j].angle)*Bane[j].length
          y1=Bane[j].ycent+sin(Bane[j].angle)*Bane[j].length
          x2=Bane[j].xcent-cos(Bane[j].angle)*Bane[j].length
          y2=Bane[j].ycent-sin(Bane[j].angle)*Bane[j].length
          t=(cos(Bane[j].angle+PI/2)*(Spiller[i].x-Bane[j].xcent) + sin(Bane[j].angle+PI/2)*(Spiller[i].y-Bane[j].ycent))
          ang=0
          if(sqrt((xproj-x1)**2 + (yproj-y1)**2)<sqrt((xproj-x2)**2 + (yproj-y2)**2)){
            ang=atan2(Spiller[i].y-y1,Spiller[i].x-x1)
          } else {
            ang=atan2(Spiller[i].y-y2,Spiller[i].x-x2)
          }
          if(sqrt((xproj-Spiller[i].x)**2 + (yproj-Spiller[i].y)**2) <Spiller[i].d/2+Bane[j].t/2){
            if(sqrt((xproj-Bane[j].xcent)**2 + (yproj-Bane[j].ycent)**2) <Bane[j].length+Spiller[i].d/2+Bane[j].t/2){
              if(sqrt((xproj-Bane[j].xcent)**2 + (yproj-Bane[j].ycent)**2) >Bane[j].length){
                  if(sqrt((Spiller[i].x-x1)**2 + (Spiller[i].y-y1)**2)<Spiller[i].d/2+Bane[j].t/2 ||sqrt((Spiller[i].x-x2)**2 + (Spiller[i].y-y2)**2)< Spiller[i].d/2+Bane[j].t/2){
                    //kører, når du kolliderer med kanten (den runde)
                    inangle=PI/2+ang
                    Spiller[i].dir=2*inangle-Spiller[i].dir
                    xvel=cos(inangle -PI/2)*(sqrt((xproj-Bane[j].xcent)**2 + (yproj-Bane[j].ycent)**2))*Bane[j].angvel*1.1+cos(Spiller[i].dir)*Spiller[i].speed
                    yvel=sin(inangle -PI/2)*(sqrt((xproj-Bane[j].xcent)**2 + (yproj-Bane[j].ycent)**2))*Bane[j].angvel*1.1+sin(Spiller[i].dir)*Spiller[i].speed
                    Spiller[i].speed=sqrt(xvel**2+yvel**2)
                    Spiller[i].dir=atan2(yvel,xvel)
                  }
                }else{
                  //kører, når du kolliderer med midten
                  Spiller[i].dir=2*Bane[j].angle - Spiller[i].dir
                  if(sqrt((xproj-x1)**2 + (yproj-y1)**2)<sqrt((xproj-x2)**2 + (yproj-y2)**2)){
                    xvel=cos(Bane[j].angle +PI/2)*(sqrt((xproj-Bane[j].xcent)**2 + (yproj-Bane[j].ycent)**2))*Bane[j].angvel*1.1+cos(Spiller[i].dir)*Spiller[i].speed
                    yvel=sin(Bane[j].angle +PI/2)*(sqrt((xproj-Bane[j].xcent)**2 + (yproj-Bane[j].ycent)**2))*Bane[j].angvel*1.1+sin(Spiller[i].dir)*Spiller[i].speed
                  }else{
                    xvel=cos(Bane[j].angle -PI/2)*(sqrt((xproj-Bane[j].xcent)**2 + (yproj-Bane[j].ycent)**2))*Bane[j].angvel*1.1+cos(Spiller[i].dir)*Spiller[i].speed
                    yvel=sin(Bane[j].angle -PI/2)*(sqrt((xproj-Bane[j].xcent)**2 + (yproj-Bane[j].ycent)**2))*Bane[j].angvel*1.1+sin(Spiller[i].dir)*Spiller[i].speed
                  }
                  Spiller[i].speed=sqrt(xvel**2+yvel**2)
                  Spiller[i].dir=atan2(yvel,xvel)
                }
                Spiller[i].x+=cos(Spiller[i].dir)*Spiller[i].speed
                Spiller[i].y+=sin(Spiller[i].dir)*Spiller[i].speed
                
              }
            }
          }
          //hvis man kolliderer med en portal (bruger en collision, der minder meget om line collision)
          if(Bane[j].form=="portal"){
            xproj = Spiller[i].x - cos(Bane[j].angle+PI/2)*(cos(Bane[j].angle+PI/2)*(Spiller[i].x-Bane[j].xcent) + sin(Bane[j].angle+PI/2)*(Spiller[i].y-Bane[j].ycent))
            yproj = Spiller[i].y - sin(Bane[j].angle+PI/2)*(cos(Bane[j].angle+PI/2)*(Spiller[i].x-Bane[j].xcent) + sin(Bane[j].angle+PI/2)*(Spiller[i].y-Bane[j].ycent))
            t=(cos(Bane[j].angle+PI/2)*(Spiller[i].x-Bane[j].xcent) + sin(Bane[j].angle+PI/2)*(Spiller[i].y-Bane[j].ycent))
            d=sqrt((xproj-Bane[j].xcent)**2 + (yproj-Bane[j].ycent)**2)
            x1=Bane[j].xcent+cos(Bane[j].angle)*Bane[j].length
            y1=Bane[j].ycent+sin(Bane[j].angle)*Bane[j].length
            x2=Bane[j].xcent-cos(Bane[j].angle)*Bane[j].length
            y2=Bane[j].ycent-sin(Bane[j].angle)*Bane[j].length

            if(sqrt((xproj-Spiller[i].x)**2 + (yproj-Spiller[i].y)**2) <Spiller[i].d/2+Bane[j].t/2){
              if(d <Bane[j].length+Spiller[i].d/2+Bane[j].t/2){
                Spiller[i].dir=Spiller[i].dir-Bane[j].angle+Bane[Bane[j].link].angle
                if(sqrt((xproj-x1)**2 + (yproj-y1)**2)>sqrt((xproj-x2)**2 + (yproj-y2)**2)){
                  Spiller[i].x=Bane[Bane[j].link].xcent - d*cos(Bane[Bane[j].link].angle) - cos(Bane[Bane[j].link].angle+PI/2)*t*1.1
                  Spiller[i].y=Bane[Bane[j].link].ycent - d*sin(Bane[Bane[j].link].angle) - sin(Bane[Bane[j].link].angle+PI/2)*t*1.1
                }else{
                  Spiller[i].x=Bane[Bane[j].link].xcent + d*cos(Bane[Bane[j].link].angle) - cos(Bane[Bane[j].link].angle+PI/2)*t*1.1
                  Spiller[i].y=Bane[Bane[j].link].ycent + d*sin(Bane[Bane[j].link].angle) - sin(Bane[Bane[j].link].angle+PI/2)*t*1.1
                }
                return 1
              }
            }
          }
          //hvis man kolidere med en boster
          if(Bane[j].form=="booster"){
            if(Spiller[i].x-Spiller[i].d/2<Bane[j].x+Bane[j].b/2 && Spiller[i].x+Spiller[i].d/2>Bane[j].x-Bane[j].b/2){
              if(Spiller[i].y-Spiller[i].d/2<Bane[j].y+Bane[j].h/2 && Spiller[i].y+Spiller[i].d/2>Bane[j].y-Bane[j].b/2){
                velx=Spiller[i].speed*cos(Spiller[i].dir)+Bane[j].boost[0]
                vely=Spiller[i].speed*sin(Spiller[i].dir)+Bane[j].boost[1]
                Spiller[i].dir=atan2(vely,velx)
                Spiller[i].speed=sqrt(velx**2 +vely**2)
              }
            }
          }


        }
        //Hvis den rigtig bold kommer i det rigtige hul
        if(Hul[i].d/2+Spiller[i].d/2>sqrt((Spiller[i].x-Hul[i].x)**2+(Spiller[i].y-Hul[i].y)**2)){
          Spiller[i].d=0
          ref=(i+1)%2
          Spiller[ref].col=[255,250,0]
        }
      }
      //Hvis de to bold man skyder til rammer hinanden
      if(sqrt((Spiller[0].x-Spiller[1].x)**2+(Spiller[0].y-Spiller[1].y)**2)<(Spiller[0].d+Spiller[1].d)/2){
        xvel0=cos(Spiller[0].dir)*Spiller[0].speed
        yvel0=sin(Spiller[0].dir)*Spiller[0].speed
        xvel1=cos(Spiller[1].dir)*Spiller[1].speed
        yvel1=sin(Spiller[1].dir)*Spiller[1].speed
        
        dist=(Spiller[0].x-Spiller[1].x)**2+(Spiller[0].y-Spiller[1].y)**2
        change0=((xvel0-xvel1)*(Spiller[0].x-Spiller[1].x) +(yvel0-yvel1)*(Spiller[0].y-Spiller[1].y))/dist
        change1=((xvel1-xvel0)*(Spiller[1].x-Spiller[0].x) +(yvel1-yvel0)*(Spiller[1].y-Spiller[0].y))/dist
        
        xvel0-=change0*(Spiller[0].x-Spiller[1].x)
        yvel0-=change0*(Spiller[0].y-Spiller[1].y)
        xvel1-=change1*(Spiller[1].x-Spiller[0].x)
        yvel1-=change1*(Spiller[1].y-Spiller[0].y)

        Spiller[0].dir=atan2(yvel0,xvel0)
        Spiller[0].speed=sqrt(xvel0**2+yvel0**2)
        Spiller[1].dir=atan2(yvel1,xvel1)
        Spiller[1].speed=sqrt(xvel1**2+yvel1**2)

        Spiller[0].x+=cos(Spiller[0].dir)*Spiller[0].speed
        Spiller[0].y+=sin(Spiller[0].dir)*Spiller[0].speed
        Spiller[1].x+=cos(Spiller[1].dir)*Spiller[1].speed
        Spiller[1].y+=sin(Spiller[1].dir)*Spiller[1].speed
      }
    }