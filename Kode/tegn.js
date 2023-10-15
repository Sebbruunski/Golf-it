
function TegnDraw(){
    noStroke()
    Grid(40)
    stroke(100)
    Tegn(ball)
    Tegn(bane[levelNummer].hul)
    Tegn(bane[levelNummer].obs)
    //tegn pil
    if(ball[0].d<1&hat[0]!=0){
        ball[0].hat.hide() 
    }
    if(ball[1].d<1&hat[0]!=0){
        ball[1].hat.hide() 
    } 
    if(skyd==false){
        if(ball[1].col.length>2||ball[0].col.length>2){
            strokeWeight(width/100)
            stroke(255,250,0)
            fill(255,250,0)
            if(ball[ref].d>1){
                endX=ball[ref].x+cos(ball[ref].dir)*width/8
                endY=ball[ref].y+sin(ball[ref].dir)*width/8
                line(ball[ref].x,ball[ref].y,endX,endY)
                triangle(endX,endY,endX-cos(ball[ref].dir+120)*width/40,endY-sin(ball[ref].dir+120)*width/40,endX-cos(ball[ref].dir-120)*width/40,endY-sin(ball[ref].dir-120)*width/40)
                strokeWeight(width/200)
            }
            if(ball[(ref+1)%2].d>1){
                endX=ball[(ref+1)%2].x+cos(ball[(ref+1)%2].dir)*width/8
                endY=ball[(ref+1)%2].y+sin(ball[(ref+1)%2].dir)*width/8
                line(ball[(ref+1)%2].x,ball[(ref+1)%2].y,endX,endY)
                triangle(endX,endY,endX-cos(ball[(ref+1)%2].dir+120)*width/40,endY-sin(ball[(ref+1)%2].dir+120)*width/40,endX-cos(ball[(ref+1)%2].dir-120)*width/40,endY-sin(ball[(ref+1)%2].dir-120)*width/40)
            } 
        }
    }
}

function Tegn(liste){
    for (let i = 0; i<liste.length;i++) {
        if (liste[i].col.length<2)
        {
            fill(liste[i].col[0])
        }
        else
        {
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
            strokeWeight(liste[i].t)
            stroke(liste[i].col)
            line(liste[i].xcent+cos(liste[i].angle)*liste[i].length, liste[i].ycent+sin(liste[i].angle)*liste[i].length, liste[i].xcent-cos(liste[i].angle)*liste[i].length, liste[i].ycent-sin(liste[i].angle)*liste[i].length)
            stroke(100)
            strokeWeight(1)
        }
    }
}

function Grid(Antal=10) {
    for (i = 0; i < Antal; i++) {
        for (k = 0; k < Antal; k++) {
            if ((k % 2 == 1) & (i % 2 == 1)) {
                fill(60, 120, 60);
            } 
            else if ((k % 2 == 0) & (i % 2 == 0)) 
            {
                fill(60, 120, 60);
            } 
            else 
            {
                fill(0,255,0);
            }
            rect((width/Antal) * i, (height/Antal) * k, 50, 50);
        }
    }
}
