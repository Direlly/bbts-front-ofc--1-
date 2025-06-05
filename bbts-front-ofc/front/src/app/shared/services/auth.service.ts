import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:8080'; 

  constructor(private http: HttpClient, private router: Router) {}

  login(cpf: string, senha: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, { cpf, senha });
  }

  register(nome: string, email: string, cpf: string, senha: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, { nome, email, cpf, senha });
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