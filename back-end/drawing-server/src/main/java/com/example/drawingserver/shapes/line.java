package com.example.drawingserver.shapes;

public class line extends shape{
    
    line(int x ,int y,int endX,int endY,String stroke,int strokeWidth){
        this.x=x;
        this.y=y;
        this.val1=endX;
        this.val2=endY;
        this.stroke=stroke;
        this.fill=stroke;
        this.strokeWidth=strokeWidth;
    }

    @Override
    public void setColor(String fill) {
        this.stroke=fill;
        
    }

}
