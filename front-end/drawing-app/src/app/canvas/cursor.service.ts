import { Injectable, Component } from '@angular/core';
import Konva from 'konva';

@Injectable({
  providedIn: 'root'
})
export class CursorService {
  CursorPos:any;
  stage!: Konva.Stage;
  layer!: Konva.Layer;
  transformer: Konva.Transformer = new Konva.Transformer({ignoreStroke:true});
  selected: any =[];
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
      //console.log(component.CursorPos);
    });
  }


  public CursorShapeSelectionListener(shapes:any){
    const component = this;
    var x1:number; var x2:number; var y1:number; var y2:number;

    //start of the selection rectangle
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

    //building the selection triangle
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

    //end of selection triangle
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
      component.selected = shapes.filter((shape:Konva.Shape) =>
        Konva.Util.haveIntersection(box, shape.getClientRect())
      );
      component.transformer.nodes(component.selected);
    });

    //selection on click
    this.stage.on('click tap', function (e) {
      // if we are selecting with rect, do nothing
      if (component.selectionRectangle.visible()) {
        return;
      }

      // if click on empty area - remove all selections
      if (e.target === component.stage) {
        component.selected = [];
        return;
      }
      if(e.target instanceof Konva.Shape){

        component.selected.push(e.target);
        //filter the selected shapes if multiple clicks on the same shape
        component.selected = component.selected.filter((element:Konva.Shape, index:any) => {
          return component.selected.indexOf(element) === index;
        });
      component.transformer.nodes(component.selected);
      }
      console.log(component.selected);

  });
}

  public CursorTransformationListener(shape:any){
    //if(this.selected.length == 1){
        shape.on('transform', () => {
        // adjust size to scale
        // and set minimal size
        shape.setAttrs({
          width:Math.max(20, shape.width() * shape.scaleX()),
          height:Math.max(5, shape.height() * shape.scaleY()),
          scaleX:1,
          scaleY:1,
        })
      });
    //}
  }
}
