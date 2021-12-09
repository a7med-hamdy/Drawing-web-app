package com.example.drawingserver.shapes;

public class shapeFactroy {
    public shapeInterface factorShape(String shape, int posX, int posY){
        
        int min=1,max=1000000000;
        int x=(int)Math.floor(Math.random()*(max-min+1)+min);
        
        if(shape.equalsIgnoreCase("Circle")){
            return new circle(x,posX,posY,70,"black","black",4);
        }

        if(shape.equalsIgnoreCase("line")){
            return new line(x,posX,posY,posX+100,posY+100,"black",4);
        }

        if(shape.equalsIgnoreCase("ellipse")){
            return new ellipse(x,posX,posY,70,80,"black","black",4);
        }

        if(shape.equalsIgnoreCase("square")){
            return new square(x,posX,posY,70,"black","black",4);
        }

        if(shape.equalsIgnoreCase("rectangle")){
            return new rectangle(x,posX,posY,70,80,"black","black",4);
        }

        if(shape.equalsIgnoreCase("triangle")){
            return new triangle(x,posX,posY,80,"black","black",4);
        }

        return null;

    }
    
}
