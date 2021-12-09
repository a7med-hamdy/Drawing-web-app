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

  selectedFiles?: FileList;
  currentFile?: File;

  message = '';
  fileInfos?: Observable<any>;


  ngOnInit(): void {
    this.CanvasManager = new CanvasManagerService(this.stage, this.layer, this.req);
    this.CanvasManager.refresh();
  }
    /*selected*/
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  /////////////////////////////////
  upload(): void {


    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.req.upload(this.currentFile).subscribe(
          (data) => {
            console.log(data);
          },
          (err: any) => {
            console.log(err);
            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }

            this.currentFile = undefined;
          });

      }

      this.selectedFiles = undefined;
    }
  }
}
