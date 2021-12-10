import { RequestsService } from './requests.service';
import { ShapeTranslatorService } from './shape-translator.service';
import { CursorService } from './cursor.service';
import { Injectable, Component } from '@angular/core';
import Konva from 'konva';


@Injectable({
  providedIn: 'root'
})
export class CanvasManagerService {

  shapes: any = [];//array of shapes currently present in the layer
  stage!: Konva.Stage;//konva stage that hold the layer
  layer!: Konva.Layer;//Konva layer that holds the shapes
  Cursor!:CursorService; //cursor used to select shapes on the canvas
  ShapeTranslator:ShapeTranslatorService = new ShapeTranslatorService(); //builds Konva shapes from backend shapes
  selectedFiles?: File;

  constructor(stg:Konva.Stage, lyer:Konva.Layer, public req:RequestsService) {
    this.stage = stg;
    this.layer = lyer;
  }

/*Utility Functions */

/**
 *
 * @param shape shape to be added
 *
 * Adds the given shape to the canvas & shapes array
 *
 */
  public addShape(shape:any){
    //push the shape in the array and onto the layer
    this.layer.add(shape);
    this.shapes.push(shape);
  }

/**
 *
 * Requests & loads data from the drawing server when the application is launched
 * or opened in another tab
 */
  public requestData():void{
    //request the shapes array from the backend
    this.req.refreshRequest()
    .subscribe(data =>{
      console.log(data);
      //if the array is empty return
      if (data.length === 0 ){
        return;
      }
      //if not add the shapes on the canvas
      else{
        for(var i = 0; i < data.length; i++){
            var newShape = this.ShapeTranslator.translateToKonva(data[i]);
            this.addShape(newShape);
        }
      }
    console.log(data);
    })
  }

  /**
   *
   * function to keep refreshing the CanvasManager and its cursor
   *  on start of the application or when a change is detected
   *
   * this function is put in ngOnIt of the canvas component
   *
   */
   public refresh():void{
     //create the stage on start
    this.stage = new Konva.Stage({
      container: 'container',
      width: window.innerWidth,
      height: window.innerHeight,
    });
    this.Cursor = new CursorService(this.stage, this.req); //create the cursor on start
    this.layer = new Konva.Layer();  //create layer on start
    this.layer.add(this.Cursor.transformer); //add the cursor's transformer to the layer on start
    this.stage.add(this.layer); //add the layer to the stage on start
    this.Cursor.CursorPositionListener(); //listen for the cursor's position
    this.Cursor.CursorShapeSelectionListener(this.layer); //listen for the selection events
    this.Cursor.CursorTransformationListener();//listen for the transformation events
    this.Cursor.CursorDraggerListener();//listen for the dragging events
    this.requestData(); // request the data on start

  }
///////////////////////////////////////////////////////////////////////
/*Main functions */

/**
 *
 * @param type type of shape to be created
 * sends a create request in a desired location
 *  recieves the desired shape and adds it to the canvas.
 *
 *
 */
  createShape(type: string){
    const component = this;
    var x, y;

    //when clicking on the stage
    this.stage.on('click', function(){
      //send a create request with the current cursor position
        x = component.Cursor.CursorPos.x;
        y = component.Cursor.CursorPos.y;
        component.req.createRequest(type, Math.trunc(x), Math.trunc(y))
        .subscribe(data =>{
            component.addShape(component.ShapeTranslator.translateToKonva(data));
            console.log(`${type} is created\n` + JSON.stringify(data))
          });
          //stop listening for click events to avoid creating multiple shapes on every click
          component.stage.off('click');
    return type;
    });
  }


/**
 *
 * sends a copy request for the id of shape that is selected by the cursor
 * and recieving the shape and adding it at the desired location.
 */
  public copyShape(){
    //if there is a selection
    if(this.Cursor.selectedShape != null){
    const component = this;
    var id = this.Cursor.selectedShape.getAttr('id'); //id of the selected shape
    var x,y;

    //when clicking on the stage
    this.stage.on('click', function(){
        //send a copy request with the current cursor position
        x = component.Cursor.CursorPos.x;
        y = component.Cursor.CursorPos.y;
        component.req.copyRequest(id, Math.trunc(x), Math.trunc(y))
        .subscribe(data =>{
            component.addShape(component.ShapeTranslator.translateToKonva(data));
            console.log(`shape is copied\n` + JSON.stringify(data));
        });
        //stop listening for click events to avoid creating multiple shapes on every click
        component.stage.off('click');
    });
  }
  }



/**
 * sends a delete request for the id of shape that is selected by the cursor
 * deletes a shape selected by the cursor from the canvas.
 *
 */
  public deleteShape(){
    //if there is a selection
    if(this.Cursor.selectedShape != null){
      var id = this.Cursor.selectedShape.getAttr('id');//id of the selected shape
      //search for the id of the shape in the array and remove it
      for( var i = 0; i < this.shapes.length; i++){
        if ( this.shapes[i].getAttr('id') === id) {
            this.Cursor.selectedShape.destroy();
            this.shapes.splice(i, 1);
            break;
        }
      }
      //send the delete request with the id of the shape
      this.req.deleteRequest(id)
      .subscribe(data => {
        this.Cursor.emptySelection();
         console.log(`shape deleted #${id}\n` + data)
         });

    }
}


/**
 *
 * @param color the desired color
 *
 *
 * Send a color request for the id of the shape selected by the cursor
 * colors the shape selected by the cursor
 *
 */
  public colorShape(color:string){
    //if there is a selection
    if(this.Cursor.selectedShape != null){
      var id = this.Cursor.selectedShape.getAttr('id');//id of the selected shape
      console.log(this.Cursor.selectedShape);
      //change its color
      this.Cursor.selectedShape.setAttrs({
        fill:color
      });
      if(this.Cursor.selectedShape instanceof Konva.Line){
        this.Cursor.selectedShape.setAttrs({
          fill:color,
          stroke:color,
        })
      }
      //send the color request to the backend
      this.req.colorRequest(id, color)
      .subscribe(data => { console.log(`color changed to: ${color}\nshape #${id}\n` + data) });
    }
  }


