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
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    /**
     * handle save request
     * @param type
     * string that indicates the type of the file json or xml
     * @return
     * the file to be downloaded
     * @throws TransformerFactoryConfigurationError
     * @throws TransformerException
     * @throws IOException
     */
    @GetMapping("/save/{type}")
    @ResponseBody
    public ResponseEntity<Object> saveReq(@PathVariable String type) throws TransformerFactoryConfigurationError, TransformerException, IOException{
        
        StringWriter stringWriter = new StringWriter();
        StreamResult streamResult = new StreamResult(stringWriter);
        String string = "";
        String filename = "saved drawing";
        String mediatype = "";
        String element = this.gson.toJson(this.warehouse.getList(),new TypeToken<ArrayList<shapeInterface>>() {}.getType()); 
        JSONArray list = new JSONArray(element);
        if(type.equalsIgnoreCase("json"))
        {
            //create the json file
            string = list.toString();
            filename = filename + ".json";
            mediatype = "application/json";
        }
        else
        {
            //create the xml file
            JSONObject json = new JSONObject("{shape:"+list + "}");
            string = XML.toString(json);
            string = "<shapes>" + string + " "+"</shapes>";
            Transformer transformer = TransformerFactory.newInstance().newTransformer();
            transformer.setOutputProperty(OutputKeys.INDENT, "yes");
            transformer.setOutputProperty(OutputKeys.METHOD, "xml");
            transformer.setOutputProperty(OutputKeys.DOCTYPE_SYSTEM, "");
            transformer.setOutputProperty(OutputKeys.ENCODING, "ISO-8859-1");
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
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=" + file.getName())
                .contentType(MediaType.parseMediaType(mediatype))
                .contentLength(file.length()) 
                .body(resource);
    }
    /**
     * handle load request
     * @param file
     * string of the content of the loaded file
     * @param type
     * the type of the file xml or json
     * @return
     * json array of the shapes in the file
     * @throws IOException
     */
    @PostMapping("/load")
    public String loadReq(@RequestParam("file") String file, @RequestParam("type") String type) throws IOException{
        String content = new String(file.getBytes());
        String jsonString = "";
        if(type.equalsIgnoreCase("text/xml"))
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
        String s = updateList(content);
        return s;
    }

    /**
     * helper method to update the backend with the content of the file
     * @param content
     * string content of the file
     * @return
     * json array of teh objects after updating the backend
     * @throws JsonProcessingException
     */
    private String updateList(String content) throws JsonProcessingException{
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
        return jsonList(this.warehouse.getList());
    }

    /**
     * helper method to convert java array list to json array
     * @param list
     * the list to be converted
     * @return
     * json array representation of the objects
     * @throws JsonProcessingException
     */
    private String jsonList(ArrayList<shapeInterface> list) throws JsonProcessingException
    {
        ObjectMapper map = new ObjectMapper();
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
