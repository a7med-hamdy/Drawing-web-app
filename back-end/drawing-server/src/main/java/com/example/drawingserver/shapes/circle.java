package com.example.drawingserver.shapes;

public class circle extends geoShape{

    circle(int x ,int y,int radius,String color,String stroke,int strokeWidth){
        this.x=x;
        this.y=y;
        this.val1=radius;
        this.val2=radius;
        this.fill=color;
        this.stroke=stroke;
        this.strokeWidth=strokeWidth;
    }
}
