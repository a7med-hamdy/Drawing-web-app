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

    public ArrayList<shapeInterface> getList(){
        return this.shapes;
    }

    public void setList(ArrayList<shapeInterface> list){
        this.undo.clear();
        this.redo.clear();
        this.shapes = list;
    }
    public void addShape(shapeInterface s) throws CloneNotSupportedException
    {
        this.undo.push(cloneArrayList(this.shapes));
        this.redo.clear();
        this.shapes.add(s);
    }

    public void removeShape(int id)throws ArrayIndexOutOfBoundsException, CloneNotSupportedException
    {
        this.undo.push(cloneArrayList(this.shapes));
        this.redo.clear();
        int index = getShapeIndex(id);
        this.shapes.remove(index);
    }
    
    public shapeInterface copyShape(int id ,int x,int y) throws CloneNotSupportedException
    {
        this.undo.push(cloneArrayList(this.shapes));
        this.redo.clear();
        int index = getShapeIndex(id);
        shapeInterface s = this.shapes.get(index).clone( x , y);
        this.shapes.add(s);
        return s;
    }

    public ArrayList<shapeInterface> undo() throws EmptyStackException{
        ArrayList<shapeInterface> temp = this.shapes;
        this.shapes = this.undo.pop();
        this.redo.push(temp);
        return this.shapes;
    }

    public ArrayList<shapeInterface> redo() throws EmptyStackException{
        ArrayList<shapeInterface> temp = this.shapes;
        this.shapes = this.redo.pop();
        this.undo.push(temp);
        return this.shapes;
    }

    public void changeColor(int id, String color)throws ArrayIndexOutOfBoundsException, CloneNotSupportedException
    {
        this.undo.push(cloneArrayList(this.shapes));
        this.redo.clear();
        int index = getShapeIndex(id);
        this.shapes.get(index).setColor(color);
    }

    public void changeSize(int id, int x, int y ,int pos1 , int pos2)throws ArrayIndexOutOfBoundsException, CloneNotSupportedException
    {   
        
        this.undo.push(cloneArrayList(this.shapes));
        this.redo.clear();
        int index = getShapeIndex(id);
        this.shapes.get(index).setDimensions(x, y);
        this.shapes.get(index).setPostion(pos1, pos2);
        
    }

    public void changeLocation(int id, int x, int y)throws ArrayIndexOutOfBoundsException, CloneNotSupportedException
    {
        this.undo.push(cloneArrayList(this.shapes));
        this.redo.clear();
        int index = getShapeIndex(id);
        this.shapes.get(index).setPostion(x, y);
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

    private ArrayList<shapeInterface> cloneArrayList(ArrayList<shapeInterface> list) throws CloneNotSupportedException
    {
        ArrayList<shapeInterface> temp = new ArrayList<>();
        for(shapeInterface s : list)
        {
            shape x = (shape) s; 
            temp.add(x.copy());
        }
        return temp;
    }
}
