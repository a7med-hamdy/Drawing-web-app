import { Injectable } from '@angular/core';
import Konva from 'konva';

@Injectable({
  providedIn: 'root'
})
export class ShapeTranslatorService {

  constructor() { }
  public translate(shape: any, text: any){
    if (shape instanceof Konva.Shape){
      return this.translateToShape(shape);
    }
    else{
      if(text == null)
        return this.translateToKonva(shape);
      else{
        return this.translateWithText(shape, text);
      }
    }
  }

  public translateToKonva(shape: any){
    if(shape.type == 'line'){
        return new Konva.Line({
          points: shape.points,
          x: shape.x,
          y: shape.y,
          fill:shape.fill,
          stroke:shape.stroke,
          strokeWidth:shape.strokeWidth,
          id: shape.id,
        })
    }
    else if(shape.type == 'rectangle' || shape.type == 'square'){
        return new Konva.Rect({
          x:shape.x,
          y:shape.y,
          width: shape.dimension1,
          height: shape.dimension2,
          fill:shape.fill,
          stroke:shape.stroke,
          strokeWidth:shape.strokeWidth,
          id: shape.id,
        })
    }
    else if(shape.type == 'ellipse'){
        return new Konva.Ellipse({
          x: shape.x,
          y: shape.y,
          radiusX: shape.dimension1,
          radiusY: shape.dimension2,
          fill:shape.fill,
          stroke:shape.stroke,
          strokeWidth:shape.strokeWidth,
          id: shape.id,
        })
    }
    else if(shape.type == 'circle'){
      return new Konva.Circle({
        x: shape.x,
        y: shape.y,
        radius: shape.dimension1,
        fill:shape.fill,
        stroke:shape.stroke,
        strokeWidth:shape.strokeWidth,
        id: shape.id,
      })
    }

    else if(shape.type == 'text'){
      return new Konva.Text({
        x: shape.x,
        y: shape.y,
        text:shape.text,
        width: shape.dimension1,
        fill:shape.fill,
        stroke:shape.stroke,
        strokeWidth:shape.strokeWidth,
        id: shape.id,

      })
    }

    return new Konva.Shape({});
  }

  private translateWithText(shape:any, text:any){
    var shapeWithText = new Konva.Group({
      x:shape.x,
      y:shape.y,
      width:shape.width,
      height:shape.height,
    });

    var KonvaShape = this.translateToKonva(shape);
    var KonvaText = this.translateToKonva(text);
    shapeWithText.add(KonvaShape);
    shapeWithText.add(KonvaText);
    return shapeWithText;
  }

  public translateToShape(KonvaShape: any){
    if(KonvaShape instanceof Konva.Line){

    }
    else if(KonvaShape instanceof Konva.Rect){

    }
    else if(KonvaShape instanceof Konva.Ellipse){

    }
    else if(KonvaShape instanceof Konva.Circle){

    }
    else if(KonvaShape instanceof Konva.Text){

    }
  }
}
