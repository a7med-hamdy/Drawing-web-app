package com.example.drawingserver.RequestsControllers;


import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin
@RequestMapping("/edit")
public class editRequestsController{


    // clicking on a shape from the provided shapes to create it
    // (waiting for clicking on the board to insert the object)
    @PostMapping("/create:{shape}")
    public String createShape(@PathVariable String shape){

        return shape + " created";
    }


    // (clicking on the board to show the shape selected || paste the copied shape)
    // & insert it to the shapes object
    @PostMapping(value = {"/draw:{shape}", "/paste:{shape}"})
    public String addDrawing(@PathVariable String shape){
        
        return shape + " drawn";
    }

    // changing the color of the shape
    @PostMapping("/{id}/color:{color}")
    public String setColor(@RequestBody Object targetShape, @PathVariable int id, @PathVariable String color){
        
        return "change shape #" + id + " color to " + color;
    }

    // resizing the shape
    @PostMapping("/{id}/resize:{v1},{v2}")
    public String resizeReq(@RequestBody Object targetShape, @PathVariable int id, @PathVariable int v1, @PathVariable int v2){

        return "resize shape #" + id + " to " + v1 + "*" + v2;
    }

    // moving the shape
    @PostMapping("/{id}/move:{x},{y}")
    public String moveReq(@RequestBody Object targetShape, @PathVariable int id, @PathVariable int x, @PathVariable int y){
        
        return "move shape #" + id + " to (" + x + ", " + y + ")";
    }

    // copying the shape will create an object waiting to be pasted
    @PostMapping("/{id}/copy")
    public String copyReq(@RequestBody Object targetShape, @PathVariable int id){
        
        return "shape #" + id + " copied";
    }

    // delete the shape from the shapes list
    @PostMapping("/{id}/delete")
    public String deleteReq(@PathVariable int id){

        return "shape #" + id + " deleted";
    }

}
