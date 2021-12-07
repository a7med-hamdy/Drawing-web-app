import Konva from 'konva';
import { Component, OnInit } from '@angular/core';
import { CanvasManagerService } from './canvas-manager.service';
import {  RequestsService  } from './requests.service';
import { Shape } from '../Shape';
@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  stage!: Konva.Stage;
  layer!: Konva.Layer;
  CanvasManager!:CanvasManagerService;
  constructor(public req: RequestsService) { }
  shape!: Shape;

  ngOnInit(): void {
    this.CanvasManager = new CanvasManagerService(this.stage, this.layer);
    this.CanvasManager.refresh();
  }

  //////////////////////////create
  create(type: string, x: number, y: number){
    this.req.createRequest(type, x, y)
    .subscribe(data =>
      {
      this.shape = data
      console.log(`${type} is created\n` + JSON.stringify(this.shape))
      });
  }

  //////////////////////////color
  color(id: number, color: string){
    this.req.colorRequest(id, color)
    .subscribe(data => { console.log(`color changed to: ${color}\nshape #${id}\n` + data) });
  }


  //////////////////////////resize
  resize(id: number, v1: number, v2: number){
    this.req.resizeRequest(id, v1, v2)
    .subscribe(data => { console.log(`size changed to: [${v1},${v2}]\nshape #${id}\n` + data) });
  }

  //////////////////////////move
  move(id: number, x: number, y: number){
    this.req.resizeRequest(id, x, y)
    .subscribe(data => { console.log(`position changed to: (${x},${y})\nshape #${id}\n` + data) });
  }

  //////////////////////////copy
  copy(id: number, x: number, y: number){
    this.req.copyRequest(id, x, y)
    .subscribe(data =>
      {
      this.shape = data
      console.log(`shape is copied\n` + JSON.stringify(this.shape))
    });
  }

  //////////////////////////delete
  delete(id: number){
    this.req.deleteRequest(id)
    .subscribe(data => { console.log(`shape deleted #${id}\n` + data) });
  }
}
