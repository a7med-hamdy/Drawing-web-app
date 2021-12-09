package com.example.drawingserver.RequestsControllers;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.StringWriter;


import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import java.util.ArrayList;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.TransformerFactoryConfigurationError;
import javax.xml.transform.stream.StreamResult;
import org.springframework.xml.transform.StringSource;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.XML;

import com.example.drawingserver.shapes.DeserializationAdapter;
import com.example.drawingserver.shapes.shapeInterface;
import com.example.drawingserver.shapes.shapeWarehouse;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import org.springframework.core.io.InputStreamResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin
@RequestMapping("/file")
public class fileRequestsController {

    private Gson gson;
    private shapeWarehouse warehouse;
    public fileRequestsController(){
        this.warehouse = shapeWarehouse.getInstanceOf();
        this.gson = new Gson();
    }
    @GetMapping("/save/{type}")
    @ResponseBody
    public ResponseEntity<Object> saveReq(@PathVariable String type) throws TransformerFactoryConfigurationError, TransformerException, IOException{
        
        StringWriter stringWriter = new StringWriter();
        StreamResult streamResult = new StreamResult(stringWriter);
        String string = "";
        String filename = "saved drawing" + Math.random()*20000;
        String mediatype = "";
        String element = this.gson.toJson(this.warehouse.getList(),new TypeToken<ArrayList<shapeInterface>>() {}.getType()); 
        JSONArray list = new JSONArray(element);
        if(type.equalsIgnoreCase("json"))
        {
            string = list.toString();
            filename = filename + ".json";
            mediatype = "application/json";
        }
        else
        {
            JSONObject json = new JSONObject("{shape:"+list + "}");
            string = XML.toString(json);
            string = "<shapes>" + string + " "+"</shapes>";
            Transformer transformer = TransformerFactory.newInstance().newTransformer();
            transformer.setOutputProperty(OutputKeys.INDENT, "yes");
            transformer.setOutputProperty(OutputKeys.METHOD, "xml");
            transformer.setOutputProperty(OutputKeys.DOCTYPE_SYSTEM, "");
            transformer.setOutputProperty(OutputKeys.ENCODING, "iso-8859-1");
            transformer.setOutputProperty("{http://xml.apache.org/xslt}indent-amount", "4");
            transformer.transform(new StringSource(string), streamResult);
            string = stringWriter.toString();
            filename = filename + ".xml";
            mediatype = "application/xml";
        }  
        File file = new File(filename);
        FileWriter myWriter = new FileWriter(filename);
        myWriter.write(string);
        myWriter.close();
        
        InputStreamResource resource = new InputStreamResource(new FileInputStream(file));
        return ResponseEntity.ok()
                // Content-Disposition
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=" + file.getName())
                // Content-Type
                .contentType(MediaType.parseMediaType(mediatype))
                // Contet-Length
                .contentLength(file.length()) 
                .body(resource);
    }
    
    @PostMapping("/load/{zeft}")
    public String loadReq(@PathVariable String zeft) throws IOException{
        /*String content = new String(file.getBytes());*/
        String jsonString = zeft;
       /* if(file.getContentType().equalsIgnoreCase("application/xml"))
        {
            try {  
                JSONObject json = XML.toJSONObject(content);   
                jsonString = json.toString(2);
                jsonString = jsonString.substring(21, jsonString.length()-2);
                content = jsonString;
            }catch (JSONException | StringIndexOutOfBoundsException e) {
                content = "[]";
                
            }
        } 
        updateList(content);*/
        return jsonString;
    }

    private void updateList(String content){
        GsonBuilder builder = new GsonBuilder(); 
        builder.registerTypeAdapter(shapeInterface.class, new DeserializationAdapter());  
        Gson g = builder.create();
        shapeInterface [] shapes = g.fromJson(content, shapeInterface[].class);
        ArrayList<shapeInterface> list = new ArrayList<>();
        for(shapeInterface s:shapes)
        {
            list.add(s);
        }
        this.warehouse.setList(list);
    }
}
