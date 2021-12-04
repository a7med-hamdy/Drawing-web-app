package com.example.drawingserver.shapes;

class shape implements Cloneable,shapeInterface{
    protected int id;
    protected int x;
    protected int y;
    protected int dimension1;
    protected int dimension2;
    protected String fill;
    protected String stroke;
    protected int strokeWidth;

    public void setPostion( int x, int y){
        this.x=x;
        this.y=y;
    }

    public void setDimensions(int dimention1,int dimention2){
        this.dimension1=dimention1;
        this.dimension2=dimention2;
    }

    public void setDimensions(int dimention){
        this.dimension1=dimention;
        this.dimension2=dimention;
    }

    public  void setColor(String fill){
        this.fill=fill;
    }

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
        int[] x={this.dimension1,this.dimension2};
        return x;
    }

  
    public int getvalue() {
        return dimension2;
    }

   public String getStrokeColor(){
        return this.stroke;
   }

    public int strokeWidth(){
        return this.strokeWidth;
    }
    public int idgetter(){
        return id;
    }

    @Override
    protected Object clone() throws CloneNotSupportedException {
        return super.clone();
    }

    
}