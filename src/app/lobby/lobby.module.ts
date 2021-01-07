import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LobbyComponent } from './lobby.component';
import { LobbyRoutes } from './lobby.routing';

@NgModule({
  imports: [
    CommonModule,
    LobbyRoutes
  ],
  declarations: [LobbyComponent]
})
export class LobbyModule { }
