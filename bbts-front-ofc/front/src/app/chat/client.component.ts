import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusService } from '../shared/services/status.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-client-chat',
  standalone: true,
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatFormFieldModule
  ]
})
export class ClientChatComponent implements OnInit {
  adminOnline = false;
  loading = true;

    constructor( private adminStatus: StatusService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.adminStatus.isAdminOnline().subscribe({
      next: (res) => {
        this.adminOnline = res.online;
        this.loading = false;
      },
      error: () => {
        this.adminOnline = false;
        this.loading = false;
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    sessionStorage.removeItem('user');
    
    this.router.navigate(['/login']);
    
    window.location.reload();
  }

  whatsappLink = 'https://wa.me/55SEUNUMERO?text=Olá,%20preciso%20de%20ajuda';
}