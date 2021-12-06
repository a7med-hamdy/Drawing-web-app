import { Injectable } from '@angular/core';
import Konva from 'konva';

@Injectable({
  providedIn: 'root'
})
export class CursorService {
  CursorPos:any;
  stage!: Konva.Stage;
  layer!: Konva.Layer;
  transformer: Konva.Transformer = new Konva.Transformer();

  selectionRectangle = new Konva.Rect({
    fill: 'rgba(0,0,255,0.5)',
    visible: false,
  });

  constructor(stg:Konva.Stage, lyer:Konva.Layer) {
    this.stage = stg;
    this.layer = lyer;
  }

  public CursorPositionListener(){
    const component = this;
     this.stage.on('mousemove', function(){
      component.CursorPos = (component.stage.getRelativePointerPosition());
      console.log(component.CursorPos);
    });
  }

  public CursorShapeSelectionListener(shapes:any){
    const component = this;
    var x1:number; var x2:number; var y1:number; var y2:number;
    this.stage.on('mousedown touchstart', (e) => {
      // do nothing if we mousedown on any shape
        if (e.target !== component.stage) {
          return;
        }
        e.evt.preventDefault();
        x1 = component.CursorPos.x;
        y1 = component.CursorPos.y;
        x2 = component.CursorPos.x;
        y2 = component.CursorPos.y;

      component.selectionRectangle.visible(true);
      component.selectionRectangle.width(0);
      component.selectionRectangle.height(0);
    });

   this.stage.on('mousemove touchmove', (e) => {
      // do nothing if we didn't start selection
      if (!component.selectionRectangle.visible()) {
        return;
      }
      e.evt.preventDefault();
      x2 = component.CursorPos.x;
      y2 = component.CursorPos.y;

      component.selectionRectangle.setAttrs({
        x: Math.min(x1, x2),
        y: Math.min(y1, y2),
        width: Math.abs(x2 - x1),
        height: Math.abs(y2 - y1),
      });
    });

    this.stage.on('mouseup touchend', (e) => {
      // do nothing if we didn't start selection
      if (!component.selectionRectangle.visible()) {
        return;
      }
      e.evt.preventDefault();
      // update visibility in timeout, so we can check it in click event
      setTimeout(() => {
        component.selectionRectangle.visible(false);
      });

      var box = component.selectionRectangle.getClientRect();
      var selected = shapes.filter((shape:Konva.Shape) =>
        Konva.Util.haveIntersection(box, shape.getClientRect())
      );
      component.transformer.nodes(selected);
    });
  }
}
