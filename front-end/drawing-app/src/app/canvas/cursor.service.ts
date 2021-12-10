import { RequestsService } from './requests.service';
import { Injectable, Component } from '@angular/core';
import Konva from 'konva';
@Injectable({
  providedIn: 'root'
})
export class CursorService {
  CursorPos:any; //the position of the cursor on the stage
  stage!: Konva.Stage; //the stage on which events are listened to and updated accordingly
  selectedShape!:any; //a pointer to the selected shape on the canvas

  //Konva transformer used to resize Konva shapes
  transformer: Konva.Transformer = new Konva.Transformer({
    rotateEnabled:false,
    ignoreStroke:true
  });

  //special transformers for the line using two Konva circles
  lineAnchor1!:any; //updates the X & Y coordinates
  lineAnchor2!:any; //updates the position coordinates

  constructor(stg:Konva.Stage, public req: RequestsService) {
    this.stage = stg;
  }

  /**
   * resets all values of the pointers and
   * detaches all the transformers
   */
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

  /**
   *
   * @param targetX new X location
   * @param targetY new Y location
   * @param targetWdth new dimension 1
   * @param targetHeigt new dimension 2
   * @param id id of the shape
   *
   * sends a resize request for the shape currently transforming.
   */
  public sendResize(targetX:any, targetY:any,targetWdth:any, targetHeigt:any, id:any){
    this.req.resizeRequest(id, Math.trunc(targetWdth), Math.trunc(targetHeigt),Math.trunc(targetX),Math.trunc(targetY))
    .subscribe(data => {

      console.log(`size changed to: (${targetWdth},${targetHeigt})\nshape #${id}\n` + data)
    });
  }
/**
 *
 * @param targetX new X location
 * @param targetY new Y location
 * @param id id of the shape
 *
 * sends a move request for the shape currently being dragged.
 */
  public sendMove(targetX:any, targetY:any, id:any){
    this.req.moveRequest(id, Math.trunc(targetX), Math.trunc(targetY))
    .subscribe(data => {
      console.log(`position changed to: (${targetX},${targetY})\nshape #${id}\n` + data)
    })
  }

  /**
   * listens on the position of the cursor on the stage
   * updates the cursor coordinates accordingly
   */
  public CursorPositionListener(){
    const component = this;
     this.stage.on('mousemove', function(){
      component.CursorPos = component.stage.getPointerPosition();
    });
  }

  /**
   *
   * @param lyer konva layer to add the line anchors on
   *
   * listens on the double click for the cursor selections
   *
   * attaches/detaches the transformer accordingly
   */
  public CursorShapeSelectionListener(lyer:Konva.Layer){
    const component = this;
    //selection on click
    this.stage.on('dblclick', function (e) {
      // if click on empty area - remove all selections
      if (e.target === component.stage) {
        component.emptySelection();
        return;
      }
      //if selecting line anchors - do nothing
      if(e.target === component.lineAnchor1 || e.target === component.lineAnchor2){
        return;
      }

      //if the selected target is a shape
      if(e.target instanceof Konva.Shape){

        //attach corner anchors only for the circle, triangle and square
        if(e.target instanceof Konva.Circle || e.target.name() == 'square' || e.target.name() == 'triangle'){
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

        //attach the special line anchors for the line
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
          }
          component.lineAnchor1.on('dragmove', updateLine);
          component.lineAnchor2.on('dragmove', updateLine);

        }
        //other wise attach the full transformer
        else{
          component.emptySelection();
          component.selectedShape = e.target;
          component.transformer.nodes([component.selectedShape]);

        }
        console.log(component.selectedShape);
        return;
      }
  });
}

  /**
   *
   * @returns if nothing to be listened on
   *
   * listen on the transformations done by the transformer
   * updates the shapes accordingly
   * sends a resize request to the backend
   */
  public CursorTransformationListener(){
      const component = this;
      var id;
      //arrays to filter the noise from the events
      var changesdim:any = [];
      var changespos:any = [];
      this.transformer.on("transformstart", function(e){
        console.log('hello');
        //if the target is the line anchors return
        if(e.target === component.lineAnchor1 || e.target === component.lineAnchor2){return;}

        //if the target is a shape
        if(e.target instanceof Konva.Shape){
          component.selectedShape = e.target;
          console.log(component.selectedShape);
          e.target.on('transformend', function(){
            id = e.target.getAttr('id');
            var olddate = Date.now();
            //if the target is a triangle or a circle update its radius attribute with the new changes
            if (e.target instanceof Konva.RegularPolygon || e.target instanceof Konva.Circle){
              e.target.setAttrs({
                radius:Math.trunc(e.target.radius() * e.target.scaleX()),
                scaleX: 1,
                scaleY: 1,
              });
              changesdim.push([e.target.radius(),e.target.radius()]);
            }
            //if the target is an ellipse update both its radiuses attributes with the new changes
            else if(e.target instanceof Konva.Ellipse){
              e.target.setAttrs({
                radiusX:Math.trunc(e.target.radiusX() * e.target.scaleX()),
                radiusY:Math.trunc(e.target.radiusY() * e.target.scaleY()),
                scaleX: 1,
                scaleY: 1,
              });
              changesdim.push([e.target.radiusX(),e.target.radiusY()]);
            }
            //if its a rectangle or square update its width and height accordingly
            else{
            e.target.setAttrs({
              width:  Math.trunc(e.target.width() * e.target.scaleX()),
              height: Math.trunc(e.target.height() * e.target.scaleY()),
              scaleX: 1,
              scaleY: 1,
            });
            changesdim.push([e.target.width(),e.target.height()]);
          }
            changespos.push([e.target.x(), e.target.y()]);
            //filter the noise as much as possible and send the last change made to the backend
            if(Math.abs(Date.now()- olddate) != 0){
              component.sendResize(changespos[changespos.length-1][0],changespos[changespos.length-1][1],changesdim[changesdim.length-1][0],changesdim[changesdim.length-1][1], id);
            }
            //empty the arrays to avoid overflow errors
            changesdim = [];
            changespos = [];
          });
        }
      });
    return;
  }

  /**
   *
   * @returns if nothing to is being dragged
   *
   * listens on the dragging events done on the stage
   * updates the shapes positions accordingly
   */
  public CursorDraggerListener(){
    const component = this;
    //if dragging happens
    this.stage.on("dragstart", function(e){
      //if we are selecting a line then the dragged objects are the line anchors
      if(component.selectedShape instanceof Konva.Line){
        //update the line's position and size according to the anchor's position
        e.target.on('dragend', function(){
          console.log(component.selectedShape);
          component.sendResize(component.lineAnchor1.x(), component.lineAnchor1.y(),component.lineAnchor2.x(), component.lineAnchor2.y(),  component.selectedShape.getAttr('id'));
          console.log(component.selectedShape);
          //stop listening for drags to avoid sending multiple requests for the same shape
          e.target.off('dragend');
        });
    }
    //if the dragged object is a shape
    else if(e.target instanceof Konva.Shape){
      e.target.on('dragend', function(){
        //update its X and Y coordinates in the backend
        component.sendMove(Math.trunc(e.target.x()), Math.trunc(e.target.y()), e.target.getAttr('id'));
        //stop listening for drags to avoid sending multiple requests for the same shape
        e.target.off('dragend');
      });
    }
    return;
  });
  return;
  }
}
