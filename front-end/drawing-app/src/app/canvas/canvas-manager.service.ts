import { CanvasComponent } from './canvas.component';
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
  CanvasComponent!: CanvasComponent;

  constructor(stg:Konva.Stage, lyer:Konva.Layer) {
    this.stage = stg;
    this.layer = lyer;
  }




   public refresh():void{

    this.stage = new Konva.Stage({
      container: 'container',
      width: window.innerWidth,
      height: window.innerHeight
    });
    this.Cursor = new CursorService(this.stage);
    this.layer = new Konva.Layer();
    this.layer.add(this.Cursor.transformer);
    this.stage.add(this.layer);
    this.Cursor.CursorPositionListener();
    this.Cursor.CursorShapeSelectionListener(this.shapes);
    this.Cursor.CursorTransformationListener();
    this.updateShapePosition();
    this.updateShapeSize();
  }


  public switchState(){
    this.pressed = !this.pressed;
  }

  public createShape(shape:string){
    const component = this;
    var x,y;
    this.switchState();
    this.stage.on('click', function(){
      if(component.pressed){
        x = component.Cursor.CursorPos.x;
        y = component.Cursor.CursorPos.y;
        component.switchState();
      }
    });
    //var createdShape = this.ShapeTranslator.translateToKonva(this.requestService.createRequest(shape,x,y));
    //this.addShape(createdShape);
  }

  public addShape(shape:any){

    this.switchState();
    const component = this;
  this.stage.on('click', function(){
  if(component.pressed){
      var rect = new Konva.Rect({
        x:component.Cursor.CursorPos.x,
        y:component.Cursor.CursorPos.y,
        //radius:32,
        width:300,
        height:300,
        stroke:"black",
        fill:"black",
        draggable:true,
        scaleX:1,
        scaleY:1
      });
      component.shapes.push(rect);
      component.layer.add(rect);
      component.switchState();
      return;
    }
  });
  /*
  //intended logic
  this.layer.add(shape);
  this.shapes.push(shape);
  */
  }

  public deleteShape(){
    if(this.Cursor.selectedShape != null){
      var id = this.Cursor.selectedShape.getAttr('id');
      //this.requestService.deleteRequest(id);

      for( var i = 0; i < this.shapes.length; i++){
        if ( this.shapes[i].getAttr('id') === id) {
            this.Cursor.selectedShape.destroy();
            this.shapes.splice(i, 1);
            break;
        }
      }
      this.Cursor.emptySelection();
    }
}

  public colorShape(color:string){

    if(this.Cursor.selectedShape != null){
      var id = this.Cursor.selectedShape.getAttr('id');
      console.log(this.Cursor.selectedShape);
      this.Cursor.selectedShape.setAttrs({
        fill:color
      });

      //this.requestService.colorRequest(id,color);
    }
  }

  public copyShape(){
    var id = this.Cursor.selectedShape.getAttr('id');
    this.CanvasComponent.copy(id);
    //this.requestService.copyRequest(id);
    //var CopiedShape =  this.ShapeTranslator.translateToKonva("this.requestService.copyRequest(id);");
    //this.addShape(CopiedShape);

  }

  public updateShapeSize(){
    if(this.Cursor.selectedShape != null){
      var id = this.Cursor.selectedShape.getAttr('id');
      var width =  this.Cursor.selectedShape.getAttr('width');
      var height = this.Cursor.selectedShape.getAttr('height');
      this.CanvasComponent.resize(id,width,height);
    }
  }


  public updateShapePosition(){
    const component = this;
    if(this.Cursor.selectedShape != null){
      this.stage.on("mouseover", function(e){
        e.target.on("transformend" ,function(){
          console.log("HELLO");
          var id = component.Cursor.selectedShape.getAttr('id');
          var x =  component.Cursor.selectedShape.getAttr('x');
          var y = component.Cursor.selectedShape.getAttr('y');
          component.CanvasComponent.move(id,x,y);
        });
      })


    }
  }
}
