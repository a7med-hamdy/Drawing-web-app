package com.example.drawingserver.shapes;

public interface shapeInterface {
    

    void setPostion( int x, int y);

    void setDimensions(int dimention1,int dimention2);

    void setDimensions(int dimention);

    void setColor(String fill);

    void setStrock(String stroke);

    void setstrockWidth(int strokeWidth);
    
    int[] getPostion();

    int[] getvalues(); 

    String getStrokeColor();

    int getstrokeWidth();

    int getID();

    String getType();

    shapeInterface clone() throws CloneNotSupportedException;
}
