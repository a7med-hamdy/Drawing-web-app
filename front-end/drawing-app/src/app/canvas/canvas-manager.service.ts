import { CursorService } from './cursor.service';
import { Injectable } from '@angular/core';
import Konva from 'konva';

@Injectable({
  providedIn: 'root'
})
export class CanvasManagerService {
  selected:boolean = false;
  shapes: any = [];
  stage!: Konva.Stage;
  layer!: Konva.Layer;
  Cursor!:CursorService;
  selectedShape!:Konva.Shape;

  constructor(stg:Konva.Stage, lyer:Konva.Layer, slctdShape:Konva.Shape) {
    this.stage = stg;
    this.layer = lyer;
    this.selectedShape = slctdShape;
  }




   public refresh():void{

    this.stage = new Konva.Stage({
      container: 'container',
      width: window.innerWidth,
      height: window.innerHeight
    });
    this.selectedShape = new Konva.Shape();
    this.Cursor = new CursorService(this.stage, this.layer, this.selectedShape);
    this.layer = new Konva.Layer();
    this.layer.add(this.Cursor.transformer);
    this.layer.add(this.Cursor.selectionRectangle);
    this.stage.add(this.layer);
    this.Cursor.CursorPositionListener();
    this.Cursor.CursorShapeSelectionListener(this.shapes);
  }


  public switchSelection(){
    this.selected = !this.selected;
  }



  public addShape(shape:string){

    this.switchSelection();
    const component = this;
  this.stage.on('click', function(){
  if(component.selected){
    var rect = new Konva.Rect({
      x:component.Cursor.CursorPos.x,
      y:component.Cursor.CursorPos.y,
      width:300,
      height:300,
      stroke:"black",
      draggable:true,
      scaleX:1,
      scaleY:1
    });
    component.shapes.push(rect);
    component.layer.add(rect);
    component.switchSelection();
  }
});
  }

  public transformShape(){

}

  public deleteShape(shape:Konva.Shape){

  }
}
