package com.example.drawingserver.shapes;

public class shapeFactroy {
    public shape factorShape(String shape){

        if(shape.equalsIgnoreCase("Circle")){
            return new circle(100,100,70,"blue","black",4);
        }

        if(shape.equalsIgnoreCase("line")){
            return new line(100,100,200,200,"blue",4);
        }

        if(shape.equalsIgnoreCase("ellipse")){
            return new ellipse(100,100,70,80,"blue","black",4);
        }

        if(shape.equalsIgnoreCase("square")){
            return new square(100,100,70,"blue","black",4);
        }

        if(shape.equalsIgnoreCase("rectangle")){
            return new rectangle(100,100,70,80,"blue","black",4);
        }

        return null;

    }
    
}
