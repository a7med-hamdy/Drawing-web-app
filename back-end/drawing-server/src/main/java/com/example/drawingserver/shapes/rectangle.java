package com.example.drawingserver.shapes;

class rectangle extends shape{
    
    rectangle(int id,int x ,int y,int width,int height,String color,String stroke,int strokeWidth){
        this.id=id;
        this.x=x;
        this.y=y;
        this.dimension1=width;
        this.dimension2=height;
        this.fill=color;
        this.stroke=stroke;
        this.strokeWidth=strokeWidth;
    }
}
