import Konva from 'konva';
import { Component, OnInit } from '@angular/core';
import { CanvasManagerService } from './canvas-manager.service';
import {  RequestsService  } from './requests.service';
import { Shape } from '../Shape';
import { Observable, Subscriber } from 'rxjs';
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
  isSpecial : boolean=false;
  load : boolean=false;
  save : boolean=false;
  selectedFiles?: File;

  message = '';
  fileInfos?: Observable<any>;


  ngOnInit(): void {
    this.CanvasManager = new CanvasManagerService(this.stage, this.layer, this.req);
    this.CanvasManager.refresh();
  }

  state(num:number){
    if(this.isSpecial){
      this.isSpecial=false;
      this.load=false;
      this.save=false;
    }else{
      this.isSpecial=true;
      if(num==1){
        this.load=true;
      }
      else{
        this.save=true
      }
    }
  }
}
