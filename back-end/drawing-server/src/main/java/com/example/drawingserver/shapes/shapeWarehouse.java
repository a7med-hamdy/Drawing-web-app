package com.example.drawingserver.shapes;
import java.util.Stack;
import java.util.ArrayList;
import java.util.EmptyStackException;

public class shapeWarehouse {
    private Stack<ArrayList<shapeInterface>> undo = new Stack<>();
    private Stack<ArrayList<shapeInterface>> redo = new Stack<>();
    private ArrayList<shapeInterface> shapes = new ArrayList<>();
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

    public void removeShape(int id)throws ArrayIndexOutOfBoundsException
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
        this.shapes.add(s);
        this.undo.push(this.shapes);
        this.redo.clear();
        return s;
    }

    public ArrayList<shapeInterface> undo() throws EmptyStackException{
        this.shapes = this.undo.pop();
        this.redo.push(this.shapes);
        return this.shapes;
    }

    public ArrayList<shapeInterface> redo() throws EmptyStackException{
        this.shapes = this.redo.pop();
        this.undo.push(this.shapes);
        return this.shapes;
    }

    public void changeColor(int id, String color)throws ArrayIndexOutOfBoundsException
    {
        int index = getShapeIndex(id);
        this.shapes.get(index).setColor(color);
        this.undo.push(this.shapes);
        this.redo.clear();
    }

    public void changeSize(int id, int x, int y)throws ArrayIndexOutOfBoundsException
    {
        int index = getShapeIndex(id);
        this.shapes.get(index).setDimensions(x, y);
        this.undo.push(this.shapes);
        this.redo.clear();
    }

    public void changeLocation(int id, int x, int y)throws ArrayIndexOutOfBoundsException
    {
        int index = getShapeIndex(id);
        this.shapes.get(index).setPostion(x, y);
        this.undo.push(this.shapes);
        this.redo.clear();
    }

    private int getShapeIndex(int id)
    {
        int i = -1;
        for (i = 0; i < this.shapes.size(); i++)
        {
            if(this.shapes.get(i).getID() == id)
            {
                break;
            }
        }
        return i;
    }
}
