
function TegnDraw(){
    noStroke()
    Grid(40)
    stroke(100)
    Tegn(ball)
    Tegn(hul)
    Tegn(bane[levelNummer])
    //tegn pil
    if(skyd==false){
        if(ball[1].col.length>2||ball[0].col.length>2){
            strokeWeight(width/100)
            stroke(255,150,50)
             fill(255,150,50)
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
        if(liste[i].form =="cir")
        {
            circle(liste[i].x,liste[i].y,liste[i].d)
        }
        if(liste[i].form =="rect"){
            rect(liste[i].x,liste[i].y,liste[i].b,liste[i].h)
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