  /**
   * sends an undo request to the backend,
   * recieves the new shapes array to be built
   * builds the new array on the canvas.
   *
   */
  public undo(){
    //empty all selections if there is any
    this.Cursor.emptySelection();
    //send the undo request
    this.req.undoRequest()
    .subscribe(data =>{
        //remove all data from layer and shapes and build the new canvas from the recieved data
          this.layer.removeChildren();
          this.shapes = [];
          for(var i = 0; i < data.length; i++){
              var newShape = this.ShapeTranslator.translateToKonva(data[i]);
              this.addShape(newShape);
          }
          //add the transformer back
          this.layer.add(this.Cursor.transformer);
          console.log("return: \n"+data);
          console.log(`UNDO action:\n` + JSON.stringify(data))
    });
  }


   /**
   * sends an redo request to the backend,
   * recieves the new shapes array to be built
   * builds the new array on the canvas.
   *
   */
  public redo(){
    //empty all selections if there is any
    this.Cursor.emptySelection();
    this.req.redoRequest()
    //send the redo request
     .subscribe(data =>{
       //remove all data from layer and shapes and build the new canvas from the recieved data
          this.layer.removeChildren();
          this.shapes = [];
          for(var i = 0; i < data.length; i++){
              var newShape = this.ShapeTranslator.translateToKonva(data[i]);
              this.addShape(newShape);
          }
          //add the transformer back
          this.layer.add(this.Cursor.transformer);
        console.log(`REDO action:\n` + JSON.stringify(data))
      });
  }


  /**
   *
   * @param event uploaded file
   *
   * sends the uploaded file to the backend to be loaded
   * recieves the shapes array to be built on the canvas
   * builds the shapes on the canvas.
   */
  public Uploadfile(event: any):void{
    //read the uploaded file
    this.selectedFiles = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = (e) => {
      let x = reader.result as string;
      //send the file to the back end to be processed
      this.req.upload(x, <string>this.selectedFiles?.type)
      //recieve the shapes to be built
      .subscribe(data =>
        {
          console.log(data[0])
          if(data.length == 0){return;}
          //remove all data from layer and shapes and build the new canvas from the recieved data
          this.layer.removeChildren();
          this.shapes = [];
          for(var i = 0; i < data.length; i++){
            var newShape = this.ShapeTranslator.translateToKonva(data[i]);
            this.addShape(newShape);
          }
          //empty all selections
          if(this.Cursor.selectedShape != null)
            this.Cursor.emptySelection();
            //add back the transformer to the layer
          this.layer.add(this.Cursor.transformer);
        });
    };
    reader.readAsText(event.target.files[0])
}
}
