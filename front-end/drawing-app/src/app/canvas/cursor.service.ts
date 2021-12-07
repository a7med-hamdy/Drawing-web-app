import { RequestsService } from './requests.service';
import { Injectable, Component } from '@angular/core';
import Konva from 'konva';
@Injectable({
  providedIn: 'root'
})
export class CursorService {
  CursorPos:any;
  stage!: Konva.Stage;

  selectedShape!:any;

  transformer: Konva.Transformer = new Konva.Transformer({
    rotateEnabled:false,
    ignoreStroke:true
  });


  constructor(stg:Konva.Stage, public req: RequestsService) {
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
      component.CursorPos = component.stage.getPointerPosition();
    });
  }


  public CursorShapeSelectionListener(shapes:any){
    const component = this;
    //selection on click
    this.stage.on('dblclick', function (e) {
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
          });
        }
        else{
          component.transformer.setAttrs({
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
          });
        }
        component.selectedShape = e.target;
        console.log(component.selectedShape);
        component.transformer.nodes([component.selectedShape]);

        return;
      }
  });
}

  public CursorTransformationListener(){
      const component = this;

      this.stage.on("mousemove", function(e){
        e.target.on('transformend', function(){

          e.target.setAttrs({
            width:  Math.max(5,Math.abs(e.target.width() * e.target.scaleX())),
            height: Math.max(5,Math.abs(e.target.height() * e.target.scaleY())),
            scaleX: 1,
            scaleY: 1,
          });

          component.req.resizeRequest(e.target.getAttr('id'), Math.trunc(e.target.width()), Math.trunc(e.target.height()))
          .subscribe(data => {

            console.log(`size changed to: (${e.target.width()},${e.target.height()})\nshape #${e.target.getAttr('id')}\n` + data)
          });

          component.req.moveRequest(e.target.getAttr('id'), Math.trunc(e.target.x()), Math.trunc(e.target.y()))
          .subscribe(data => {
            console.log(`position changed to: (${e.target.x()},${e.target.y()})\nshape #${e.target.getAttr('id')}\n` + data)
          })
          component.selectedShape = e.target;
          console.log(component.selectedShape);
          return;
      });
      return;
    });
    return;
  }

  public CursorDraggerListener(){
    const component = this;

    this.stage.on("mousedown", function(e){
      e.target.on('dragend', function(){

        component.req.moveRequest(e.target.getAttr('id'), Math.trunc(e.target.x()), Math.trunc(e.target.y()))
        .subscribe(data => {
          console.log(`position changed to: (${e.target.x()},${e.target.y()})\nshape #${e.target.getAttr('id')}\n` + data)
        })
        component.selectedShape = e.target;
        console.log(component.selectedShape);
        return;
    });
    return;
  });
  return;
  }
}
