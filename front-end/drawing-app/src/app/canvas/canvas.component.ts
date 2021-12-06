import Konva from 'konva';
import { Component, OnInit } from '@angular/core';
import { CanvasManagerService } from './canvas-manager.service';
import {  RequestsService  } from './requests.service';
@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  stage!: Konva.Stage;
  layer!: Konva.Layer;
  transformers: Konva.Transformer[] = [];
  CanvasManager!:CanvasManagerService;
  constructor() { }

  ngOnInit(): void {
    this.CanvasManager = new CanvasManagerService(this.stage, this.layer);
    this.CanvasManager.refresh();
  }

}
