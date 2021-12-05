package com.example.drawingserver.shapes;
import java.util.Stack;
import java.util.ArrayList;

public class shapeWarehouse {
    private Stack<ArrayList<shapeInterface>> undo;
    private Stack<ArrayList<shapeInterface>> redo;
    private ArrayList<shapeInterface> shapes;
    private static shapeWarehouse instance;
    private shapeWarehouse(){}

    public shapeWarehouse getInstanceOf(){
        if(instance == null)
        {
            instance = new shapeWarehouse(); 
        }
        return instance;
    }

    public void addShape(shapeInterface s)
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
    
    public shapeInterface copyShape(int id) throws CloneNotSupportedException
    {
        int index = getShapeIndex(id);
        shapeInterface s = this.shapes.get(index);
        shapeInterface temp = s.clone();
        return temp;
    }

    public ArrayList<shapeInterface> undo(){
        ArrayList<shapeInterface> temp = this.undo.pop();
        this.redo.push(temp);
        return temp;
    }

    public ArrayList<shapeInterface> redo(){
        ArrayList<shapeInterface> temp = this.redo.pop();
        this.undo.push(temp);
        return temp;
    }

    public void editAttribute(shapeInterface newObject, int id){
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
