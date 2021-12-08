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
  shape!: any;
  shapes!: Shape[];

  ngOnInit(): void {
    this.CanvasManager = new CanvasManagerService(this.stage, this.layer, this.req);
    this.CanvasManager.refresh();
  }

}
