import Konva from 'konva';
import { Component, OnInit } from '@angular/core';
import { CanvasManagerService } from './canvas-manager.service';
import {  RequestsService  } from './requests.service';
import { Shape } from '../Shape';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
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

  selectedFiles?: File;

  message = '';
  fileInfos?: Observable<any>;


  ngOnInit(): void {
    this.CanvasManager = new CanvasManagerService(this.stage, this.layer, this.req);
    this.CanvasManager.refresh();
  }

  ////////////////////////////////////////////////
  /*req is the service name*/
    /*selected*/
  selectFile(event: any): void {
    this.selectedFiles = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = (e) => {
      console.log(reader.result);
      let x = reader.result as string;
      /*put your logic herer */
   };
    reader.readAsText(event.target.files[0])
  }



}
