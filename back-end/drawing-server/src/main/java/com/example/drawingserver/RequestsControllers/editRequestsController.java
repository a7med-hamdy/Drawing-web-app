package com.example.drawingserver.RequestsControllers;


import com.example.drawingserver.shapes.shapeFactroy;
import com.example.drawingserver.shapes.shapeInterface;
import com.example.drawingserver.shapes.shapeWarehouse;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin
@RequestMapping("/edit")
public class editRequestsController{

    shapeFactroy factory;
    shapeWarehouse warehouse;

    public editRequestsController(){
        this.warehouse = shapeWarehouse.getInstanceOf();
        this.factory = new shapeFactroy();
    }
    // clicking on a shape from the provided shapes to create it
    // (waiting for clicking on the board to insert the object)
    @PostMapping("/create:{shape}")
    public String[] createShape(@PathVariable String shape){
        shapeInterface s = this.factory.factorShape(shape);
        this.warehouse.addShape(s);
        System.out.println(s.toString());
        return s.toStrings();
    }


    // (clicking on the board to show the shape selected || paste the copied shape)
    // & insert it to the shapes object
    @PostMapping(value = {"/draw:{shape}", "/paste:{shape}"})
    public String addDrawing(@PathVariable String shape){
        
        return shape + " drawn";
    }

    // changing the color of the shape
    @PostMapping("/{id}/color:{color}")
    public String setColor(@PathVariable int id, @PathVariable String color){
        this.warehouse.changeColor(id, color);
        return "success";
    }

    // resizing the shape
    @PostMapping("/{id}/resize:{v1},{v2}")
    public String resizeReq(@PathVariable int id, @PathVariable int v1, @PathVariable int v2){
        this.warehouse.changeSize(id, v1, v2);;
        return "success";
    }

    // moving the shape
    @PostMapping("/{id}/move:{x},{y}")
    public String moveReq(@PathVariable int id, @PathVariable int x, @PathVariable int y){
        this.warehouse.changeLocation(id, x, y);;
        return "success";
    }

    // copying the shape will create an object waiting to be pasted
    @PostMapping("/{id}/copy")
    public String[] copyReq(@PathVariable int id) throws CloneNotSupportedException{
        shapeInterface s = this.warehouse.copyShape(id);
        return s.toStrings();
    }

    // delete the shape from the shapes list
    @PostMapping("/{id}/delete")
    public String deleteReq(@PathVariable int id){
        this.warehouse.removeShape(id);
        return "success";
    }

}
