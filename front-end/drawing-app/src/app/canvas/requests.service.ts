import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private http: HttpClient) { }

  //"/create:{shape}"
  createRequest(shape: string) {
    let url = `http://localhost:8080/edit/create:${shape}`;
    return this.http.post<any>(url, { responseType: "text", observe: "data" })
  }

  //"/draw:{shape}"
  drawRequest(shape: string) {
    let url = `http://localhost:8080/edit/draw:${shape}`;
    this.http.post<any>(url, { responseType: "text", observe: "data" })
  }

  //"/{id}/color:{color}"
  colorRequest(object: any, id: number, color: string) {
    let url = `http://localhost:8080/edit/${id}/color:${color}`;
    this.http.post<any>(url, { responseType: "text", observe: "data" })
  }
  
  //"/{id}/resize:{v1},{v2}"
  resizeRequest(id: number, v1: number, v2: number) {
    let url = `http://localhost:8080/edit/${id}/resize:${v1},${v2}`;
    this.http.post<any>(url, { observe: "data" })
  }

  //"/{id}/move:{x},{y}"
  moveRequest(id: number, x: number, y: number) {
    let url = `http://localhost:8080/edit/${id}/move:${x},${y}`;
    this.http.post<any>(url, { observe: "data" })
  }

  //"/{id}/copy"
  copyRequest(id: number) {
    let url = `http://localhost:8080/edit/${id}/copy:`;
    this.http.post<any>(url, { observe: "data" })
  }

  //"/{id}/delete"
  deleteRequest(id: number) {
    let url = `http://localhost:8080/edit//${id}/delete`;
    this.http.post<any>(url, { observe: "data" })
  }

  ////////////////////////////////////////////////////////////////////////////

  saveRequest(id: number) {
    let url = "http://localhost:8080/file/save";
    this.http.post<any>(url, { observe: "data" })
  }

  loadRequest(id: number) {
    let url = "http://localhost:8080/file/load";
    return this.http.get<any>(url).subscribe(/*response => {}*/)
  }

  ///////////////////////////////////////////////////////////////////////////
}
