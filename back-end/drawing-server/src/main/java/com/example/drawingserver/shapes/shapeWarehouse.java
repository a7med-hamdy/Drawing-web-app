package com.example.drawingserver.shapes;
import java.util.Stack;
import java.util.ArrayList;

public class shapeWarehouse {
    private Stack<ArrayList<shapeInterface>> undo = new Stack<ArrayList<shapeInterface>>();
    private Stack<ArrayList<shapeInterface>> redo = new Stack<ArrayList<shapeInterface>>();
    private ArrayList<shapeInterface> shapes = new ArrayList<shapeInterface>();
    private static shapeWarehouse instance;
    private shapeWarehouse(){}

    public static shapeWarehouse getInstanceOf(){
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
        this.redo.clear();
    }

    public void removeShape(int id)
    {
        int index = getShapeIndex(id);
        this.shapes.remove(index);
        this.undo.push(this.shapes);
        this.redo.clear();
    }
    
    public shapeInterface copyShape(int id) throws CloneNotSupportedException
    {
        int index = getShapeIndex(id);
        shapeInterface s = this.shapes.get(index).clone();
        this.undo.push(this.shapes);
        this.redo.clear();
        return s;
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

    public void changeColor(int id, String color)
    {
        int index = getShapeIndex(id);
        this.shapes.get(index).setColor(color);
        this.undo.push(this.shapes);
        this.redo.clear();
    }

    public void changeSize(int id, int x, int y)
    {
        int index = getShapeIndex(id);
        this.shapes.get(index).setDimensions(x, y);
        this.undo.push(this.shapes);
        this.redo.clear();
    }

    public void changeLocation(int id, int x, int y)
    {
        int index = getShapeIndex(id);
        this.shapes.get(index).setPostion(x, y);
        this.undo.push(this.shapes);
        this.redo.clear();
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
