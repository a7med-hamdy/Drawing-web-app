import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { Shape } from '../Shape';
@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
  URL = "http://localhost:8080";
  constructor(
    private http: HttpClient,
    ) { }

  //"/create:{shape}:{x},{y}"
  //return JSON object
  createRequest(type: string, x: number, y: number): Observable<Shape> {
    let url = this.URL + `/edit/create:${type}:${x},${y}`;
    console.log("createRequest!!")
    return this.http.post<Shape>(url, { 'content-type': 'application/json'} )
    .pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
      ); 
  } 
/* 
  Garbage :'( :'( :'(
  //"/draw:{shape}"
  drawRequest(type: string) {
    let url = `http://localhost:8080/edit/draw:${type}`;
    this.http.post<any>(url, { responseType: "text" })
  } */

  /////////////////////////////////////////////////////////////////////////////

  //"/{id}/color:{color}"
  colorRequest(id: number, color: string): Observable<any> {
    console.log("change color");
    let url = this.URL + `/edit/${id}/color:${color}`;
    return this.http.get(url, {headers: this.reqHeader , responseType: 'text'})
    /* .pipe( catchError((err) => { console.error(err); throw err; }) );  */
  }
  
  //"/{id}/resize:{v1},{v2}"
  resizeRequest(id: number, v1: number, v2: number): Observable<any> {
    let url = this.URL + `/edit/${id}/resize:${v1},${v2}`;
    return this.http.get(url, {headers: this.reqHeader , responseType: 'text'})
  }

  //"/{id}/move:{x},{y}"
  moveRequest(id: number, x: number, y: number): Observable<any> {
    let url = this.URL + `/edit/${id}/move:${x},${y}`;
    return this.http.get(url, {headers: this.reqHeader , responseType: 'text'})
  }

  //"/{id}/copy:{x},{y}"
  //return shape as JSON object
  copyRequest(id: number, x: number, y: number): Observable<Shape> {
    console.log("copyRequest!!");
    let url = this.URL + `/edit/${id}/copy:${x},${y}`;
    return this.http.post<Shape>(url, { 'content-type': 'application/json'})
    /* .pipe( catchError((err) => { console.error(err); throw err; }) );  */
  }

  //"/{id}/delete"
  deleteRequest(id: number): Observable<any> {
    let url = this.URL + `/edit/${id}/delete`;
    return this.http.get(url, {headers: this.reqHeader , responseType: 'text'})
  }

  /////////////////////////////////////////////////////////////////////////////

  //return list of shapes as JSON object
  undoRequest(): Observable<any> {
    console.log("undoRequest!!")
    let url = this.URL + `/edit/undo`;
    return this.http.post<any>(url, { 'content-type': 'application/json'})
    /* .pipe( catchError((err) => { console.error(err); throw err; }) ); */ 
  }

  //return list of shapes as JSON object
  redoRequest(): Observable<any> {
    console.log("redoRequest!!")
    let url = this.URL + `/edit/redo`;
    return this.http.post<any>(url, { 'content-type': 'application/json'})
    /* .pipe( catchError((err) => { console.error(err); throw err; }) );  */
  }

  /////////////////////////////////////////////////////////////////////////////

  saveRequest() {
    let url = this.URL + "/file/save";
    this.http.post<any>(url, { observe: "data" })
  }

  loadRequest() {
    let url = this.URL + "/file/load";
    return this.http.get<any>(url).subscribe(/*response => {}*/)
  }

  /////////////////////////////////////////////////////////////////////////////
}
