import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataRecord } from '../models/data-record.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

    private readonly DATA_URL = 'data.json'; // 🔁 Replace with API URL in future
  private usersSubject = new BehaviorSubject<DataRecord[]>([]);
  public users$ = this.usersSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Load data from local JSON or API and push to BehaviorSubject
  loadUsers(): void {
    this.http.get<DataRecord[]>(this.DATA_URL).subscribe(users => {
      this.usersSubject.next(users);
    });
  }

  // Optional: method to get the current cached value
  getCurrentUsers(): DataRecord[] {
    return this.usersSubject.value;
  }
 
}
