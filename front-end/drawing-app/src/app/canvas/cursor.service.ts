import { Injectable } from '@angular/core';
import Konva from 'konva';

@Injectable({
  providedIn: 'root'
})
export class CursorService {
  CursorPos:any;
  stage!: Konva.Stage;


  constructor(stg:Konva.Stage) {
    this.stage = stg;
  }

  public CursorPositionListener(){
    const component = this;
     this.stage.on('mousemove', function(){
      component.CursorPos = (component.stage.getRelativePointerPosition());
      console.log(component.CursorPos);
    });
  }
}
