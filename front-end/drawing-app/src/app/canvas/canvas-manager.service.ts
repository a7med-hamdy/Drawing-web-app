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


  constructor(stg:Konva.Stage, lyer:Konva.Layer) {
    this.stage = stg;
    this.layer = lyer;
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
      stroke:"black"
    });
    component.shapes.push(rect);
    component.layer.add(rect);
    component.switchSelection();
  }
});
  }

  public deleteShape(shape:Konva.Shape){

  }
}
