import { Injectable, Component } from '@angular/core';
import Konva from 'konva';
import { Rect } from 'konva/lib/shapes/Rect';
import { Transformer } from 'konva/lib/shapes/Transformer';
import { stages } from 'konva/lib/Stage';
@Injectable({
  providedIn: 'root'
})
export class CursorService {
  CursorPos:any;
  stage!: Konva.Stage;

  selectedShape!:any;

  transformer: Konva.Transformer = new Konva.Transformer({
    rotateEnabled:false,
    //ignoreStroke:true
  });


  constructor(stg:Konva.Stage) {
    this.stage = stg;
  }

  public emptySelection(){
    this.selectedShape = null;
    this.transformer.setAttrs({
      enabledAnchors:[
        'top-left',
        'top-center',
        'top-right',
        'middle-right',
        'middle-left',
        'bottom-left',
        'bottom-center',
        'bottom-right'
      ]
    })
    this.transformer.nodes([]);
  }

  public CursorPositionListener(){
    const component = this;
     this.stage.on('mousemove', function(){
      component.CursorPos = (component.stage.getRelativePointerPosition());
    });
  }


  public CursorShapeSelectionListener(shapes:any){
    const component = this;
    //selection on click
    this.stage.on('click tap', function (e) {
      // if click on empty area - remove all selections
      if (e.target === component.stage) {
        //component.selected = [];
        component.emptySelection();

        return;
      }
      if(e.target instanceof Konva.Shape){

        //filter the selected shapes if multiple clicks on the same shape
        if(e.target instanceof Konva.Circle || e.target.name() == 'square'){
          component.transformer.setAttrs({
            enabledAnchors:[
              "top-left",
              "top-right",
              "bottom-left",
              "bottom-right",
            ]
          })
          //component.selectedShape = e.target;
          //component.equalTransformer.nodes([e.target]);
        }
        //else{
          component.selectedShape = e.target;
          console.log(component.selectedShape);
          component.transformer.nodes([component.selectedShape]);
      //  }

        return;
      }
  });
}

  public CursorTransformationListener(shapes:any){
      const component = this;
      this.stage.on("mouseover", function(e){
        e.target.on('transformend', function(){
          if(e.target instanceof Konva.Shape)
          e.target.setAttrs({
            width:  Math.max(5,Math.abs(e.target.width() * e.target.scaleX())),
            height: Math.max(5,Math.abs(e.target.height() * e.target.scaleY())),
            scaleX: 1,
            scaleY: 1,
          });
          console.log(component.selectedShape);
          return;
      });
      return;
    });

  }
}
