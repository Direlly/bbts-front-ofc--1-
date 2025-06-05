import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private socket!: WebSocket;
  private messages: Subject<string> = new Subject<string>();
  private readonly socketUrl = 'ws://localhost:8080/chat';

  constructor() {
    this.connect();
  }

  private connect() {
    console.log(`Conectando ao WebSocket: ${this.socketUrl}`);
    this.socket = new WebSocket(this.socketUrl);

    this.socket.onopen = () => {
      console.log('Conectado ao WebSocket');
    };

    this.socket.onmessage = (event) => {
      console.log('Mensagem recebida:', event.data);
      this.messages.next(event.data);
    };

    this.socket.onerror = (error) => {
      console.error('Erro no WebSocket:', error);
    };

    this.socket.onclose = (event) => {
      console.warn('WebSocket fechado. Reconnectando em 3s...', event);
      setTimeout(() => this.connect(), 3000);
    };
  }

  enviar(mensagem: string) {
    if (this.socket.readyState === WebSocket.OPEN) {
      console.log('Enviando mensagem:', mensagem);
      this.socket.send(mensagem);
    } else {
      console.warn('WebSocket não está pronto. Não foi possível enviar mensagem.');
    }
  }

  receber(): Observable<string> {
    return this.messages.asObservable();
  }
}