package com.example.drawingserver.shapes;

public abstract class shape implements Cloneable{
    int x;
    int y;
    int val1;
    int val2;
    String fill;
    String stroke;
    int strokeWidth;

    public void setPostion( int x, int y){
        this.x=x;
        this.y=y;
    }

    public void setDimensions(int val1,int val2){
        this.val1=val1;
        this.val2=val2;
    }

    public abstract void setColor(String fill);

    public void setStrock(String stroke){
        this.stroke=stroke;
    }

    public void setstrockWidth(int strokeWidth){
        this.strokeWidth=strokeWidth;
    }
    
    public int[] getPostion(){
        int[] x={this.x,this.y};
        return x;
    }

    public int[] getvalues(){
        int[] x={this.val1,this.val2};
        return x;
    }

   public String getStrokeColor(){
        return this.stroke;
   }

    public int strokeWidth(){
        return this.strokeWidth;
    }
    @Override
    protected Object clone() throws CloneNotSupportedException {
        return super.clone();
    }

    
}