import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:8080/auth'; 

  constructor(private http: HttpClient, private router: Router) {}

  login(cpf: string, senha: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { username: cpf, password: senha }).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
      })
    );
  }

  register(nome: string, email: string, cpf: string, senha: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, { 
      nome, 
      email, 
      cpf, 
      senha 
    }).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}