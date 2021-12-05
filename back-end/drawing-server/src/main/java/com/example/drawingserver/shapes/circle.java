package com.example.drawingserver.shapes;

class circle extends shape{

    circle(int id,int x ,int y,int radius,String color,String stroke,int strokeWidth){
        this.type="circle";
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
