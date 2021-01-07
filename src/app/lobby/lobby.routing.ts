import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LobbyComponent } from './lobby.component';

const routes: Routes = [
  { 
    path: 'lobby',
    component: LobbyComponent
   },
   {
     path: '**',
     component: LobbyComponent
   }
];

export const LobbyRoutes = RouterModule.forChild(routes);
