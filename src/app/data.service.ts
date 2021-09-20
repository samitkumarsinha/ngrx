import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }
  getdata(): Observable<User[]>{
    return this.http.get<User[]>('http://localhost:3000/api/list').pipe(
      map(data => data as User[])
    )
  }
  postdata(data: User): Observable<any>{
    return this.http.post<any>('http://localhost:3000/api/register', data);
  }
}
