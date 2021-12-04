package com.example.drawingserver.shapes;

public class ellipse extends geoShape{
    
    ellipse(int x ,int y,int radiusX,int radiusY,String color,String stroke,int strokeWidth){
        this.x=x;
        this.y=y;
        this.val1=radiusX;
        this.val2=radiusY;
        this.fill=color;
        this.stroke=stroke;
        this.strokeWidth=strokeWidth;
    }
}
