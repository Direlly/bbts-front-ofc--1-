import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router'; // Importe o Router


@Component({
  selector: 'app-admin-chat',
  standalone: true,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class AdminChatComponent implements OnInit {
  clientesConectados = [
    { id: 1, nome: 'João', ultimaMensagem: 'Olá, preciso de ajuda' },
    { id: 2, nome: 'Maria', ultimaMensagem: 'Como faço login?' }
  ];

  mensagens: string[] = [];
  mensagemAtual = '';

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {}

  enviarMensagem() {
    if (this.mensagemAtual.trim()) {
      this.mensagens.push(`${this.mensagemAtual}`);
      this.mensagemAtual = '';
    }
  }

  logout() {
    localStorage.removeItem('token');
    sessionStorage.removeItem('user');
    
    this.router.navigate(['/login']);
    
    window.location.reload();
  }
}