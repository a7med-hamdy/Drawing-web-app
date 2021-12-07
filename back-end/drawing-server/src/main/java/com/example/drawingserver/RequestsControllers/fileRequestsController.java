package com.example.drawingserver.RequestsControllers;



import java.io.StringWriter;
import java.util.ArrayList;

import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.TransformerFactoryConfigurationError;
import javax.xml.transform.stream.StreamResult;
import org.springframework.xml.transform.StringSource;
import org.json.JSONArray;
import org.json.JSONObject;
import org.json.XML;
import com.example.drawingserver.shapes.shapeInterface;
import com.example.drawingserver.shapes.shapeWarehouse;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

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

    private Gson gson;
    private shapeWarehouse warehouse;
    public fileRequestsController(){
        this.warehouse = shapeWarehouse.getInstanceOf();
        this.gson = new Gson();
    }
    @PostMapping("/save")
    public String saveReq(@RequestBody String type) throws TransformerFactoryConfigurationError, TransformerException{
        
        String xmlString = "";
        String element = gson.toJson(this.warehouse.getList(),new TypeToken<ArrayList<shapeInterface>>() {}.getType()); 
        JSONArray list = new JSONArray(element);
        JSONObject json = new JSONObject("{shape:"+list + "}");
        xmlString = XML.toString(json);
        xmlString = "<shapes>" + xmlString + " "+"</shapes>";

        Transformer transformer = TransformerFactory.newInstance().newTransformer();
        transformer.setOutputProperty(OutputKeys.INDENT, "yes");
        transformer.setOutputProperty(OutputKeys.METHOD, "xml");
        transformer.setOutputProperty(OutputKeys.DOCTYPE_SYSTEM, "");
        transformer.setOutputProperty(OutputKeys.ENCODING, "iso-8859-1");
        transformer.setOutputProperty("{http://xml.apache.org/xslt}indent-amount", "4");

        StringWriter stringWriter = new StringWriter();
        StreamResult streamResult = new StreamResult(stringWriter);
 
        transformer.transform(new StringSource(xmlString), streamResult);
        xmlString = stringWriter.toString();
        return xmlString;
    }
    
    @GetMapping("/load")
    public Object loadReq(){

        System.out.println("loaded");
        return "file";
    }
}
