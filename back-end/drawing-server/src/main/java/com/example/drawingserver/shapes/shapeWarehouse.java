package com.example.drawingserver.shapes;
import java.util.Stack;
import java.util.ArrayList;

public class shapeWarehouse {
    private Stack<ArrayList<shape>> undo;
    private Stack<ArrayList<shape>> redo;
    private ArrayList<shape> shapes;
    private static shapeWarehouse instance;
    private shapeWarehouse(){}

    public shapeWarehouse getInstanceOf(){
        if(instance == null)
        {
            instance = new shapeWarehouse(); 
        }
        return instance;
    }

    public void addShape(shape s)
    {
        this.shapes.add(s);
        this.undo.push(this.shapes);
    }

    public void removeShape(int id)
    {
        int index = getShapeIndex(id);
        this.shapes.remove(index);
        this.undo.push(this.shapes);
    }
    
    public void copyShape(int id)
    {
        /**
         * to be implemetnted after fixing the cloning
         */
    }

    public ArrayList<shape> undo(){
        ArrayList<shape> temp = this.undo.pop();
        this.redo.push(temp);
        return temp;
    }

    public ArrayList<shape> redo(){
        ArrayList<shape> temp = this.redo.pop();
        this.undo.push(temp);
        return temp;
    }

    public void editAttribute(shape newObject, int id){
        int index = getShapeIndex(id);
        this.shapes.remove(index);
        this.shapes.add(newObject);
        this.undo.push(this.shapes);
    }

    private int getShapeIndex(int id)
    {
        int i;
        for (i = 0; i < this.shapes.size(); i++)
        {
            if(this.shapes.get(i).idgetter() == id)
            {
                break;
            }
        }
        return i;
    }
}
