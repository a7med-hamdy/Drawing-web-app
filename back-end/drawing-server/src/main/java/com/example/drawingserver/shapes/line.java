package com.example.drawingserver.shapes;

class line extends shape{
    
    line(int id,int x ,int y,int endX,int endY,String stroke,int strokeWidth){
        this.type="line";
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
        this.fill=fill;
        
    }
    @Override
    public shapeInterface clone(int x,int y) throws CloneNotSupportedException {

        int min=1,max=1000000000;
        int rand=(int)Math.floor(Math.random()*(max-min+1)+min);

        line a=new line(rand, x, y, x+(this.x-this.dimension1), y+(this.y-this.dimension2), this.fill, this.strokeWidth);
        
        return a;
    }

    @Override
    public shapeInterface copy(){
        
        line a=new line( this.id,
        this.x,
        this.y,
        this.dimension1,
        this.dimension2,
        this.fill,
        this.strokeWidth);
        
        return a;
    }

}
