package com.example.drawingserver.shapes;

class triangle extends shape{
    

    triangle(int id,int x ,int y,int radius,String color,String stroke,int strokeWidth){
        this.type="triangle";
        this.id=id;
        this.x=x;
        this.y=y;
        this.dimension1=radius;
        this.dimension2=radius;
        this.fill=color;
        this.stroke=stroke;
        this.strokeWidth=strokeWidth;
    }
    
   
}
