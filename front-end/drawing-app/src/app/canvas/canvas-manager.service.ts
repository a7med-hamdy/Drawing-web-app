import { ShapeTranslatorService } from './shape-translator.service';
import { CursorService } from './cursor.service';
import { Injectable, Component } from '@angular/core';
import Konva from 'konva';
import {  RequestsService  } from './requests.service';
import { HttpClient } from '@angular/common/http';
import { Circle } from 'konva/lib/shapes/Circle';

@Injectable({
  providedIn: 'root'
})
export class CanvasManagerService {
  pressed:boolean = false;
  shapes: any = [];
  stage!: Konva.Stage;
  layer!: Konva.Layer;
  Cursor!:CursorService;
  requestService!:RequestsService;
  ShapeTranslator:ShapeTranslatorService = new ShapeTranslatorService();

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
    this.Cursor.CursorTransformationListener(this.shapes);
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
   // var createdShape = this.ShapeTranslator.translateToKonva(this.requestService.createRequest(shape),x,y);
    //this.addShape(createdShape);
  }

  public addShape(shape:any){

    this.switchState();
    const component = this;
  this.stage.on('click', function(){
  if(component.pressed){
      var rect = new Konva.Rect({
        name:"square",
        x:component.Cursor.CursorPos.x,
        y:component.Cursor.CursorPos.y,
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

      for( var i = 0; i < this.shapes.length; i++){
        if ( this.shapes[i].getAttr('id') === id) {
            this.shapes[i].destroy();
            this.shapes.splice(i, 1);
            break;
        }
      }
      this.Cursor.emptySelection();
      //this.requestService.deleteRequest(id);
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

    //this.requestService.copyRequest(id);
    //var CopiedShape =  this.ShapeTranslator.translateToKonva("this.requestService.copyRequest(id);");
    //this.layer.add(CopiedShape);
    //this.shapes.push(CopiedShape);

  }
}
