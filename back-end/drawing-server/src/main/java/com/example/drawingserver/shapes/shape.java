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

    /*implement method for entering position*/ 
    @Override
    public void setPostion( int x, int y){
        this.x=x;
        this.y=y;
    }

     /*implement method for entering dimnstion*/ 
    @Override
    public void setDimensions(int dimention1,int dimention2){
        this.dimension1=dimention1;
        this.dimension2=dimention2;
    }

  
    /*implement method for entering color*/ 
    @Override
    public  void setColor(String fill){
        this.fill=fill;
    }

      /*implement method for entering stroke color*/ 
    @Override
    public void setStrock(String stroke){
        this.stroke=stroke;
    }

       /*implement method for entering stroke width*/  
    @Override
    public void setstrockWidth(int strokeWidth){
        this.strokeWidth=strokeWidth;
    }

      /*implement method for getting position*/ 
    @Override
    public int[] getPostion(){
        int[] x={this.x,this.y};
        return x;
    }

    /*implement method for getting dimensions*/ 
    @Override
    public int[] getvalues(){
        int[] x={this.dimension1,this.dimension2};
        return x;
    }

     /*implement method for getting stroke color*/ 
    @Override
   public String getStrokeColor(){
        return this.stroke;
   }

   /*implement method for getting stroke width*/
   @Override
    public int getstrokeWidth(){
        return this.strokeWidth;
    }

    /*implement method for getting id */ 
    @Override
    public int getID(){
        return id;
    }

    /*implement method for getting  type*/ 
    @Override
    public String getType(){
        return type;
    }

    /*implement method for getting  color*/ 
    @Override
    public String getColor(){
        return this.fill;
    }

    /*implement method for making  copy of shape*/ 
    @Override
    public shapeInterface clone(int x,int y) throws CloneNotSupportedException {

        int min=1,max=1000000000;
        int rand=(int)Math.floor(Math.random()*(max-min+1)+min);

        shape a=new shape();

        a.type=this.type;
        a.id=rand;
        a.x=x;
        a.y=y;
    
        a.dimension1=this.dimension1;
        a.dimension2=this.dimension2;
        
        a.fill=this.fill;
        a.stroke=this.stroke;
        a.strokeWidth=this.strokeWidth;

        return a;
    }
    
    /* for copy the entrie shape copy*/
    public shapeInterface copy(){
        shape a=new shape();

        a.type=this.type;
        a.id=this.id;
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