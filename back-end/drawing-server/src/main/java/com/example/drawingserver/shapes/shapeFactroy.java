package com.example.drawingserver.shapes;

public class shapeFactroy {
    public shape factorShape(String shape){
        int min=1,max=1000000000;
        int x=(int)Math.floor(Math.random()*(max-min+1)+min);
        
        if(shape.equalsIgnoreCase("Circle")){
            return new circle(x,100,100,70,"blue","black",4);
        }

        if(shape.equalsIgnoreCase("line")){
            return new line(x,100,100,200,200,"blue",4);
        }

        if(shape.equalsIgnoreCase("ellipse")){
            return new ellipse(x,100,100,70,80,"blue","black",4);
        }

        if(shape.equalsIgnoreCase("square")){
            return new square(x,100,100,70,"blue","black",4);
        }

        if(shape.equalsIgnoreCase("rectangle")){
            return new rectangle(x,00,100,70,80,"blue","black",4);
        }

        if(shape.equalsIgnoreCase("triangle")){
            return new triangle(x,100,100,80,"blue","black",4);
        }

        return null;

    }
    
}
