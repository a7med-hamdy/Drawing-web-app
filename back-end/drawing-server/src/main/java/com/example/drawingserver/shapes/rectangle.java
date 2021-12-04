package com.example.drawingserver.shapes;

public class rectangle extends geoShape{
    
    rectangle(int x ,int y,int width,int height,String color,String stroke,int strokeWidth){
        this.x=x;
        this.y=y;
        this.val1=width;
        this.val2=height;
        this.fill=color;
        this.stroke=stroke;
        this.strokeWidth=strokeWidth;
    }
}
