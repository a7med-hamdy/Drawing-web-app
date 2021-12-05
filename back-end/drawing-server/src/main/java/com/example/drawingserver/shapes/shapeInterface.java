package com.example.drawingserver.shapes;

public interface shapeInterface {
    

    public void setPostion( int x, int y);

    public void setDimensions(int dimention1,int dimention2);

    public void setDimensions(int dimention);

    public  void setColor(String fill);

    public void setStrock(String stroke);

    public void setstrockWidth(int strokeWidth);
    
    public int[] getPostion();

    public int[] getvalues();
    
    public int getvalue();

    public String getStrokeColor();

    public int getstrokeWidth();

    public int idgetter();

    public String typegetter();
    
    public String[] toStrings();

}
