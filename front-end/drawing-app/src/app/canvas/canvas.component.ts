import Konva from 'konva';
import { Component, OnInit } from '@angular/core';
import { CanvasManagerService } from './canvas-manager.service';
import { CursorService } from './cursor.service';

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
    this.CanvasManager.stage = new Konva.Stage({
      container: 'container',
      width: window.innerWidth,
      height: window.innerHeight
    });
    this.CanvasManager.Cursor = new CursorService(this.CanvasManager.stage);
    this.CanvasManager.layer = new Konva.Layer();
    this.CanvasManager.stage.add(this.CanvasManager.layer);
    this.CanvasManager.Cursor.CursorPositionListener();
  }

}
