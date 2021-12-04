package com.example.drawingserver.shapes;

class square extends shape{
    
    square(int id,int x ,int y,int length,String color,String stroke,int strokeWidth){
        this.id=id;
        this.x=x;
        this.y=y;
        this.dimension1=length;
        this.dimension2=length;
        this.fill=color;
        this.stroke=stroke;
        this.strokeWidth=strokeWidth;
    }
    
    

}
