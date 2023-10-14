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