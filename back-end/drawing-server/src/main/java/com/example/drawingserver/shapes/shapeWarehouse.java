package com.example.drawingserver.shapes;
import java.util.Stack;

import java.util.ArrayList;
import java.util.EmptyStackException;

/**
 * the warehouse holds the shapes and performs the operations on them
 */
public class shapeWarehouse {
    //undo stack
    private Stack<ArrayList<shapeInterface>> undo = new Stack<>();
    //redo stack
    private Stack<ArrayList<shapeInterface>> redo = new Stack<>();

    //array of the shapes shown currently on the board
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

    /**
     * 
     * @return
     * array of shapes
     */
    public ArrayList<shapeInterface> getList(){
        return this.shapes;
    }

    /**
     * 
     * @param list
     * it takes an array of shapes and sets the current array with this array
     */
    public void setList(ArrayList<shapeInterface> list){
        this.undo.clear();
        this.redo.clear();
        this.shapes = list;
    }
    /**
     * 
     * @param s 
     * add a shape to the current array
     * @throws CloneNotSupportedException
     */
    public void addShape(shapeInterface s) throws CloneNotSupportedException
    {
        this.undo.push(cloneArrayList(this.shapes));
        this.redo.clear();
        this.shapes.add(s);
    }

    /**
     * 
     * @param id
     * remove the shape with this id from the current array
     * @throws ArrayIndexOutOfBoundsException
     * @throws CloneNotSupportedException
     */
    public void removeShape(int id)throws ArrayIndexOutOfBoundsException, CloneNotSupportedException
    {
        this.undo.push(cloneArrayList(this.shapes));
        this.redo.clear();
        int index = getShapeIndex(id);
        this.shapes.remove(index);
    }
    
    /**
     * 
     * @param id
     * id of the shape to be copied
     * @param x
     * x position of the copied shape
     * @param y
     * y position of the copied shape
     * @return
     * @throws CloneNotSupportedException
     */
    public shapeInterface copyShape(int id ,int x,int y) throws CloneNotSupportedException
    {
        this.undo.push(cloneArrayList(this.shapes));
        this.redo.clear();
        int index = getShapeIndex(id);
        shapeInterface s = this.shapes.get(index).clone( x , y);
        this.shapes.add(s);
        return s;
    }
    /**
     * preform the undo operation: push the current array to redo stack and
     * pop the first array from the undo stack and make it the current array
     * @return
     * the array of shapes after performing the undo
     * @throws EmptyStackException
     */
    public ArrayList<shapeInterface> undo() throws EmptyStackException{
        ArrayList<shapeInterface> temp = this.shapes;
        this.shapes = this.undo.pop();
        this.redo.push(temp);
        return this.shapes;
    }

    /**
     * preform the redo operation: push the current array to undo stack and
     * pop the first array from the redo stack and make it the current array
     * @return
     * @throws EmptyStackException
     */
    public ArrayList<shapeInterface> redo() throws EmptyStackException{
        ArrayList<shapeInterface> temp = this.shapes;
        this.shapes = this.redo.pop();
        this.undo.push(temp);
        return this.shapes;
    }

    /**
     * 
     * @param id
     * the id of the shape that will be changes
     * @param color
     * the new color of the shape
     * @throws ArrayIndexOutOfBoundsException
     * @throws CloneNotSupportedException
     */
    public void changeColor(int id, String color)throws ArrayIndexOutOfBoundsException, CloneNotSupportedException
    {
        this.undo.push(cloneArrayList(this.shapes));
        this.redo.clear();
        int index = getShapeIndex(id);
        this.shapes.get(index).setColor(color);
    }

    /**
     * 
     * @param id
     * the id of the shape to be modified
     * @param x
     * the new first dimension
     * @param y
     * the new second dimension
     * @param pos1
     * the new x position
     * @param pos2
     * the new y position
     * @throws ArrayIndexOutOfBoundsException
     * @throws CloneNotSupportedException
     */
    public void changeSize(int id, int x, int y ,int pos1 , int pos2)throws ArrayIndexOutOfBoundsException, CloneNotSupportedException
    {   
        
        this.undo.push(cloneArrayList(this.shapes));
        this.redo.clear();
        int index = getShapeIndex(id);
        this.shapes.get(index).setDimensions(x, y);
        this.shapes.get(index).setPostion(pos1, pos2);
        
    }

    /**
     * 
     * @param id
     * the id of the shape to be modified
     * @param x
     * the new x position
     * @param y
     * the new y position
     * @throws ArrayIndexOutOfBoundsException
     * @throws CloneNotSupportedException
     */
    public void changeLocation(int id, int x, int y)throws ArrayIndexOutOfBoundsException, CloneNotSupportedException
    {
        this.undo.push(cloneArrayList(this.shapes));
        this.redo.clear();
        int index = getShapeIndex(id);
        this.shapes.get(index).setPostion(x, y);
    }

    /**
     * helper function to find the index of teh trageted shape
     * @param id
     * the id of the targeted shape
     * @return
     * the index of the targeted shape
     */
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

    /**
     * a helper functon to copy the arrays when perfoming undo or redo
     * @param list
     * the list to be copied
     * @return
     * the clopied list
     * @throws CloneNotSupportedException
     */
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
