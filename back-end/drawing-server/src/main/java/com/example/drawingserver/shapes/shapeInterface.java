package com.example.drawingserver.shapes;

public interface shapeInterface {
    
    /*abstract method for entering position*/ 
    void setPostion( int x, int y);

    /*abstract method for entering dimnstion*/ 
    void setDimensions(int dimension1,int dimension2);

    /*abstract method for entering color*/ 
    void setColor(String fill);

    /*abstract method for getting color*/ 
    String getColor();

    /*abstract method for entering stroke color*/ 
    void setStrock(String stroke);

    /*abstract method for entering stroke width*/ 
    void setstrockWidth(int strokeWidth);
    
    /*abstract method for getting position*/ 
    int[] getPostion();

    /*abstract method for getting dimensions*/ 
    int[] getvalues(); 

    /*abstract method for getting stroke color*/ 
    String getStrokeColor();

    /*abstract method for getting stroke width*/ 
    int getstrokeWidth();

    /*abstract method for getting id */ 
    int getID();

    /*abstract method for getting  type*/ 
    String getType();

    /*abstract method for making  copy of shape*/ 
    shapeInterface clone(int x, int y) throws CloneNotSupportedException;
    
}
