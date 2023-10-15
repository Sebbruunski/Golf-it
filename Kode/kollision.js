function Kollison(Spiller,bane,Hul){
    for(let i = 0;i<Spiller.length;i++){
      if(Spiller[i].x-Spiller[i].d/2<0||Spiller[i].x+Spiller[i].d/2>width){
        Spiller[i].dir =90*(PI/2)-Spiller[i].dir
      }
      if(Spiller[i].y-Spiller[i].d/2<0||Spiller[i].y+Spiller[i].d/2>height){
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
        if(bane[j].form=="line"){
          xproj = Spiller[i].x - cos(bane[j].angle+PI/2)*(cos(bane[j].angle+PI/2)*(Spiller[i].x-bane[j].xcent) + sin(bane[j].angle+PI/2)*(Spiller[i].y-bane[j].ycent))
          yproj = Spiller[i].y - sin(bane[j].angle+PI/2)*(cos(bane[j].angle+PI/2)*(Spiller[i].x-bane[j].xcent) + sin(bane[j].angle+PI/2)*(Spiller[i].y-bane[j].ycent))
          x1=bane[j].xcent+cos(bane[j].angle)*bane[j].length
          y1=bane[j].ycent+sin(bane[j].angle)*bane[j].length
          x2=bane[j].xcent-cos(bane[j].angle)*bane[j].length
          y2=bane[j].ycent-sin(bane[j].angle)*bane[j].length
          ang=0
          if(abs(Spiller[i].y-y1)<abs(Spiller[i].y-y2)){
            ang=atan2(Spiller[i].y-y1,Spiller[i].x-x1)
          } else {
            ang=atan2(Spiller[i].y-y2,Spiller[i].x-x2)
          }
          if(sqrt((xproj-Spiller[i].x)**2 + (yproj-Spiller[i].y)**2) <Spiller[i].d/2+bane[j].t/2){
            if(sqrt((xproj-bane[j].xcent)**2 + (yproj-bane[j].ycent)**2) <bane[j].length+Spiller[i].d/2+bane[j].t/2){
                if(sqrt((xproj-bane[j].xcent)**2 + (yproj-bane[j].ycent)**2) >bane[j].length){
                  if(sqrt((Spiller[i].x-x1)**2 + (Spiller[i].y-y1)**2)<Spiller[i].d/2+bane[j].t/2 ||sqrt((Spiller[i].x-x2)**2 + (Spiller[i].y-y2)**2)< Spiller[i].d/2+bane[j].t/2){
                  console.log("dav")
                  inangle=PI/2+ang
                  Spiller[i].dir=2*inangle - Spiller[i].dir
                  }
                }else{
                  Spiller[i].dir=2*bane[j].angle - Spiller[i].dir
                }
                Spiller[i].x+=cos(Spiller[i].dir)
                Spiller[i].y+=sin(Spiller[i].dir)
              }
            }
          }
          if(bane[j].form=="cir"){
            
          }
        }
        if(Hul[i].d/2+Spiller[i].d/2>sqrt((Spiller[i].x-Hul[i].x)**2+(Spiller[i].y-Hul[i].y)**2)){
          Spiller[i].d=0
          ref=(i+1)%2
          Spiller[ref].col=[255,250,0]
        }
      }
    }