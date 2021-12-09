import { Shape } from './../Shape';
import { Injectable } from '@angular/core';
import Konva from 'konva';
@Injectable({
  providedIn: 'root'
})
export class ShapeTranslatorService {

  constructor() { }

  public translateToKonva(shape: any){
    if(shape.type == 'line'){
        return new Konva.Line({
          name: shape.type,
          points: [shape.postion[0],shape.postion[1],shape.values[0], shape.values[1]],
          fill:shape.color,
          stroke:shape.color,
          strokeWidth:shape.strokeWidth,
          id: shape.id.toString(),
        })
    }
    else if(shape.type == 'rectangle' || shape.type == "square"){
        return new Konva.Rect({
          draggable:true,
          name: shape.type,
          x: shape.postion[0],
          y: shape.postion[1],
          width: shape.values[0],
          height: shape.values[1],
          fill:shape.color,
          stroke:shape.strokeColor,
          strokeWidth:shape.strokeWidth,
          id: shape.id.toString(),
        })
    }
    else if(shape.type == 'ellipse'){
        return new Konva.Ellipse({
          draggable:true,
          name: shape.type,
          x: shape.postion[0],
          y: shape.postion[1],
          radiusX: shape.values[0],
          radiusY: shape.values[1],
          fill:shape.color,
          stroke:shape.strokeColor,
          strokeWidth:shape.strokeWidth,
          id: shape.id.toString(),
        })
    }
    else if(shape.type == 'circle'){
      return new Konva.Circle({
        draggable:true,
        name: shape.type,
        x: shape.postion[0],
        y: shape.postion[1],
        radius: shape.values[0],
        fill:shape.color,
        stroke:shape.strokeColor,
        strokeWidth:shape.strokeWidth,
        id: shape.id.toString(),
      })
    }
    else if(shape.type == 'triangle'){
      return new Konva.RegularPolygon({
        draggable:true,
        name: shape.type,
        x: shape.postion[0],
        y: shape.postion[1],
        sides: 3,
        radius: shape.values[0],
        fill:shape.color,
        stroke:shape.strokeColor,
        strokeWidth:shape.strokeWidth,
        id: shape.id.toString(),
      })
    }

    return new Konva.Shape({});
  }
}
