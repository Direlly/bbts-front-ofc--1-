import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../shared/services/auth.service';
import { EqualToValidatorDirective } from '../shared/validators/equal-to.validator'; 
import { ImagemComponent } from '../shared/imagem/imagem.component';
import { NavbarComponent } from '../layout/navbar.component';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    EqualToValidatorDirective,
    ImagemComponent,  
    NavbarComponent
  ]
})
export class RegisterComponent {
  nome = '';
  email = '';
  cpf = '';
  senha = '';
  confirmarSenha = '';

  constructor(
    private auth: AuthService, 
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  formatCPF() {
    let value = this.cpf.replace(/\D/g, '');

    if (value.length > 3) {
      value = value.substring(0, 3) + '.' + value.substring(3);
    }
    if (value.length > 7) {
      value = value.substring(0, 7) + '.' + value.substring(7);
    }
    if (value.length > 11) {
      value = value.substring(0, 11) + '-' + value.substring(11);
    }

    this.cpf = value.substring(0, 14);
  }

  register() {
    if (this.senha !== this.confirmarSenha) {
      this.snackBar.open('As senhas não coincidem', 'Fechar', {
        duration: 5000
      });
      return;
    }

    const cpfSemMascara = this.cpf.replace(/\D/g, '');

    this.auth.register(
      this.nome,
      this.email,
      cpfSemMascara,
      this.senha
    ).subscribe({
      next: () => {
        this.snackBar.open('Cadastro realizado com sucesso!', 'Fechar', {
          duration: 3000
        });
        this.router.navigate(['/login']);
      },
      error: (err) => {
        let errorMessage = 'Erro ao realizar cadastro. Tente novamente.';
        if (err.error && err.error.message) {
          errorMessage = err.error.message;
        }
        this.snackBar.open(errorMessage, 'Fechar', {
          duration: 5000
        });
      }
    });
  }
}