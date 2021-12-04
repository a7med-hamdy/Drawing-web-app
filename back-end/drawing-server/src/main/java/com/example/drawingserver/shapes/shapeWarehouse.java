package com.example.drawingserver.shapes;
import java.util.Stack;

public class shapeWarehouse {
    private Stack<shape> list;
    private Stack<shape> redo;
    private static shapeWarehouse instance;
    private shapeWarehouse(){}

    public shapeWarehouse getInstanceOf(){
        if(instance == null)
        {
            instance = new shapeWarehouse(); 
        }
        return instance;
    }

    public void Addshape(shape s)
    {
        this.list.push(s);
    }
    
    public shape[] undo(){
        shape temp = this.list.pop();
        this.redo.push(temp);
        return (shape[])this.list.toArray();
    }

    public shape[] redo(){
        shape temp = this.redo.pop();
        this.list.push(temp);
        return (shape[])this.list.toArray();
    }
}
