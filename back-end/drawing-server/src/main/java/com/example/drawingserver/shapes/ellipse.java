package com.example.drawingserver.shapes;

class ellipse extends shape{
    
    ellipse(int id,int x ,int y,int radiusX,int radiusY,String color,String stroke,int strokeWidth){
        this.id=id;
        this.x=x;
        this.y=y;
        this.dimension1=radiusX;
        this.dimension2=radiusY;
        this.fill=color;
        this.stroke=stroke;
        this.strokeWidth=strokeWidth;
    }
}
