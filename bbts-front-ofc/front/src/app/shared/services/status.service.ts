import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StatusService {
  private statusUrl = 'http://localhost:8080/api/admin/online';

  constructor(private http: HttpClient) {}

  isAdminOnline(): Observable<{ online: boolean }> {
    return this.http.get<{ online: boolean }>(this.statusUrl);
  }
}