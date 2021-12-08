package com.example.drawingserver.RequestsControllers;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.StringWriter;
import java.nio.file.Files;

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
import com.example.drawingserver.shapes.shapeInterface;
import com.example.drawingserver.shapes.shapeWarehouse;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;

import org.springframework.core.io.InputStreamResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
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
    @GetMapping("/save")
    @ResponseBody
    public ResponseEntity<Object> saveReq() throws TransformerFactoryConfigurationError, TransformerException, IOException{
        
        String xmlString = "";
        String element = this.gson.toJson(this.warehouse.getList(),new TypeToken<ArrayList<shapeInterface>>() {}.getType()); 
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
        File file = new File("try.xml");
        FileWriter myWriter = new FileWriter("try.xml");
        myWriter.write(xmlString);
        myWriter.close();
        InputStreamResource resource = new InputStreamResource(new FileInputStream(file));
        return ResponseEntity.ok()
                // Content-Disposition
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=" + file.getName())
                // Content-Type
                .contentType(MediaType.parseMediaType("application/xml"))
                // Contet-Length
                .contentLength(file.length()) 
                .body(resource);
    }
    
    @PostMapping("/load")
    public String loadReq(@RequestParam("file") MultipartFile file) throws IOException{
        String content = new String(file.getBytes());
        try {  
            JSONObject json = XML.toJSONObject(content);   
            String jsonString = json.toString(2);
            jsonString = "{\n"+jsonString.substring(23, jsonString.length()-3) + "}";
            //shapeInterface s = gson.fromJson(jsonString, shapeInterface.class);
            //JSONArray list = new JSONArray(jsonString);
            System.out.println(jsonString);  
            }catch (JSONException | StringIndexOutOfBoundsException e) {
                System.out.println(e.toString());  
            }
             
        return content;
    }
}
