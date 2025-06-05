import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ImagemComponent } from '../shared/imagem/imagem.component';
import { NavbarComponent } from '../layout/navbar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    ImagemComponent, 
    NavbarComponent 
  ]
})
export class LoginComponent {
  form: FormGroup;
  loading = false;

  constructor(
    private auth: AuthService, 
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/)]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    if (this.form.invalid) return;
    
    this.loading = true;
    this.auth.login(this.form.value.cpf, this.form.value.senha).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        const payload = JSON.parse(atob(res.token.split('.')[1]));
        if (payload.role === 'admin') {
          this.router.navigate(['/admin/chat']);
        } else {
          this.router.navigate(['/cliente/chat']);
        }
      },
      error: (err) => {
        this.loading = false;
        alert(err.message || 'Erro ao fazer login');
      },
      complete: () => this.loading = false
    });
  }
}