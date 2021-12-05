package com.example.drawingserver.RequestsControllers;


import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/file")
public class fileRequestsController {

    @PostMapping("/save")
    public void saveReq(@RequestBody Object board){
        
        System.out.println("saved");
    }
    
    @GetMapping("/load")
    public Object loadReq(){

        System.out.println("loaded");
        return "file";
    }
}
