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
  lineAnchor1!:any;
  lineAnchor2!:any;

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
    });
    if(this.lineAnchor1 instanceof Konva.Circle)
      this.lineAnchor1.destroy();
    else
      this.lineAnchor1 = null;
      if(this.lineAnchor2 instanceof Konva.Circle)
      this.lineAnchor2.destroy();
    else
      this.lineAnchor2 = null;

    this.transformer.nodes([]);
  }

  public sendResize(targetWdth:any, targetHeigt:any, id:any){
    this.req.resizeRequest(id, Math.trunc(targetWdth), Math.trunc(targetHeigt))
    .subscribe(data => {

      console.log(`size changed to: (${targetWdth},${targetHeigt})\nshape #${id}\n` + data)
    });
  }

  public sendMove(targetX:any, targetY:any, id:any){
    this.req.moveRequest(id, Math.trunc(targetX), Math.trunc(targetY))
    .subscribe(data => {
      console.log(`position changed to: (${targetX},${targetY})\nshape #${id}\n` + data)
    })
  }
  public CursorPositionListener(){
    const component = this;
     this.stage.on('mousemove', function(){
      component.CursorPos = component.stage.getPointerPosition();
    });
  }


  public CursorShapeSelectionListener(shapes:any, lyer:Konva.Layer){
    const component = this;
    //selection on click
    this.stage.on('dblclick', function (e) {
      // if click on empty area - remove all selections
      if (e.target === component.stage) {
        component.emptySelection();
        return;
      }
      if(e.target === component.lineAnchor1 || e.target === component.lineAnchor2){
        return;
      }
      if(e.target instanceof Konva.Shape){

        //filter the selected shapes if multiple clicks on the same shape
        if(e.target instanceof Konva.Circle || e.target.name() == 'square'){
          component.emptySelection();
          component.transformer.setAttrs({
            enabledAnchors:[
              "top-left",
              "top-right",
              "bottom-left",
              "bottom-right",
            ]
          });
          component.selectedShape = e.target;
          component.transformer.nodes([component.selectedShape]);
        }
        else if(e.target instanceof Konva.Line){
          component.emptySelection();
          component.selectedShape = e.target;
          component.lineAnchor1= new Konva.Circle({
            x: e.target.points()[0],
            y: e.target.points()[1],
            radius: 10,
            fill: 'grey',
            stroke:"red",
            draggable: true
          })
          lyer.add(component.lineAnchor1);

          component.lineAnchor2 = new Konva.Circle({

            x: e.target.points()[2],
            y: e.target.points()[3],
            radius: 10,
            fill: 'grey',
            stroke:"blue",
            draggable: true
          })
          lyer.add(component.lineAnchor2);
          function updateLine() {
            const pointsArr = [
              component.lineAnchor1.x(),
              component.lineAnchor1.y(),
              component.lineAnchor2.x(),
              component.lineAnchor2.y(),
            ]
            e.target.setAttrs({
              points:pointsArr,
            });
            //lyer.batchDraw();
          }

          component.lineAnchor1.on('dragmove', updateLine);
          component.lineAnchor2.on('dragmove', updateLine);

        }
        else{
          component.emptySelection();
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
          component.selectedShape = e.target;
          component.transformer.nodes([component.selectedShape]);

        }
        console.log(component.selectedShape);
        return;
      }
  });
}

  public CursorTransformationListener(){
      const component = this;

      this.stage.on("mousemove", function(e){
        if(e.target === component.lineAnchor1 || e.target === component.lineAnchor2){return;}
        var id = e.target.getAttr('id');
          e.target.on('transformend', function(){
            e.target.setAttrs({
              width:  Math.max(5,Math.abs(e.target.width() * e.target.scaleX())),
              height: Math.max(5,Math.abs(e.target.height() * e.target.scaleY())),
              scaleX: 1,
              scaleY: 1,
            });

            component.sendResize(e.target.width(), e.target.height(),id);
            component.sendMove(e.target.x(),e.target.y(),id);

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
      if(component.selectedShape instanceof Konva.Line){
        e.target.on('drag', function(){
            component.sendMove(component.lineAnchor1.x(), component.lineAnchor1.y(), component.selectedShape.getAttr('id'));
            //component.selectedShape = e.target;
            console.log(component.selectedShape);
        });
      e.target.on('drag', function(){
        component.sendResize(component.lineAnchor2.x(), component.lineAnchor2.y(),  component.selectedShape.getAttr('id'));
        //component.selectedShape = e.target;
        console.log(component.selectedShape);
    });
    }
    else{
      e.target.on('dragend', function(){
        component.sendMove(e.target.x(), e.target.y(), e.target.getAttr('id'));
        //component.selectedShape = e.target;
        console.log(component.selectedShape);
      });
    }
    return;
  });
  return;
  }
}
