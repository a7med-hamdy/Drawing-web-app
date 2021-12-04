package com.example.drawingserver.shapes;

class line extends shape{
    
    line(int id,int x ,int y,int endX,int endY,String stroke,int strokeWidth){
        this.id=id;
        this.x=x;
        this.y=y;
        this.dimension1=endX;
        this.dimension2=endY;
        this.stroke=stroke;
        this.fill=stroke;
        this.strokeWidth=strokeWidth;
    }

    @Override
    public void setColor(String fill) {
        this.stroke=fill;
        
    }

}
