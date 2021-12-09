package com.example.drawingserver.shapes;

public interface shapeInterface {
    

    void setPostion( int x, int y);

    void setDimensions(int dimension1,int dimension2);

    void setDimensions(int dimension);

    void setColor(String fill);

    String getColor();

    void setStrock(String stroke);

    void setstrockWidth(int strokeWidth);
    
    int[] getPostion();

    int[] getvalues(); 

    String getStrokeColor();

    int getstrokeWidth();

    int getID();

    String getType();

    shapeInterface clone(int x, int y) throws CloneNotSupportedException;
    
}
