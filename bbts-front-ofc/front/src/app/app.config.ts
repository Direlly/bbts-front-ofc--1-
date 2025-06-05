import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { routerConfig } from './app-routing.module'; // Importe a configuração de roteamento

export const appConfig: ApplicationConfig = {
  providers: [
    ...routerConfig, // Adicione a configuração de roteamento
    provideAnimations(),
    provideHttpClient(),
    // Outros providers globais
  ]
};