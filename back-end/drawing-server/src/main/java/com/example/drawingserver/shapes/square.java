package com.example.drawingserver.shapes;

public class square extends geoShape{
    
    square(int x ,int y,int length,String color,String stroke,int strokeWidth){
        this.x=x;
        this.y=y;
        this.val1=length;
        this.val2=length;
        this.fill=color;
        this.stroke=stroke;
        this.strokeWidth=strokeWidth;
    }

}
