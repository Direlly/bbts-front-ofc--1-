import { Routes, provideRouter, withComponentInputBinding } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { RegisterComponent } from './auth/register.component';
import { ClientChatComponent } from './chat/client.component';
import { AdminChatComponent } from './chat/admin.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

// Exporte as rotas para usar com provideRouter
export const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { 
    path: 'login', 
    component: LoginComponent,
    title: 'Login' 
  },
  { 
    path: 'register', 
    component: RegisterComponent,
    title: 'Registro' 
  },
  { 
    path: 'cliente/chat', 
    component: ClientChatComponent, 
    // canActivate: [AuthGuard],
    title: 'Chat do Cliente'
  },
  { 
    path: 'admin/chat', 
    component: AdminChatComponent, 
    // canActivate: [AuthGuard, AdminGuard],
    title: 'Chat do Admin'
  }
  // },
  // { path: '**', redirectTo: '/login' }
];

// Exporte a configuração de roteamento para usar no app.config.ts
export const routerConfig = [
  provideRouter(appRoutes, withComponentInputBinding()),
  // Adicione outros providers de roteamento se necessário
];