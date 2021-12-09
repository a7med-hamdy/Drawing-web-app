import { RequestsService } from './requests.service';
import { ShapeTranslatorService } from './shape-translator.service';
import { CursorService } from './cursor.service';
import { Injectable, Component } from '@angular/core';
import Konva from 'konva';


@Injectable({
  providedIn: 'root'
})
export class CanvasManagerService {
  pressed:boolean = false;
  shapes: any = [];
  stage!: Konva.Stage;
  layer!: Konva.Layer;
  Cursor!:CursorService;
  ShapeTranslator:ShapeTranslatorService = new ShapeTranslatorService();
  shape!: any;

  constructor(stg:Konva.Stage, lyer:Konva.Layer, public req:RequestsService) {
    this.stage = stg;
    this.layer = lyer;
  }

/*Utility Functions */
  public addShape(shape:any){
    this.layer.add(shape);
    this.shapes.push(shape);
    console.log(this.layer.getChildren());
  }

  public requestData():void{
    this.req.refreshRequest()
    .subscribe(data =>{
      console.log(data);
      if (data.length === 0 ){
        return;
      }
      else{
        for(var i = 0; i < data.length; i++){
            var newShape = this.ShapeTranslator.translateToKonva(data[i]);
            this.addShape(newShape);
        }
      }
    console.log(data);
    })
  }

   public refresh():void{
    this.stage = new Konva.Stage({
      container: 'container',
      width: window.innerWidth,
      height: window.innerHeight,
    });
    this.Cursor = new CursorService(this.stage, this.req);
    this.layer = new Konva.Layer();
    this.layer.add(this.Cursor.transformer);
    this.stage.add(this.layer);
    this.Cursor.CursorPositionListener();
    this.Cursor.CursorShapeSelectionListener(this.shapes, this.layer);
    this.Cursor.CursorTransformationListener();
    this.Cursor.CursorDraggerListener();
    this.requestData();

  }
///////////////////////////////////////////////////////////////////////


  createShape(type: string){
    const component = this;
    var x, y;
    this.stage.on('click', function(){
        x = component.Cursor.CursorPos.x;
        y = component.Cursor.CursorPos.y;
        component.req.createRequest(type, Math.trunc(x), Math.trunc(y))
        .subscribe(data =>{
            component.addShape(component.ShapeTranslator.translateToKonva(data));
            console.log(`${type} is created\n` + JSON.stringify(data))
          });
          component.stage.off('click');
    return type;
    });
  }


  public copyShape(){
    const component = this;
    var id = this.Cursor.selectedShape.getAttr('id');
    var x,y;
    this.stage.on('click', function(){
        x = component.Cursor.CursorPos.x;
        y = component.Cursor.CursorPos.y;
        component.req.copyRequest(id, Math.trunc(x), Math.trunc(y))
        .subscribe(data =>{
            component.addShape(component.ShapeTranslator.translateToKonva(data));
            console.log(`shape is copied\n` + JSON.stringify(data));
        });
        component.stage.off('click');
    });
  }



  public deleteShape(){
    if(this.Cursor.selectedShape != null){
      var id = this.Cursor.selectedShape.getAttr('id');

      for( var i = 0; i < this.shapes.length; i++){
        if ( this.shapes[i].getAttr('id') === id) {
            this.Cursor.selectedShape.destroy();
            this.shapes.splice(i, 1);
            break;
        }
      }
      this.req.deleteRequest(id)
      .subscribe(data => {
        this.Cursor.emptySelection();
         console.log(`shape deleted #${id}\n` + data)
         });

    }
}

  public colorShape(color:string){

    if(this.Cursor.selectedShape != null){
      var id = this.Cursor.selectedShape.getAttr('id');
      console.log(this.Cursor.selectedShape);
      this.Cursor.selectedShape.setAttrs({
        fill:color
      });
      if(this.Cursor.selectedShape instanceof Konva.Line){
        this.Cursor.selectedShape.setAttrs({
          fill:color,
          stroke:color,
        })
      }
      this.req.colorRequest(id, color)
      .subscribe(data => { console.log(`color changed to: ${color}\nshape #${id}\n` + data) });
    }
  }


  public undo(){
    this.Cursor.emptySelection();
    this.req.undoRequest()
    .subscribe(data =>{
        if(data.length == this.shapes.length){

          for(var i = 0; i < data.length; i++){
              var oldshape = this.shapes.pop();
              oldshape.destroy();
              var newShape = this.ShapeTranslator.translateToKonva(data[i]);
              this.addShape(newShape);
          }
        }
        if(data.length < this.shapes.length){
          var deletedShape = this.shapes.pop();
          deletedShape.destroy();
        }
        if(data.length > this.shapes.length){
          var addedShape = this.ShapeTranslator.translateToKonva(data[data.length-1]);
          this.addShape(addedShape);
        }
          console.log("return: \n"+data);
          console.log(`UNDO action:\n` + JSON.stringify(data))


    });
  }


  public redo(){
    this.Cursor.emptySelection();
    this.req.redoRequest()
     .subscribe(data =>
      {
        if(data.length == this.shapes.length){
          for(var i = 0; i < data.length; i++){
              var oldshape = this.shapes.pop();
              oldshape.destroy();
              var newShape = this.ShapeTranslator.translateToKonva(data[i]);
              this.addShape(newShape);
          }
        }
        if(data.length < this.shapes.length){
          var deletedShape = this.shapes.pop();
          deletedShape.destroy();
        }
        if(data.length > this.shapes.length){
          var addedShape = this.ShapeTranslator.translateToKonva(data[data.length-1]);
          this.addShape(addedShape);
        }
        console.log(`REDO action:\n` + JSON.stringify(data))
      });

  }
}
