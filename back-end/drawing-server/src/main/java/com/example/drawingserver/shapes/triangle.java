package com.example.drawingserver.shapes;

class triangle extends shape{

    triangle(int id,int x ,int y,int radius,String color,String stroke,int strokeWidth){
        this.id=id;
        this.x=x;
        this.y=y;
        this.dimension1=3;
        this.dimension2=radius;
        this.fill=color;
        this.stroke=stroke;
        this.strokeWidth=strokeWidth;
    }
}
