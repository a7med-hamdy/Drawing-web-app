package com.example.drawingserver.shapes;



class shape implements Cloneable,shapeInterface{
    
    protected String type;
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
   public String getStrokeColor(){
        return this.stroke;
   }

    public int getstrokeWidth(){
        return this.strokeWidth;
    }

    public int getID(){
        return id;
    }

    public String getType(){
        return type;
    }

    public String getColor(){
        return this.fill;
    }

    @Override
    public shapeInterface clone() throws CloneNotSupportedException {

        int min=1,max=1000000000;
        int rand=(int)Math.floor(Math.random()*(max-min+1)+min);

        shape a=new shape();

        a.type=this.type;
        a.id=rand;
        a.x=this.x;
        a.y=this.y;
        a.dimension1=this.dimension1;
        a.dimension2=this.dimension2;
        a.fill=this.fill;
        a.stroke=this.stroke;
        a.strokeWidth=this.strokeWidth;

        return a;
    }
}