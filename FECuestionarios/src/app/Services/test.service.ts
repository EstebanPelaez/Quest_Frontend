import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  urlT = 'http://'+sessionStorage.getItem('ip')+'/api/test';

  constructor(private http: HttpClient, private http2: HttpClient) { }
}
