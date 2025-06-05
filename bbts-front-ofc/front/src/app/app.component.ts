import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Message {
  sender: string;
  text: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    CommonModule,
    RouterOutlet,
    FormsModule
  ]
})
export class AppComponent {
  username: string = '';
  cpf: string = '';
  isLoggedIn: boolean = false;
  isChatEnded: boolean = false;

  messages: Message[] = [];
  newMessage: string = '';
  chatStatus: string = 'Aguardando atendimento...';

  login() {
    if (this.username && this.cpf) {
      this.isLoggedIn = true;
      this.messages.push({ 
        sender: 'Sistema', 
        text: `Olá ${this.username}, bem-vindo ao atendimento.` 
      });
      this.chatStatus = 'Conectado - Aguardando atendente';

      setTimeout(() => {
        this.chatStatus = 'Em atendimento com Claro';
        this.messages.push({ 
          sender: 'Claro', 
          text: 'Olá! Em que posso te ajudar?' 
        });
      }, 3000);
    }
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({ 
        sender: this.username, 
        text: this.newMessage 
      });
      this.newMessage = '';
    }
  }

  endChat() {
    this.isChatEnded = true;
    this.chatStatus = 'Atendimento finalizado';
  }
}