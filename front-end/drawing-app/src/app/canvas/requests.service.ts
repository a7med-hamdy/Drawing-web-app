import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { Shape } from '../Shape';
@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
  editURL = "http://localhost:8080/edit";
  fileURL = "http://localhost:8080/file";
  constructor(
    private http: HttpClient,
    ) { }

  //"/create:{shape}"
  //return JSON object
  createRequest(type: string): Observable<Shape> {
    let url = `http://localhost:8080/edit/create:${type}`;
    console.log("createRequest!!")
    return this.http.post<Shape>(url, { 'content-type': 'application/json'} )
    .pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
      ); 
  } 

  //"/draw:{shape}"
  drawRequest(type: string) {
    let url = `http://localhost:8080/edit/draw:${type}`;
    this.http.post<any>(url, { responseType: "text" })
  }

  /////////////////////////////////////////////////////////////////////////////

  //"/{id}/color:{color}"
  colorRequest(id: number, color: string): Observable<any> {
    console.log("change color");
    let url = `http://localhost:8080/edit/${id}/color:${color}`;
    return this.http.get(url, {headers: this.reqHeader , responseType: 'text'})
    /* .pipe( catchError((err) => { console.error(err); throw err; }) );  */
  }
  
  //"/{id}/resize:{v1},{v2}"
  resizeRequest(id: number, v1: number, v2: number): Observable<any> {
    let url = `http://localhost:8080/edit/${id}/resize:${v1},${v2}`;
    return this.http.get(url, {headers: this.reqHeader , responseType: 'text'})
  }

  //"/{id}/move:{x},{y}"
  moveRequest(id: number, x: number, y: number): Observable<any> {
    let url = `http://localhost:8080/edit/${id}/move:${x},${y}`;
    return this.http.get(url, {headers: this.reqHeader , responseType: 'text'})
  }

  //"/{id}/copy"
  //return shape as JSON object
  copyRequest(id: number): Observable<Shape> {
    console.log("copyRequest!!");
    let url = `http://localhost:8080/edit/${id}/copy`;
    return this.http.post<Shape>(url, { 'content-type': 'application/json'})
    /* .pipe( catchError((err) => { console.error(err); throw err; }) );  */
  }

  //"/{id}/delete"
  deleteRequest(id: number): Observable<any> {
    let url = `http://localhost:8080/edit/${id}/delete`;
    return this.http.get(url, {headers: this.reqHeader , responseType: 'text'})
  }

  /////////////////////////////////////////////////////////////////////////////

  //return list of shapes as JSON object
  undoRequest() {
    let url = `http://localhost:8080/edit/undo`;
    this.http.post<any>(url, { observe: "data" })
  }

  //return list of shapes as JSON object
  redoRequest() {
    let url = `http://localhost:8080/edit/redo`;
    this.http.post<any>(url, { observe: "data" })
  }

  /////////////////////////////////////////////////////////////////////////////

  saveRequest(id: number) {
    let url = "http://localhost:8080/file/save";
    this.http.post<any>(url, { observe: "data" })
  }

  loadRequest(id: number) {
    let url = "http://localhost:8080/file/load";
    return this.http.get<any>(url).subscribe(/*response => {}*/)
  }

  /////////////////////////////////////////////////////////////////////////////
}
