package com.example.drawingserver.RequestsControllers;


import java.util.ArrayList;
import java.util.EmptyStackException;

import com.example.drawingserver.shapes.shapeFactroy;
import com.example.drawingserver.shapes.shapeInterface;
import com.example.drawingserver.shapes.shapeWarehouse;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin
@RequestMapping("/edit")
public class editRequestsController{

    private shapeFactroy factory;
    private shapeWarehouse warehouse;
    private ObjectMapper map;//an object that maps java objects to json

    public editRequestsController(){
        this.warehouse = shapeWarehouse.getInstanceOf();
        this.factory = new shapeFactroy();
        this.map = new ObjectMapper();
    }
    /**
     * handle create requests
     * @param shape
     * string of teh shape to be created
     * @param x
     * x position of the shape
     * @param y
     * y position of the shape
     * @return
     * the json represntation of the object
     * @throws JsonProcessingException
     */
    @PostMapping("/create:{shape}:{x},{y}")
    public String createShape(@PathVariable String shape, @PathVariable int x, @PathVariable int y) throws JsonProcessingException{
        shapeInterface s = this.factory.factorShape(shape,x,y);
        try {
            this.warehouse.addShape(s);
        } catch (CloneNotSupportedException e) {
            e.printStackTrace();
        }
        return map.writeValueAsString(s);
    }



    @GetMapping("/data")
    public String fetchData() throws JsonProcessingException{
        ArrayList<shapeInterface> list =  this.warehouse.getList();
        String json = jsonList(list);
        return json;
    }
    // changing the color of the shape
    @GetMapping("/{id}/color:{color}")
    public String setColor(@PathVariable int id, @PathVariable String color){
        System.out.println(id + "\t" + color);
        try{
            this.warehouse.changeColor(id, color);
        }
        catch(IndexOutOfBoundsException | CloneNotSupportedException e){
            System.out.println(id + "\tfail " + color);
            return "fail";
        }
        System.out.println(id + "\tsuccess " + color);
        return "success";
    }

    // resizing the shape
    @GetMapping("/{id}/resize:{v1},{v2}/pos:{x},{y}")
    public String resizeReq(@PathVariable int id, @PathVariable int v1, @PathVariable int v2 , @PathVariable int x, @PathVariable int y){
        try{
            this.warehouse.changeSize(id, v1, v2 , x ,y);
        }
        catch(IndexOutOfBoundsException | CloneNotSupportedException e){
            return "fail";
        }
        return "success";
    }

    // moving the shape
    @GetMapping("/{id}/move:{x},{y}")
    public String moveReq(@PathVariable int id, @PathVariable int x, @PathVariable int y){   
        try{
            this.warehouse.changeLocation(id, x, y);
        }
        catch(IndexOutOfBoundsException | CloneNotSupportedException e){
            return "fail";
        }
        return "success";
    }

    // copying the shape will create an object waiting to be pasted
    @PostMapping("/{id}/copy:{x},{y}")
    public String copyReq(@PathVariable int id, @PathVariable int x, @PathVariable int y) throws CloneNotSupportedException, JsonProcessingException{
        System.out.println(id + "\tcopy");
        shapeInterface s = this.warehouse.copyShape(id,x,y);
        
        return map.writeValueAsString(s);
    }

    // delete the shape from the shapes list
    @GetMapping("/{id}/delete")
    public String deleteReq(@PathVariable int id){   
        try{
            this.warehouse.removeShape(id);
        }
        catch(IndexOutOfBoundsException | CloneNotSupportedException e){
            return "fail";
        }
        return "success";
    }

    @PostMapping("/undo")
    public String undoReq() 
    {
        String json;
        ArrayList<shapeInterface> list;
        try{
            list =  this.warehouse.undo();
            json = jsonList(list);
        }
        catch(EmptyStackException | JsonProcessingException e){
            return "fail";
        }
        return json;
    }

    @PostMapping("/redo")
    public String redoReq()
    {
        String json;
        ArrayList<shapeInterface> list;
        try{
            list =  this.warehouse.redo();
            json = jsonList(list);
        }
        catch(EmptyStackException | JsonProcessingException e){
            return "fail";
        }
        return json;
    }

    private String jsonList(ArrayList<shapeInterface> list) throws JsonProcessingException
    {
        String json = "[";
        for(shapeInterface shape : list)
        {
            String s = map.writeValueAsString(shape);
            json = json + s + ", ";
        }
        try{
            json = json.substring(0, json.length()-2) + "]";
        }
        catch(StringIndexOutOfBoundsException e)
        {
            return "[]";
        }
        return json;
    }

}
