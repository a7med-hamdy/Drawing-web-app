import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { KonvaModule } from 'ng2-konva';

import { AppComponent } from './app.component';
import { CanvasComponent } from './canvas/canvas.component';

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent
  ],
  imports: [
    BrowserModule,
    KonvaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
