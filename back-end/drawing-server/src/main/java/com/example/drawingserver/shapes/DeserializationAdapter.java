package com.example.drawingserver.shapes;

import java.lang.reflect.Type;
import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParseException;

/**
 * a helper class to convert the json objects to java objects
 */
public class DeserializationAdapter implements JsonDeserializer {

    @Override
    public shapeInterface deserialize(JsonElement jsonElement, Type type, JsonDeserializationContext jsonDeserializationContext) throws JsonParseException {
        JsonObject jsonObject = jsonElement.getAsJsonObject();
        return jsonDeserializationContext.deserialize(jsonObject, shape.class);
    } 
}
